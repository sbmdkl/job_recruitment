const { allCommonsDTO } = require('../dtos');
module.exports = function makeSearch({ Common, Client }) {
	return async function serach({ httpRequest: { query } }) {
		// search query
		let { q, type, size } = query;
		q = q ? q : '';
		type = type ? type : 'users';
		size = size ? size : 10;
		const response = await Client.search({
			index: 'recruiters',
			type: type,
			size,
			body: {
				query: {
					query_string: {
						query: `*${q}*`,
						fields: ['name^4', 'title^3', 'email'],
					},
				},
				highlight: {
					pre_tags: ['<b>'],
					post_tags: ['</b>'],
					fields: {
						title: { fragment_size: 150, number_of_fragments: 1 },
						name: { fragment_size: 150, number_of_fragments: 1 },
						email: { fragment_size: 150, number_of_fragments: 1 },
					},
				},
			},
		});

		const data = [];
		response.hits.hits.forEach(function (hit) {
			data.push({
				source: hit._source,
				highlight: hit.highlight,
			});
		});
		const res = {
			time_taken: response.took ? response.took + ' ms' : 0,
			total: response.hits.total.value,
			data,
		};
		return res;
	};
};
