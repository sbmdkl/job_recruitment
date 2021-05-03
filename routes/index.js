// import all routes
const usersRoute = require('../components/users/usersAPI');
const init = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello');
  });
  app.use('/api/users', usersRoute);

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
