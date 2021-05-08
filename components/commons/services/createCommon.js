const { validateCommon } = require('../validators');
const { createCommonDTO } = require('../dtos');

module.exports = function makeCreateCommon({ Common }) {
	return async function createCommon({ httpRequest: { body } }) {
		const { errors, isValid, data } = validateCommon(body);
		if (!isValid) {
			throw { ...errors };
		}
		const newCommon = {
			attributes: data.getAttributes(),
		};
		let createdCommon = await Common.create(newCommon);
		return createCommonDTO({ common: createdCommon });
	};
};
