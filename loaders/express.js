const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const passport = require('passport');
const usersRoute = require('../components/users/usersAPI');
module.exports = (app) => {
	app.use(cors());

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	// Passport Middleware
	app.use(passport.initialize());
	// Passport Config
	require('../config/passport');

	// Load API routes
	routes.init(app);
};
