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
import Journals from "./database/models/journals";
import { Sequelize } from "sequelize";
import ensureAuthenticated from "./config/auth";
var session = require("express-session");
var passport = require("passport");
const bcrypt = require("bcrypt");
const logErrorMessage = require("./server-utils/utils");
const strategyRouter = require("./routes/strategiesRoutes");
const journalRouter = require("./routes/journalsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

// Passport Config
require("./config/passport")(passport);

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

app.use("/strategies", strategyRouter);
app.use("/journals", journalRouter);
// Routes
app.post("/login", passport.authenticate("local"), (req, res) => {
  const { id, user_name, email } = req.user;
  res.send({ id, user_name, email });
});

app.post("/register", async (req, res) => {
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
      if (err) throw err;

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

// Handle react-router routes
app.get("*", (req, res) => {
  const context = {};
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App jeff={req} />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  const html = `
          <html>
              <head>
                 ${helmet.meta.toString()}
                 ${helmet.title.toString()}
                 <meta name="viewport" content="width=device-width,initial-scale=1">
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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
