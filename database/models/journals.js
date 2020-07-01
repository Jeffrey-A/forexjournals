const Sequelize = require("sequelize");
const database = require("../db");

const Journals = database.define(
  "journals",
  {
    journal_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pair: {
      type: Sequelize.TEXT,
    },
    comments: {
      type: Sequelize.TEXT,
    },
    order_type: {
      type: Sequelize.TEXT,
    },
    errors: {
      type: Sequelize.TEXT,
    },
    pips_gained_lost: {
      type: Sequelize.TEXT,
    },
    img_link: {
      type: Sequelize.TEXT,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    strategy_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "strategies",
        key: "strategy_id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Journals;
