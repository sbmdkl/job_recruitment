const { deleteSkillDTO } = require('../dtos');

module.exports = function makeDeleteSkill({ Skill }) {
	return async function deleteSkill({ httpRequest: { params } }) {
		let doesSkillExists = await Skill.findOneById(params.id);
		if (!doesSkillExists) throw { error: 'No such Skill exists' };
		let deletedSkill = await Skill.findByIdAndRemove(params.id);
		return deleteSkillDTO({ skill: deletedSkill });
	};
};
