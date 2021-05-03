module.exports = ({ jobs }) => {
	return jobs.map(
		({
			_id,
			title,
			location,
			total_applicants,
			level,
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
				level,
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
