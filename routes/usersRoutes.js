import express from "express";
import Users from "../database/models/users";
const bcrypt = require("bcrypt");
const logErrorMessage = require("../server-utils/utils");
var passport = require("passport");

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  const { id, user_name, email } = req.user;
  res.send({ id, user_name, email });
});

router.post("/register", async (req, res) => {
  const { user_name, email, pass_word } = req.body;

  const usersWithUserName = await Users.findAll({ where: { user_name } });

  if (usersWithUserName.length) {
    logErrorMessage("Error: username already in use");
    return res.sendStatus(409);
  }

  const usersUsingEmail = await Users.findAll({ where: { email } });

  if (usersUsingEmail.length) {
    logErrorMessage("Error: email already in use");
    return res.sendStatus(409);
  }
  // Create the user with hashed password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(pass_word, salt, (err, hashedPassword) => {
      if (err) console.log("hshshshsshsjssj");

      Users.create({ user_name, email, pass_word: hashedPassword })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          logErrorMessage("Error creating user", err);
          res.send(500);
        });
    })
  );
});

module.exports = router;
