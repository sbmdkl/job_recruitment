const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const usersRoute = require('../components/users/usersAPI');
module.exports = (app) => {
	app.use(cors());

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	// Load API routes
	routes.init(app);
};
