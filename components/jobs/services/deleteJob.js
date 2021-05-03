const { deleteJobDTO } = require('../dtos');

module.exports = function makeDeleteJob({ Job }) {
	return async function deleteJob({ httpRequest: { params } }) {
		let doesJobExists = await Job.findOneById(params.id);
		if (!doesJobExists) throw { error: 'No such Job exists' };
		let deletedJob = await Job.findByIdAndRemove(params.id);
		return deleteJobDTO({ job: deletedJob });
	};
};
