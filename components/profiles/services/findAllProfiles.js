const { allProfilesDTO } = require('../dtos');
module.exports = function makeFindAllProfiles({ Profile }) {
	return async function findAllProfiles({ httpRequest: { query } }) {
		let profiles = await Profile.findAll({ query });
		return allProfilesDTO({ profiles });
	};
};
