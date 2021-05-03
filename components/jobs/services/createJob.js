const { validateJob } = require('../validators');
const { createJobDTO } = require('../dtos');

module.exports = function makeCreateJob({ Job }) {
	return async function createJob({ httpRequest: { body, user } }) {
		const { errors, isValid, data } = validateJob(body);
		if (!isValid) {
			throw { ...errors };
		}
		const newJob = {
			company: user.id,
			title: data.gettitle(),
			location: data.getlocation(),
			total_applicants: data.gettotal_applicants(),
			level: data.getlevel(),
			// skills: data.getskills(),
			salary: data.getsalary(),
			emp_type: data.getemp_type(),
			status: data.getstatus(),
			description: data.getdescription(),
			endDate: data.getendDate(),
			date: data.getdate(),
		};
		let createdJob = await Job.create(newJob);
		return createJobDTO({ job: createdJob });
	};
};
