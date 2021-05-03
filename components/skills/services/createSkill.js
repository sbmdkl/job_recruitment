const { validateSkill } = require('../validators');
const { createSkillDTO } = require('../dtos');

module.exports = function makeCreateSkill({ Skill }) {
	return async function createSkill({ httpRequest: { body } }) {
		const { errors, isValid, data } = validateSkill(body);
		if (!isValid) {
			throw { ...errors };
		}
		const newSkill = {
			name: data.getname(),
			description: data.getdescription(),
			similar: data.getsimilar(),
			date: data.getdate(),
		};
		let createdSkill = await Skill.create(newSkill);
		return createSkillDTO({ skill: createdSkill });
	};
};
