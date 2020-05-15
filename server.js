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
  Users.findAll()
    .then((journals) => {
      res.json(journals);
    })
    .catch((err) => {
      res.send("Error " + err);
    });
});

app.post("/logout", (req, res) => {
  res.send("logout");
});

app.post("/register", (req, res) => {
  const { user_name, email, pass_word } = req.body;
  //TODO: user_name and email need to be unique
  /*
   If the user or email exist send a 409, if another error occurs, send a 500.
   Send a 200 if everything is ok.
  */
  Users.create({ user_name, email, pass_word })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.send(500);
    });
});

app
  .route("/journals/:userId")
  .get((req, res) => {
    Journals.findAll()
      .then((journals) => {
        res.json(journals);
      })
      .catch((err) => {
        res.send("Error " + err);
      });
  })
  .post((req, res) => {
    res.send("create a journal");
  })
  .put((req, res) => {
    res.send("update a journal");
  })
  .delete((req, res) => {
    res.send("delete a journal");
  });

app
  .route("/strategies/:userId")
  .get((req, res) => {
    Strategies.findAll()
      .then((strategies) => {
        res.json(strategies);
      })
      .catch((err) => {
        res.send("Error " + err);
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
