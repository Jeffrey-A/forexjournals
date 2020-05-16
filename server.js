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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("build/public"));

db.sync().then(() => console.log("connected to database successfully"));

// Routes
app.get("/", (req, res) => {
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

app.post("/login", (req, res) => {
  const user_name = req.body.user_name ? req.body.user_name : "";
  const pass_word = req.body.pass_word ? req.body.pass_word : "";
  const email = req.body.email ? req.body.email : "";

  Users.findAll({
    where: Sequelize.or(
      { user_name, pass_word },
      Sequelize.and({ pass_word, email })
    ),
  })
    .then((journals) => {
      // user does not exist or either username, email or password are not valid.
      if (!journals.length) {
        res.sendStatus(404);
      } else {
        res.json(journals);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
// Not sure if this will be needed
app.post("/logout", (req, res) => {
  res.send("logout");
});

app.post("/register", async (req, res) => {
  const { user_name, email, pass_word } = req.body;

  // Checks user_name does not exist
  const isUsernameInUse = await Users.findAll({ where: { user_name } });
  
  if (isUsernameInUse.length) {
    return res.sendStatus(409);
  }
  // Check email is not being used
  const isEmailInUse = await Users.findAll({ where: { email } });
 
  if (isEmailInUse.length) {
    return res.sendStatus(409);
  }
  // Create the user
  Users.create({ user_name, email, pass_word })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.send(500);
    });
});

app.get("/journals/:userId/", (req, res) => {
  Journals.findAll({ where: { user_id: req.params.userId } })
    .then((journals) => {
      res.json(journals);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app
  .route("/journals/:userId/:strategyId")
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
    const { journal_id } = req.body;
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
    const { journal_id } = req.body;

    Journals.destroy({ where: { journal_id, user_id, strategy_id } })
      .then(() => res.sendStatus(200))
      .catch((err) => res.sendStatus(500));
  });

app
  .route("/strategies/:userId")
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
    const { strategy_id } = req.body;
    const { userId } = req.params;

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
    const { strategy_id } = req.body;
    const { userId } = req.params;
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
