module.exports = function makeValidateProfile({ Validator, isEmpty }) {
	return function validateProfile({
		education = [],
		experience = [],
		skills = [],
		date = Date.now(),
	}) {
		let errors = {};

		return {
			errors,
			isValid: isEmpty(errors),
			data: Object.freeze({
				geteducation: () => education,
				getexperience: () => experience,
				getskills: () => skills,
				getDate: () => date,
			}),
		};
	};
};
