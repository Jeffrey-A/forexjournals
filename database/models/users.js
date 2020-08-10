const Sequelize = require('sequelize');
const database = require('../db');

const Users = database.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_name: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.TEXT,
    },
    pass_word: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Users;
