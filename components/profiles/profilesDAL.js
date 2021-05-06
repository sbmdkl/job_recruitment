// import Profile model
const Profile = require('./Profile');

const create = async (newProfile) => {
	return await Profile.create(newProfile);
};

const findAll = async ({ query }) => {
	let { skip, limit } = query;
	skip = skip ? Number(skip) : 0;
	limit = limit ? Number(limit) : 10;
	return await Profile.find({})
		.skip(skip)
		.limit(limit)
		.sort('-date')
		.populate('user', '-date -token -status -password');
};

const findOne = async (profileObject) => {
	try {
		const profile = await Profile.findOne(profileObject).populate(
			'user',
			'-date -token -status -password'
		);
		if (profile) return profile.toObject();
		else return null;
	} catch (err) {
		throw { error: 'Unable to handle profile request' };
	}
};
const findOneById = async (id) => {
	try {
		const profile = await Profile.findById(id).populate('user', '-date -token -status -password');
		if (profile) return profile.toObject();
		else return null;
	} catch (err) {
		throw { error: 'Unable to handle profile request' };
	}
};

const findByIdAndUpdate = async ({ id, updateProfile }) => {
	return await Profile.findByIdAndUpdate(id, updateProfile, { new: true, runValidators: true });
};

const findByIdAndRemove = async (id) => {
	return await Profile.findByIdAndRemove(id);
};

module.exports = {
	create,
	findAll,
	findOne,
	findOneById,
	findByIdAndUpdate,
	findByIdAndRemove,
};
