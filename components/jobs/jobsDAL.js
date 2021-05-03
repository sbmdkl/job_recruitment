// import Job model
const Job = require('./Job');

const create = async (newJob) => {
	return await Job.create(newJob);
};

const findAll = async ({ query }) => {
	let { skip, limit } = query;
	skip = skip ? Number(skip) : 0;
	limit = limit ? Number(limit) : 10;
	return await Job.find({}).skip(skip).limit(limit).sort('-date');
};

const findOne = async (jobObject) => {
	try {
		const job = await Job.findOne(jobObject);
		if (job) return job.toObject();
		else return null;
	} catch (err) {
		throw { error: 'Unable to handle job request' };
	}
};

const findOneById = async (id) => {
	const job = await Job.findById(id);
	if (job) return job.toObject();
	else return null;
};

const findByIdAndUpdate = async ({ id, updateJob }) => {
	return await Job.findByIdAndUpdate(id, updateJob, { new: true, runValidators: true });
};

const findByIdAndRemove = async (id) => {
	return await Job.findByIdAndRemove(id);
};

module.exports = {
	create,
	findAll,
	findOne,
	findOneById,
	findByIdAndUpdate,
	findByIdAndRemove,
};
