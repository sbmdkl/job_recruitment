const Recommendation = require('../recommendationsDAL');

const makeFindAllRecommendations = require('./findAllRecommendations');

const findAll = makeFindAllRecommendations({ Recommendation });

module.exports = {
  findAll,
};
