const { validateCommon } = require('../validators');
const { updateCommonDTO } = require('../dtos');

module.exports = function makeUpdateCommon({ Common }) {
	return async function updateCommon({ httpRequest: { params: { id }, body } }) {
		const common = await Common.findOneById(id);
		if (!common) throw { error: 'No such common exists' };
		const { errors, isValid, data } = validateCommon({ ...common, ...body });
		if (!isValid) {
			throw { ...errors };
		}
		const updateCommon = {
			attribute: data.getAttribute(),
		};
		let updatedCommon = await Common.findByIdAndUpdate({ id, updateCommon });
		if (!updateCommon) throw { error: 'Error while updating Common' };
		return updateCommonDTO({ common: { ...common, ...updatedCommon } });
	};
};
