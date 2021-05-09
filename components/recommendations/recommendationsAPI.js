const express = require('express');
const recommendationsController = require('./recommendationsController');
const Route = express.Router();
const passport = require('passport');

// @route   api/recommendations/
Route.route('/').get(
  passport.authenticate('user', { session: false }),
  recommendationsController.findAll
);

module.exports = Route;
