module.exports = function makeValidateCommon({ Validator, isEmpty }) {
	return function validateCommon({ attribute, date = Date.now() }) {
		let errors = {};

		if (Validator.isEmpty(attribute+ '')) {
			errors.attribute = 'Attribute field is required';
		}

		return {
			errors,
			isValid: isEmpty(errors),
			data: Object.freeze({
				getAttribute: () => attribute,
				getDate: () => date
			})
		};
	};
};
