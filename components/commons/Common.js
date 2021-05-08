const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommonSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Common = mongoose.model('commons', CommonSchema);
module.exports = Common;
