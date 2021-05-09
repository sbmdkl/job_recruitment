// import all routes
const usersRoute = require('../components/users/usersAPI');
const jobsRoute = require('../components/jobs/jobsAPI');
const skillsRoute = require('../components/skills/skillsAPI');
const profileRoute = require('../components/profiles/profilesAPI');
const commonRoutes = require('../components/commons/commonsAPI');
const appliedJobsRoutes = require('../components/appliedjobs/appliedjobsAPI');
const init = (app) => {
	app.use('/', commonRoutes);
	app.use('/api/users', usersRoute);
	app.use('/api/jobs', jobsRoute);
	app.use('/api/skills', skillsRoute);
	app.use('/api/profiles', profileRoute);
	app.use('/api/profiles', profileRoute);
	app.use('/api/applied-jobs', appliedJobsRoutes);

	// not found
	app.all('*', (req, res, next) => {
		res.status(404).json({
			status: 'error',
			path: req.originalUrl,
			message: `The app you are using is not latest, for this service you need to update your application.`,
			systemTime: Date.now(),
		});
	});
};

module.exports = {
	init,
};
