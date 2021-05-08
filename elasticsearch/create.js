var client = require('./connection.js');

client.indices
	.create({ index: 'recruiters' })
	.then((resp, status) => {
		console.log('create', resp);
	})
	.catch((err) => {
		console.log(err);
	});
