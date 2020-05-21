import "babel-polyfill";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import bodyParser from "body-parser";
import App from "./src/App";
import { Helmet } from "react-helmet";
import db from "./database/db";
import Users from "./database/models/users";
import Strategies from "./database/models/strategies";
import Journals from "./database/models/journals";
import { Sequelize } from "sequelize";
import ensureAuthenticated from './config/auth';
var session = require("express-session");
var passport = require("passport");
const bcrypt = require("bcrypt");


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

// Passport Config
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(express.static("build/public"));
// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Check database connection
db.sync().then(() => console.log("connected to database successfully"));

// Routes
app.get("*", (req, res) => {
  const context = {};
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  const html = `
        <html>
            <head>
               ${helmet.meta.toString()}
               ${helmet.title.toString()}
            </head>

            <body>
                <div id="root">
                   ${content}
                </div>
                <script src="client_bundle.js"></script>
            </body>
        </html>
    `;
  res.send(html);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
  })(req, res, next);
});

app.post("/register", async (req, res) => {
  const { user_name, email, pass_word } = req.body;

  // Checks user_name does not exist
  const usersWithUserName = await Users.findAll({ where: { user_name } });

  if (usersWithUserName.length) {
    return res.sendStatus(409);
  }
  // Check email is not being used
  const usersUsingEmail = await Users.findAll({ where: { email } });

  if (usersUsingEmail.length) {
    return res.sendStatus(409);
  }
  // Create the user with hashed password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(pass_word, salt, (err, hashedPassword) => {
      if (err) throw err;

      Users.create({ user_name, email, pass_word: hashedPassword })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.send(500);
        });
    })
  );
});

app.get("/journals/:userId/:strategyId?", ensureAuthenticated, (req, res) => {
  const user_id = req.params.userId;
  const strategy_id = req.params.strategyId;

  if (strategy_id) {
    Journals.findAll({ where: { user_id, strategy_id } })
      .then((journals) => {
        res.json(journals);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    Journals.findAll({ where: { user_id } })
      .then((journals) => {
        res.json(journals);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }
});

app
  .route("/journals/:userId/:strategyId", ensureAuthenticated)
  .post((req, res) => {
    const payload = {
      user_id: req.params.userId,
      strategy_id: req.params.strategyId,
      pair: req.body.pair,
      comments: req.body.comments,
      order_type: req.body.order_type,
      pips_gained_lost: req.body.pips_gained_lost,
      img_link: req.body.img_link,
    };

    Journals.create(payload)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req, res) => {
    const strategy_id = req.params.strategyId;
    const user_id = req.params.userId;
    const journal_id = req.body.journal_id ? req.body.journal_id : "";
    const updatedPayload = {
      pair: req.body.pair,
      comments: req.body.comments,
      order_type: req.body.order_type,
      pips_gained_lost: req.body.pips_gained_lost,
      img_link: req.body.img_link,
    };

    Journals.update(updatedPayload, {
      where: { journal_id, strategy_id, user_id },
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => res.sendStatus(500));
  })
  .delete((req, res) => {
    const strategy_id = req.params.strategyId;
    const user_id = req.params.userId;
    const journal_id = req.body.journal_id ? req.body.journal_id : "";

    Journals.destroy({ where: { journal_id, user_id, strategy_id } })
      .then(() => res.sendStatus(200))
      .catch((err) => res.sendStatus(500));
  });

app
  .route("/strategies/:userId", ensureAuthenticated)
  .get((req, res) => {
    Strategies.findAll({ where: { user_id: req.params.userId } })
      .then((strategies) => {
        res.json(strategies);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    const payload = {
      user_id: req.params.userId,
      name: req.body.name,
      description: req.body.description,
      entry_conditions: req.body.entry_conditions,
      exit_conditions: req.body.exit_conditions,
      market_conditions: req.body.market_conditions,
      time_frames: req.body.time_frames,
      risk_per_trade: req.body.risk_per_trade,
      risk_to_reward: req.body.risk_to_reward,
      indicators: req.body.indicators,
    };

    Strategies.create(payload)
      .then((strategies) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.send(500);
      });
  })
  .put((req, res) => {
    const strategy_id = req.body.strategy_id ? req.body.strategy_id : "";
    const userId = req.params.userId;

    const updatedPayload = {
      name: req.body.name,
      description: req.body.description,
      entry_conditions: req.body.entry_conditions,
      exit_conditions: req.body.exit_conditions,
      market_conditions: req.body.market_conditions,
      time_frames: req.body.time_frames,
      risk_per_trade: req.body.risk_per_trade,
      risk_to_reward: req.body.risk_to_reward,
      indicators: req.body.indicators,
    };

    Strategies.update(updatedPayload, {
      where: { strategy_id, user_id: userId },
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => res.sendStatus(500));
  })
  .delete(async (req, res) => {
    const strategy_id = req.body.strategy_id ? req.body.strategy_id : "";
    const userId = req.params.userId;
    await Journals.destroy({ where: { strategy_id, user_id: userId } });

    Strategies.destroy({ where: { strategy_id, user_id: userId } })
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
