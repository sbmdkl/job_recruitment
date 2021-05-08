var client = require('./connection.js');

client
	.search({
		index: 'recruiters',
		type: 'users',
		size: 5,
		body: {
			query: {
				query_string: {
					query: '*Blewett*',
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
	})
	.then((response, status) => {
		console.log('--- Response ---');
		console.log(response);
		console.log('--- Hits ---');
		response.hits.hits.forEach(function (hit) {
			console.log(hit);
		});
	})
	.catch((err) => {
		console.log('search error: ' + error);
		console.log(err);
	});
