const { findOneSkillDTO } = require('../dtos');
module.exports = function makeFindOneSkill({ Skill }) {
	return async function findOneSkill({ httpRequest: { params: { id } } }) {
		let skill = await Skill.findOneById(id);
		if (!skill) throw { error: 'No such skill exists' };
		return findOneSkillDTO({ skill });
	};
};
