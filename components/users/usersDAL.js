// import user Model
const User = require('./User');

const create = async (newUser) => {
  const user = await User.create(newUser);
  return user;
};

const findUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
};

const findAll = async ({ query }) => {
  let { skip, limit } = query;
  skip = skip ? Number(skip) : 0;
  limit = limit ? Number(limit) : 10;
  const users = await User.find({}).skip(skip).limit(limit);
  return users;
};

const findOne = async (userObject) => {
  try {
    const user = await User.findOne(userObject);
    if (user) return user.toObject();
    else return null;
  } catch (err) {
    throw { error: 'Unable to handle users request' };
  }
};

const findByIdAndUpdate = async ({ id, updateUser }) => {
  try {
    return await User.findByIdAndUpdate(id, updateUser, { new: true, runValidators: true });
  } catch (e) {
    console.log(e);
    throw { error: 'Unable to handle request' };
  }
};

module.exports = { create, findUserByEmail, findAll, findOne, findByIdAndUpdate };
