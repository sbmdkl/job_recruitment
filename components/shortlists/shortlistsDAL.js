// import Shortlist model
const Shortlist = require('./Shortlist');

const create = async (newShortlist) => {
  return await Shortlist.create(newShortlist);
};

const findOne = async (shortlistObj) => {
  const shortlist = await Shortlist.findOne(shortlistObj)
    .populate([
      {
        path: 'job',
        select: 'title emp_type industry seniority_level company',
        populate: { path: 'company', select: 'name title email' },
      },
    ])
    .populate([
      {
        path: 'users',
        select: 'title name email phone',
      },
    ]);
  if (shortlist) return shortlist.toObject();
  else return null;
};

module.exports = {
  create,
  findOne,
};
