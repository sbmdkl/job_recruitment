var client = require('./connection.js');

client
	.index({
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
	})
	.then((resp, status) => {
		console.log(resp);
	})
	.catch((err) => {
		console.log(err);
	});
