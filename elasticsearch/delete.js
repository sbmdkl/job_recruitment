var client = require('./connection.js');

client.indices.delete({ index: 'recruiters' }, function (err, resp, status) {
	console.log('delete', resp);
});
