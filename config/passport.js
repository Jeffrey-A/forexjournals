const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../database/models/users");
const Sequelize = require('sequelize');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      Users.findOne({
        where: { user_name: username },
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        bcrypt.compare(password, user.pass_word, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            console.log("Success login");
            return done(null, user);
          } else {
            console.log("failed login");
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });

      passport.serializeUser(function (user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function (id, done) {
        Users.findByPk(id).then(function (user) {
          if (user) {
            done(null, user.get());
          } else {
            done(user.errors, null);
          }
        });
      });
    })
  );
};
