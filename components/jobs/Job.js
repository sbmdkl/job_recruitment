const mongoose = require('mongoose');

const { Schema } = mongoose;

const JobSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	location: {
		type: String,
	},
	total_applicants: {
		type: Number,
		default: 0,
	},
	skills: [
		{
			type: Schema.Types.ObjectId,
			ref: 'skills',
		},
	],
	salary: {
		type: String,
		default: 'Negotiable',
	},
	emp_type: {
		type: String,
		default: 'Full-Time',
	},
	seniority_level: {
		type: String,
		default: 'Intermediate'
	},
	industry: {
		type: String,
		default: 'Computer Software'
	},
	job_function: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		default: 'Published',
	},
	description: {
		type: String,
	},
	endDate: {
		type: Date,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Job = mongoose.model('jobs', JobSchema);
module.exports = Job;
