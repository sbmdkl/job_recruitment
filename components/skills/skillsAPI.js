const express = require('express');
const skillsController = require('./skillsController');
const Route = express.Router();
const passport = require('passport');
// @route   api/skills/
Route.route('/')
  .get(skillsController.findAll)
  .post(passport.authenticate('admin', { session: false }), skillsController.create);
Route.route('/:id')
  .get(passport.authenticate('both', { session: false }), skillsController.findOne)
  .patch(passport.authenticate('admin', { session: false }), skillsController.update);
// .delete(passport.authenticate('admin', { session: false }), skillsController.destroy);

module.exports = Route;
