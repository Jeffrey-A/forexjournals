import express from "express";
const router = express.Router();
import Strategies from "../database/models/strategies";
const logErrorMessage = require("../server-utils/utils");

function getStrategies(req, res) {
  Strategies.findAll({ where: { user_id: req.params.userId } })
    .then((strategies) => {
      res.json(strategies);
    })
    .catch((err) => {
      logErrorMessage("Error getting strategies", err);
      res.sendStatus(500);
    });
}

function createStrategy(req, res) {
  const payload = {
    user_id: req.params.userId,
    name: req.body.name,
    description: req.body.description,
    entry_conditions: req.body.entry_conditions,
    exit_conditions: req.body.exit_conditions,
    time_frames: req.body.time_frames,
    risk_per_trade: req.body.risk_per_trade,
    risk_to_reward: req.body.risk_to_reward,
    indicators: req.body.indicators,
  };

  Strategies.create(payload)
    .then((strategies) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      logErrorMessage("Error creating strategy", err);
      res.send(500);
    });
}

function updateStrategy(req, res) {
  const strategy_id = req.body.strategy_id ? req.body.strategy_id : "";
  const userId = req.params.userId;

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
      res.sendStatus(204);
    })
    .catch((err) => {
      logErrorMessage("Error updating strategy", err);
      res.sendStatus(500);
    });
}

const deleteStrategy = async (req, res) => {
  const strategy_id = req.body.strategy_id ? req.body.strategy_id : "";
  const userId = req.params.userId;
  await Journals.destroy({ where: { strategy_id, user_id: userId } });

  Strategies.destroy({ where: { strategy_id, user_id: userId } })
    .then(() => res.sendStatus(204))
    .catch((err) => {
      logErrorMessage("Error deleting strategy", err);
      res.sendStatus(500);
    });
};

router
  .route("/:userId")
  .get(getStrategies)
  .post(createStrategy)
  .put(updateStrategy)
  .delete(deleteStrategy);

module.exports = router;
