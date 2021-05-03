const { findOneJobDTO } = require('../dtos');
module.exports = function makeFindOneJob({ Job }) {
	return async function findOneJob({ httpRequest: { params: { id } } }) {
		let job = await Job.findOneById(id);
		if (!job) throw { error: 'No such job exists' };
		return findOneJobDTO({ job });
	};
};
