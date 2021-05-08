const { allCommonsDTO } = require('../dtos');
module.exports = function makeSearch({ Common }) {
	return async function serach({ httpRequest: { query } }) {
		let commons = await Common.findAll({ query });
		return allCommonsDTO({ commons });
	};
};
