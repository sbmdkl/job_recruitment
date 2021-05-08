module.exports = ({ commons }) => {
	return commons.map(({ _id, attributes }) => {
		return { id: _id, attributes };
	});
};
