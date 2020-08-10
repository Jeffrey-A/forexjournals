const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
};

module.exports = new Sequelize(
  `postgres://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`
);
//exports.models = models;
