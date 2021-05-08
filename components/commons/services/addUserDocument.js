module.exports = function makeAddDocument({ Client }) {
	return async function addDocument({ httpRequest: { body } }) {
		try {
			client.index({
				index: 'recruiters',
				id: body.id,
				type: 'users',
				body: {
					name: body.name,
					email: body.email,
					phone: body.phone,
					country: body.country,
					address: body.address,
					title: body.title,
					about: '',
				},
			});

			const resp = Client.indices.create({ index: 'recruiters' });
			return resp;
		} catch (e) {
			console.log(e);
		}
	};
};
