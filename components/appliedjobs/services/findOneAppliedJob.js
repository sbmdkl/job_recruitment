const { findOneAppliedJobDTO } = require('../dtos');
module.exports = function makeFindOneAppliedJob({ AppliedJob }) {
	return async function findOneAppliedJob({ httpRequest: { params: { id } } }) {
		let appliedjob = await AppliedJob.findOneById(id);
		if (!appliedjob) throw { error: 'No such appliedjob exists' };
		return findOneAppliedJobDTO({ appliedjob });
	};
};
