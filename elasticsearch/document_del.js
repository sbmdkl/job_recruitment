var client = require('./connection.js');

client
	.delete({
		index: 'recruiters',
		id: '1',
		type: 'users',
	})
	.then((resp, status) => {
		console.log(resp);
	})
	.catch((err) => {
		console.log(err);
	});
