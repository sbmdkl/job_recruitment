var client = require('./connection.js');

client.delete(
	{
		index: 'recruiters',
		id: '1',
		type: 'users',
	},
	function (err, resp, status) {
		console.log(resp);
	}
);
