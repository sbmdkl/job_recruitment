const { allJobsDTO } = require('../dtos');
module.exports = function makeFindAllJobs({ Job }) {
	return async function findAllJobs({ httpRequest: { query } }) {
		let jobs = await Job.findAll({ query });
		return allJobsDTO({ jobs });
	};
};
