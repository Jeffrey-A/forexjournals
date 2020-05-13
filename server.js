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
  res.send("login");
});

app.post("/logout", (req, res) => {
  res.send("logout");
});

app.post("/register", (req, res) => {
  res.send("register");
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
    res.send("create a strategy");
  })
  .put((req, res) => {
    res.send("update a strategy");
  })
  .delete((req, res) => {
    res.send("delete a strategy");
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
