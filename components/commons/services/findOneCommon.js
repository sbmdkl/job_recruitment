const { findOneCommonDTO } = require('../dtos');
module.exports = function makeFindOneCommon({ Common }) {
	return async function findOneCommon({ httpRequest: { params: { id } } }) {
		let common = await Common.findOneById(id);
		if (!common) throw { error: 'No such common exists' };
		return findOneCommonDTO({ common });
	};
};
