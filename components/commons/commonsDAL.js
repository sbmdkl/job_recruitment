// import Common model
const User = require('../users/User');

const create = async (newCommon) => {
	return await Common.create(newCommon);
};

const search = async ({ query }) => {
	// implement searching...
	let { skip, limit } = query;
	skip = skip ? Number(skip) : 0;
	limit = limit ? Number(limit) : 10;
	return await User.find({}).skip(skip).limit(limit).sort('-date');
};

const findOneById = async (id) => {
	const common = await Common.findById(id);
	return common.toObject();
};

const findByIdAndUpdate = async ({ id, updateCommon }) => {
	return await Common.findByIdAndUpdate(id, updateCommon, { new: true, runValidators: true });
};

const findByIdAndRemove = async (id) => {
	return await Common.findByIdAndRemove(id);
};

module.exports = {
	create,
	search,
	findOneById,
	findByIdAndUpdate,
	findByIdAndRemove,
};
