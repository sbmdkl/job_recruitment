const Skill = require('../skillsDAL');

const makeCreateSkill = require('./createSkill');
const makeDeleteSkill = require('./deleteSkill');
const makeFindAllSkills = require('./findAllSkills');
const makeFindOneSkill = require('./findOneSkill');
const makeUpdateSkill = require('./updateSkill');

const create = makeCreateSkill({ Skill });
const destroy = makeDeleteSkill({ Skill });
const findAll = makeFindAllSkills({ Skill });
const findOne = makeFindOneSkill({ Skill });
const update = makeUpdateSkill({ Skill });

module.exports = {
	create,
	destroy,
	findAll,
	findOne,
	update
};
