const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../database/models/users");
const Sequelize = require("sequelize");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (usernameOrEmail, password, done) {
      let queryCondition = { user_name: usernameOrEmail };
      if (usernameOrEmail.includes("@")) {
        queryCondition = { email: usernameOrEmail };
      }
      Users.findOne({
        where: queryCondition,
      }).then((user) => {
        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.pass_word, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
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
