module.exports = function makeValidateSkill({ Validator, isEmpty }) {
	return function validateSkill({ name = '', description = '', similar = [], date = Date.now() }) {
		let errors = {};

		if (Validator.isEmpty(name)) {
			errors.name = 'Name field is required';
		}

		return {
			errors,
			isValid: isEmpty(errors),
			data: Object.freeze({
				getname: () => name,
				getdescription: () => description,
				getsimilar: () => similar,
				getdate: () => date,
			}),
		};
	};
};
