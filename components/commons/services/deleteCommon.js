const { deleteCommonDTO } = require('../dtos');

module.exports = function makeDeleteCommon({ Common }) {
	return async function deleteCommon({ httpRequest: { params } }) {
		let doesCommonExists = await Common.findOneById(params.id);
		if (!doesCommonExists) throw { error: 'No such Common exists' };
		let deletedCommon = await Common.findByIdAndRemove(params.id);
		return deleteCommonDTO({ common: deletedCommon });
	};
};
