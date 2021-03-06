// For some reason using require leads to `Element type is invalid` error
import App from './src/App';

require('babel-polyfill');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { Helmet } = require('react-helmet');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const db = require('./database/db');
const ensureAuthenticated = require('./config/auth');
const strategyRouter = require('./routes/strategiesRoutes');
const journalRouter = require('./routes/journalsRoutes');
const userRouter = require('./routes/usersRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: './config.env' });

// Middlewares

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(express.static('build/public'));

// Check database connection
db.sync().then(() => console.log('connected to database successfully'));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/strategies', ensureAuthenticated, strategyRouter);
app.use('/api/v1/journals', ensureAuthenticated, journalRouter);
// eslint-disable-next-line no-use-before-define
app.get('*', serveReactCode);

function serveReactCode(req, res) {
  const context = {};
  const content = ReactDOMServer.renderToString(
    // eslint-disable-next-line react/jsx-filename-extension
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
}

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
