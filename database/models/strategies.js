const Sequelize = require('sequelize');
const database = require('../db');

const Strategies = database.define(
  'strategies',
  {
    strategy_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    market_condition: {
      type: Sequelize.TEXT,
    },
    name: {
      type: Sequelize.TEXT,
    },
    description: {
      type: Sequelize.TEXT,
    },
    entry_conditions: {
      type: Sequelize.TEXT,
    },
    indicators: {
      type: Sequelize.TEXT,
    },
    risk_to_reward: {
      type: Sequelize.TEXT,
    },
    risk_per_trade: {
      type: Sequelize.TEXT,
    },
    time_frames: {
      type: Sequelize.TEXT,
    },
    exit_conditions: {
      type: Sequelize.TEXT,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Strategies;
