// import Skill model
const Skill = require('./Skill');

const create = async (newSkill) => {
	return await Skill.create(newSkill);
};

const findAll = async ({ query }) => {
	let { skip, limit } = query;
	skip = skip ? Number(skip) : 0;
	limit = limit ? Number(limit) : 10;
	return await Skill.find({}).skip(skip).limit(limit).sort('-date');
};

const findOneById = async (id) => {
	const skill = await Skill.findById(id);
	if (skill) return skill.toObject();
	else return null;
};

const findByIdAndUpdate = async ({ id, updateSkill }) => {
	return await Skill.findByIdAndUpdate(id, updateSkill, { new: true, runValidators: true });
};

const findByIdAndRemove = async (id) => {
	return await Skill.findByIdAndRemove(id);
};

module.exports = {
	create,
	findAll,
	findOneById,
	findByIdAndUpdate,
	findByIdAndRemove,
};
