module.exports = ({ profiles }) => {
	return profiles.map(({ _id, user: { name, email }, education, experience, skills }) => {
		return { id: _id, user: { name, email }, education, experience, skills };
	});
};
