module.exports = ({ appliedjob: { _id, attributes } }) => ({
	id: _id,
	attributes
});
