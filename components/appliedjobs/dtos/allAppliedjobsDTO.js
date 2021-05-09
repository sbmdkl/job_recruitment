module.exports = ({ appliedjobs }) => {
	return appliedjobs.map(({ _id, attributes }) => {
		return { id: _id, attributes };
	});
};
