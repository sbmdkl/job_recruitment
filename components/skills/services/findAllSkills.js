const { allSkillsDTO } = require('../dtos');
module.exports = function makeFindAllSkills({ Skill }) {
	return async function findAllSkills({ httpRequest: { query } }) {
		let skills = await Skill.findAll({ query });
		return allSkillsDTO({ skills });
	};
};
