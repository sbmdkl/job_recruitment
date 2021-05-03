const express = require('express');
const usersController = require('./usersController');
const Route = express.Router();
const passport = require('passport');
// @route   api/users/
Route.route('/').get(passport.authenticate('admin', { session: false }), usersController.findAll);
Route.route('/login').post(usersController.login);
Route.route('/signup').post(usersController.signup);
Route.route('/password/reset').post(usersController.resetPassword);
Route.route('/password/reset/verify').post(usersController.verifyPassword);
Route.route('/password/reset/change').post(
	passport.authenticate('both', { session: false }),
	usersController.changeResetPassword
);
module.exports = Route;
