const mongoose = require('mongoose');

const { Schema } = mongoose;

const SkillSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	similar: [
		{
			type: Schema.Types.ObjectId,
			ref: 'skills',
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

const Skill = mongoose.model('skills', SkillSchema);
module.exports = Skill;
