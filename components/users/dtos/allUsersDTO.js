module.exports = ({ users }) => {
	return users.map(({ name, email }) => {
		return { name, email };
	});
};
