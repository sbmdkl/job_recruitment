var client = require('./connection.js');

client.index(
	{
		index: 'recruiters',
		id: '609562e0bff591183cfbde04',
		type: 'users',
		body: {
			name: 'Andie Shellshear',
			email: 'ashellshear1@hexun.com',
			phone: '5876544810',
			country: 'Poland',
			address: '',
			title: 'Pharmacist',
			about: '',
		},
	},
	function (err, resp, status) {
		console.log(resp);
	}
);
