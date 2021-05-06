const express = require('express');
const profilesController = require('./profilesController');
const Route = express.Router();
const passport = require('passport');

// @route   api/profiles/
Route.route('/')
	.get(profilesController.findAll)
	.post(passport.authenticate('both', { session: false }), profilesController.create);
Route.route('/:userId')
	.get(passport.authenticate('both', { session: false }), profilesController.findOne)
	.patch(passport.authenticate('both', { session: false }), profilesController.update);

module.exports = Route;
