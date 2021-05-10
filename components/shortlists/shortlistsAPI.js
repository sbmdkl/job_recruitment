const express = require('express');
const shortlistsController = require('./shortlistsController');
const Route = express.Router();
const passport = require('passport');

// @route   api/shortlists/
Route.route('/:jobId').get(
  passport.authenticate('company', { session: false }),
  shortlistsController.findOne
);

module.exports = Route;
