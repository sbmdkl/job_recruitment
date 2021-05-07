module.exports = ({ jobs }) => {
	return jobs.map(
		({
			_id,
			title,
			location,
			total_applicants,
			seniority_level,
			industry,
			job_function,
			skills,
			salary,
			emp_type,
			status,
			description,
			endDate,
		}) => {
			return {
				id: _id,
				title,
				location,
				total_applicants,
				seniority_level,
				industry,
				job_function,
				skills,
				salary,
				emp_type,
				status,
				description,
				endDate,
			};
		}
	);
};
