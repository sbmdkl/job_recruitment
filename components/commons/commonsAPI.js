const express = require('express');
const commonsController = require('./commonsController');
const Route = express.Router();

// @route
Route.route('/es/initialize').get(commonsController.initialize);
Route.route('/es/populate').get(commonsController.populate);
Route.route('/es/search').get(commonsController.search);
Route.route('/es/users/add').get(commonsController.addUserDocument);
Route.route('/es/jobs/add').get(commonsController.addJobDocument);
Route.route('/').get((req, res) => res.send('Hello'));

module.exports = Route;
