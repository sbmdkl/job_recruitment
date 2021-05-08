const { allCommonsDTO } = require('../dtos');
const Fragmentation = { fragment_size: 150, number_of_fragments: 1 };
const UserField = {
	title: Fragmentation,
	name: Fragmentation,
	email: Fragmentation,
};
const JobField = {
	title: Fragmentation,
	location: Fragmentation,
	industry: Fragmentation,
};
module.exports = function makeSearch({ Common, Client }) {
	return async function serach({ httpRequest: { query } }) {
		// search query
		let { q, type, size } = query;
		q = q ? q : '';
		type = type === 'users' ? type : type === 'jobs' ? type : 'users';
		size = Number(size) ? Number(size) : 1000;
		const response = await Client.search({
			index: 'recruiters',
			type: type,
			size,
			body: {
				query: {
					query_string: {
						query: `*${q}*`,
						fields:
							type === 'users'
								? ['name^4', 'title^3', 'email']
								: ['title^4', 'location^3', 'industry'],
					},
				},
				highlight: {
					pre_tags: ['<b>'],
					post_tags: ['</b>'],
					fields: type === 'users' ? UserField : JobField,
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
