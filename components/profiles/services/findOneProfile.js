const { findOneProfileDTO } = require('../dtos');
module.exports = function makeFindOneProfile({ Profile }) {
	return async function findOneProfile({
		httpRequest: {
			params: { userId },
		},
	}) {
		let profile = await Profile.findOne({ user: userId });
		if (!profile) throw { error: 'No such profile exists' };
		return findOneProfileDTO({ profile });
	};
};
