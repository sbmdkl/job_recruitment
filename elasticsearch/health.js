var client = require('./connection.js');

client.cluster
	.health({})
	.then((resp, status) => {
		console.log('-- Client Health --', resp);
		console.log(resp);
	})
	.catch((err) => {
		console.log(err);
	});

client
	.count({ index: 'recruiters', type: 'users' })
	.then((resp, status) => {
		console.log('users', resp);
		console.log(resp);
	})
	.catch((err) => {
		console.log(err);
	});
