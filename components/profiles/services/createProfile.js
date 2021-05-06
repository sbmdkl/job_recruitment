const { validateProfile } = require('../validators');
const { createProfileDTO } = require('../dtos');

module.exports = function makeCreateProfile({ Profile }) {
	return async function createProfile({ httpRequest: { body, user } }) {
		const { errors, isValid, data } = validateProfile(body);
		if (!isValid) {
			throw { ...errors };
		}
		const newProfile = {
			user: user.id,
			education: data.geteducation(),
			experience: data.getexperience(),
			skills: data.getskills(),
			date: data.getDate(),
		};
		let createdProfile = await Profile.create(newProfile);
		return createProfileDTO({ profile: createdProfile });
	};
};
