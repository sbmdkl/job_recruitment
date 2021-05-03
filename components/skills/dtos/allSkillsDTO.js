module.exports = ({ skills }) => {
	return skills.map(({ _id, name, description, similar }) => {
		return { id: _id, name, description, similar };
	});
};
