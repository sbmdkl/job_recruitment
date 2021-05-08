var client = require('./connection.js');

client.cluster.health({}, function (err, resp, status) {
	console.log('-- Client Health --', resp);
});

client.count({ index: 'recruiters', type: 'users' }, function (err, resp, status) {
	console.log('users', resp);
});
