const { allJobsDTO } = require('../dtos');
module.exports = function makeFindAllJobs({ Job }) {
  return async function findAllJobs({ httpRequest: { query, user } }) {
    let jobs = [];
    if (user.role === 'user') jobs = await Job.findAll({ query });
    else if (user.role === 'company') jobs = await Job.findAllJobsByCompany(user.id);
    return allJobsDTO({ jobs });
  };
};
