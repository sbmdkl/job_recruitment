const { findOneShortlistDTO } = require('../dtos');
module.exports = function makeFindOneShortlist({ Shortlist, Job }) {
	return async function findOneShortlist({ httpRequest: { params: { jobId }, user } }) {
		let job = await Job.findOne({user: user.id, id, jobId});
		if(!job) throw {error: 'No such job exists'}
		
		let shortlist = await Shortlist.findOne({job: jobId });
		if (!shortlist) throw { error: 'No such shortlist exists' };
		return findOneShortlistDTO({ shortlist });
	};
};
