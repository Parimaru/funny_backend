const express = require('express');

const {
  getAll,
  createNew,
  getOne,
  vote,
  getTop,
} = require('../controllers/qouteData');

const app = express.Router();

app.route('/').get(getAll).post(createNew);
app.route('/top').get(getTop);
app.route('/:id').get(getOne).put(vote);

module.exports = app;
