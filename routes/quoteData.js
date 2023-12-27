const express = require('express');

const {
  getAll,
  createNew,
  getOne,
  voteUp,
} = require('../controllers/qouteData');

const app = express.Router();

app.route('/').get(getAll).post(createNew);
app.route('/:id').get(getOne).post(voteUp);

module.exports = app;
