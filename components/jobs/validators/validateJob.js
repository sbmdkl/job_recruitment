module.exports = function makeValidateJob({ Validator, isEmpty }) {
	return function validateJob({
		title = '',
		location = '',
		total_applicants = 0,
		level = 'Entry',
		skills = [],
		salary = 'Negotiable',
		emp_type = 'Full-Time',
		status = 'Published',
		description = '',
		endDate = Date.now(),
		date = Date.now(),
	}) {
		let errors = {};

		if (Validator.isEmpty(title)) {
			errors.title = 'Title field is required';
		}
		// if (skills.length === 0) {
		// 	errors.skills = 'Minimun 1 skill required';
		// }

		return {
			errors,
			isValid: isEmpty(errors),
			data: Object.freeze({
				gettitle: () => title,
				getlocation: () => location,
				gettotal_applicants: () => total_applicants,
				getlevel: () => level,
				getskills: () => skills,
				getsalary: () => salary,
				getemp_type: () => emp_type,
				getstatus: () => status,
				getdescription: () => description,
				getendDate: () => endDate,
				getdate: () => date,
			}),
		};
	};
};
