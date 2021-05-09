const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppliedJobSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobs',
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  remarks: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AppliedJob = mongoose.model('appliedjobs', AppliedJobSchema);
module.exports = AppliedJob;
