/* eslint-disable no-use-before-define */
const express = require('express');
const Journals = require('../database/models/journals');
const logErrorMessage = require('../server-utils/utils');

const router = express.Router();

router.get('/:userId/:strategyId?', getJournalsForUser);

router
  .route('/:userId/:strategyId')
  .post(createJournal)
  .put(updateJournal)
  .delete(deleteJournal);

function getJournalsForUser(req, res) {
  const user_id = req.params.userId;
  const strategy_id = req.params.strategyId;

  if (strategy_id) {
    Journals.findAll({ where: { user_id, strategy_id } })
      .then((journals) => {
        res.json(journals);
      })
      .catch((err) => {
        logErrorMessage('Error getting journals', err);
        res
          .status(500)
          .json({ status: 'fail', message: 'Sorry, something went wrong!' });
      });
  } else {
    Journals.findAll({ where: { user_id } })
      .then((journals) => {
        res.json({ data: journals });
      })
      .catch((err) => {
        logErrorMessage('Error getting journals', err);
        res
          .status(500)
          .json({ status: 'fail', message: 'Sorry, something went wrong!' });
      });
  }
}

function createJournal(req, res) {
  const payload = {
    user_id: req.params.userId,
    strategy_id: req.params.strategyId,
    errors: req.body.errors,
    pair: req.body.pair,
    comments: req.body.comments,
    order_type: req.body.order_type,
    pips_gained_lost: req.body.pips_gained_lost,
    img_link: req.body.img_link,
  };

  Journals.create(payload)
    .then((data) => {
      res.status(202).json({ status: 'success', data });
    })
    .catch((err) => {
      logErrorMessage('Error creating journal, err');
      res.send(err);
    });
}

function updateJournal(req, res) {
  const strategy_id = req.params.strategyId;
  const user_id = req.params.userId;
  const journal_id = req.body.journal_id ? req.body.journal_id : '';
  const updatedPayload = {
    pair: req.body.pair,
    comments: req.body.comments,
    order_type: req.body.order_type,
    errors: req.body.errors,
    pips_gained_lost: req.body.pips_gained_lost,
    img_link: req.body.img_link,
  };

  Journals.update(updatedPayload, {
    where: { journal_id, strategy_id, user_id },
  })
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      logErrorMessage('Error updating journal', err);
      res
        .status(500)
        .json({ status: 'fail', message: 'Sorry, something went wrong!' });
    });
}

function deleteJournal(req, res) {
  const strategy_id = req.params.strategyId;
  const user_id = req.params.userId;
  const journal_id = req.body.journal_id ? req.body.journal_id : '';

  Journals.destroy({ where: { journal_id, user_id, strategy_id } })
    .then(() => res.status(204).json({ status: 'success' }))
    .catch((err) => {
      logErrorMessage('Error deleting journal', err);
      res
        .status(500)
        .json({ status: 'fail', message: 'Sorry, something went wrong!' });
    });
}

module.exports = router;
