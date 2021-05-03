const { validateSkill } = require('../validators');
const { updateSkillDTO } = require('../dtos');

module.exports = function makeUpdateSkill({ Skill }) {
	return async function updateSkill({
		httpRequest: {
			params: { id },
			body,
		},
	}) {
		const skill = await Skill.findOneById(id);
		if (!skill) throw { error: 'No such skill exists' };
		const { errors, isValid, data } = validateSkill({ ...skill, ...body });
		if (!isValid) {
			throw { ...errors };
		}
		const updateSkill = {
			name: data.getname(),
			description: data.getdescription(),
			similar: data.getsimilar(),
		};
		let updatedSkill = await Skill.findByIdAndUpdate({ id, updateSkill });
		if (!updateSkill) throw { error: 'Error while updating Skill' };
		return updateSkillDTO({ skill: { ...skill, ...updatedSkill } });
	};
};
