module.exports = function makeElasticPopulate({ Client, FindAllUsers, FindAllJobs }) {
	return async function populate({ httpRequest: { body } }) {
		try {
			const users = await FindAllUsers({ httpRequest: { query: { limit: 0 } } });
			console.log(users.length);
			users.forEach((user) => {
				Client.index({
					index: 'recruiters',
					id: user.id.toString(),
					type: 'users',
					body: {
						name: user.name,
						email: user.email,
						phone: user.phone,
						country: user.country,
						address: '',
						title: user.title,
						about: '',
					},
				});
			});
			const jobs = await FindAllJobs({ httpRequest: { query: { limit: 0 } } });
			console.log(jobs.length);
			jobs.forEach((job) => {
				Client.index({
					index: 'recruiters',
					id: job.id.toString(),
					type: 'jobs',
					body: {
						title: job.title,
						location: job.location,
						industry: job.industry,
					},
				});
			});
			return 'indexing...';
		} catch (e) {
			console.log(e);
		}
	};
};
