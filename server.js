import "babel-polyfill";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import bodyParser from "body-parser";
import App from "./src/App";
import { Helmet } from "react-helmet";
import db from "./database/db";
import ensureAuthenticated from "./config/auth";
var session = require("express-session");
var passport = require("passport");
const logErrorMessage = require("./server-utils/utils");
const strategyRouter = require("./routes/strategiesRoutes");
const journalRouter = require("./routes/journalsRoutes");
const userRouter = require("./routes/usersRoutes");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

app.use(morgan("tiny"));

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

// Routes
app.use("/users", userRouter);
app.use("/strategies", strategyRouter);
app.use("/journals", journalRouter);

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
