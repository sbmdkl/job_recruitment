const express = require('express');
const commonsController = require('./commonsController');
const Route = express.Router();

// @route
Route.route('/search').get(commonsController.search);
Route.route('/es/initialize').get(commonsController.initialize);

module.exports = Route;
