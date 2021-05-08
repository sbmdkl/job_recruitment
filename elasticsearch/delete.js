var client = require('./connection.js');

client.indices
	.delete({ index: 'recruiters' })
	.then((resp, status) => {
		console.log('delete', resp);
	})
	.catch((err) => {
		console.log(err);
	});
