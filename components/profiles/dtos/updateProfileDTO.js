module.exports = ({
	profile: {
		_id,
		user: { name, email },
		education,
		experience,
		skills,
	},
}) => ({
	id: _id,
	user: { name, email },
	education,
	experience,
	skills,
});
