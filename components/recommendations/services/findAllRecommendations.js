const { allRecommendationsDTO } = require('../dtos');
module.exports = function makeFindAllRecommendations({ Recommendation }) {
  return async function findAllRecommendations({ httpRequest: { query, user } }) {
    let recommendations = await Recommendation.findAll({ query, user });
    return allRecommendationsDTO({ recommendations });
  };
};
