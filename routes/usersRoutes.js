const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelizeOperators = require('sequelize').Op;

const Users = require('../database/models/users');
const logErrorMessage = require('../server-utils/utils');

const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

router.post('/login', async (req, res) => {
  const { pass_word } = req.body;
  const usernameOrEmail = req.body.user_name;

  const userData = await Users.findOne({
    where: {
      [sequelizeOperators.or]: [
        {
          user_name: {
            [sequelizeOperators.eq]: usernameOrEmail,
          },
        },
        {
          email: {
            [sequelizeOperators.eq]: usernameOrEmail,
          },
        },
      ],
    },
  });

  if (!userData) {
    res.status(500).json({
      status: 'fail',
      message: 'Incorrect username/email and/or password',
    });
  }

  const match = await bcrypt.compare(pass_word, userData.pass_word);

  if (match) {
    const token = jwt.sign({ id: userData.id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      token,
      data: userData,
    });
  } else {
    res.status(401).json({ message: 'The password or email is wrong' });
  }
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
