const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShortlistSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'jobs',
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
});

const Shortlist = mongoose.model('shortlists', ShortlistSchema);
module.exports = Shortlist;
