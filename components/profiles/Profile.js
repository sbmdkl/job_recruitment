const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	education: [
		{
			school: {
				type: String,
			},
			degree: {
				type: String,
			},
			from: {
				type: String,
			},
			to: {
				type: String,
			},
			description: {
				type: String,
			},
		},
	],
	experience: [
		{
			title: {
				type: String,
			},
			emp_type: {
				type: String,
			},
			company: {
				type: String,
			},
			location: {
				type: String,
			},
			start: {
				type: String,
			},
			end: {
				type: String,
			},
		},
	],
	skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skills' }],
	date: {
		type: Date,
		default: Date.now,
	},
});

const Profile = mongoose.model('profiles', ProfileSchema);
module.exports = Profile;
