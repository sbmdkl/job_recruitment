module.exports = ({ users }) => {
	return users.map(({ _id, name, email, title }) => {
		return { id: _id, name, email, title };
	});
};
