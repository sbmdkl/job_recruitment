var client = require('./connection.js');

client.search(
	{
		index: 'recruiters',
		type: 'users',
		size: 5,
		body: {
			query: {
				query_string: {
					query: '*mpute*',
					fields: ['name^4', 'title^3', 'email'],
				},
			},
			highlight: {
				fields: {
					content: {},
				},
			},
		},
	},
	function (error, response, status) {
		if (error) {
			console.log('search error: ' + error);
		} else {
			console.log('--- Response ---');
			console.log(response);
			console.log('--- Hits ---');
			response.hits.hits.forEach(function (hit) {
				console.log(hit);
			});
		}
	}
);
