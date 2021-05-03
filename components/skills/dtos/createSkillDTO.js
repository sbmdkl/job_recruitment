module.exports = ({ skill: { _id, name, description, similar } }) => ({
	id: _id,
	name,
	description,
	similar,
});
