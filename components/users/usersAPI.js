const express = require('express');
const usersController = require('./usersController');
const Route = express.Router();

// @route   api/users/
Route.route('/').get(usersController.findAll);
Route.route('/login').post(usersController.login);
Route.route('/signup').post(usersController.signup);
Route.route('/password/reset').post(usersController.resetPassword);
Route.route('/password/reset/verify').post(usersController.verifyPassword);
Route.route('/password/reset/change').post(usersController.changeResetPassword);
module.exports = Route;
