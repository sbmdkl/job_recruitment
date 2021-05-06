const { deleteProfileDTO } = require('../dtos');

module.exports = function makeDeleteProfile({ Profile }) {
	return async function deleteProfile({ httpRequest: { params } }) {
		let doesProfileExists = await Profile.findOneById(params.id);
		if (!doesProfileExists) throw { error: 'No such Profile exists' };
		let deletedProfile = await Profile.findByIdAndRemove(params.id);
		return deleteProfileDTO({ profile: deletedProfile });
	};
};
