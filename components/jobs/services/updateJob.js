const { validateJob } = require('../validators');
const { updateJobDTO } = require('../dtos');

module.exports = function makeUpdateJob({ Job }) {
	return async function updateJob({
		httpRequest: {
			params: { id },
			body,
		},
	}) {
		const job = await Job.findOne({ _id, company: user.id });
		if (!job) throw { error: 'No such job exists' };
		const { errors, isValid, data } = validateJob({ ...job, ...body });
		if (!isValid) {
			throw { ...errors };
		}
		const updateJob = {
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
		};
		let updatedJob = await Job.findByIdAndUpdate({ id, updateJob });
		if (!updateJob) throw { error: 'Error while updating Job' };
		return updateJobDTO({ job: { ...job, ...updatedJob } });
	};
};
