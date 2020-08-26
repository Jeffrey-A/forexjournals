const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../database/models/users');
const logErrorMessage = require('../server-utils/utils');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

router.post('/login', (req, res) => {
  const { id, user_name, email } = req.user;
  res.send({ id, user_name, email });
});

router.post('/register', async (req, res) => {
  const { user_name, email, pass_word } = req.body;

  const usersWithUserName = await Users.findAll({ where: { user_name } });

  if (usersWithUserName.length) {
    logErrorMessage('Error: username already in use');
    return res.sendStatus(409);
  }

  const usersUsingEmail = await Users.findAll({ where: { email } });

  if (usersUsingEmail.length) {
    logErrorMessage('Error: email already in use');
    return res.sendStatus(409);
  }
  // Create the user with hashed password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(pass_word, salt, (saltError, hashedPassword) => {
      if (saltError) res.send(500);

      Users.create({ user_name, email, pass_word: hashedPassword })
        .then((newUser) => {
          delete newUser.pass_word;

          const token = jwt.sign({ id: newUser.id }, jwtSecret, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          res.status(201).json({
            token,
            data: newUser,
          });
        })
        .catch((createUserError) => {
          logErrorMessage('Error creating user', createUserError);
          res.send(500);
        });
    })
  );
});

module.exports = router;
