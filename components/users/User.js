const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  photo: {
    type: String,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  status: {
    type: Number,
    default: 1,
  },
  token: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
