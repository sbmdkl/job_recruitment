const express = require('express');
const jobsController = require('./jobsController');
const Route = express.Router();
const passport = require('passport');

// @route   api/jobs/
Route.route('/')
	.get(passport.authenticate('both', { session: false }), jobsController.findAll)
	.post(passport.authenticate('company', { session: false }), jobsController.create);
Route.route('/:id')
	.get(passport.authenticate('both', { session: false }), jobsController.findOne)
	.patch(passport.authenticate('company', { session: false }), jobsController.update);
// .delete(jobsController.destroy);

module.exports = Route;
