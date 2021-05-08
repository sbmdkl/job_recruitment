module.exports = function makeElasticInitialize({ Client }) {
	return async function initialize({ httpRequest: { body } }) {
		try {
			const resp = Client.indices.create({ index: 'recruiters' });
			return resp;
		} catch (e) {
			console.log(e);
		}
	};
};
