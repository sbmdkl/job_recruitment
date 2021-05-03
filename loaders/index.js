const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const swaggerLoader = require('./swagger');

const init = ({ expressApp }) => {
  mongooseLoader();
  swaggerLoader(expressApp);
  expressLoader(expressApp);
};

module.exports = { init };
