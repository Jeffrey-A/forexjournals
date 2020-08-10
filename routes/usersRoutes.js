const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const Users = require('../database/models/users');
const logErrorMessage = require('../server-utils/utils');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
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
      if (saltError) console.log('hshshshsshsjssj');

      Users.create({ user_name, email, pass_word: hashedPassword })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((createUserError) => {
          logErrorMessage('Error creating user', createUserError);
          res.send(500);
        });
    })
  );
});

module.exports = router;
