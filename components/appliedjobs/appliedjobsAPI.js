const express = require('express');
const appliedjobsController = require('./appliedjobsController');
const Route = express.Router();
const passport = require('passport');

// @route   api/appliedjobs/
Route.route('/')
  .get(passport.authenticate('user', { session: false }), appliedjobsController.findAll)
  .post(passport.authenticate('user', { session: false }), appliedjobsController.create);
Route.route('/:id')
  // .get(appliedjobsController.findOne)
  .patch(passport.authenticate('company', { session: false }), appliedjobsController.update);
// .delete(appliedjobsController.destroy);

module.exports = Route;
