const { allAppliedjobsDTO } = require('../dtos');
module.exports = function makeFindAllAppliedjobs({ AppliedJob }) {
  return async function findAllAppliedjobs({ httpRequest: { query, user } }) {
    let appliedjobs = await AppliedJob.findAll({ query, user });
    return allAppliedjobsDTO({ appliedjobs });
  };
};
