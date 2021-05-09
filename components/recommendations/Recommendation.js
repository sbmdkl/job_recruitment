const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecommendationSchema = new Schema({
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

const Recommendation = mongoose.model('recommendations', RecommendationSchema);
module.exports = Recommendation;
