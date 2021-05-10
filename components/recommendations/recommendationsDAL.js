// import Recommendation model
const Recommendation = require('./Recommendation');

const create = async (newRecommendation) => {
  return await Recommendation.create(newRecommendation);
};

const findAll = async ({ query, user }) => {
  let { skip, limit } = query;
  skip = skip ? Number(skip) : 0;
  limit = limit ? Number(limit) : 10;
  let recommendations = await Recommendation.find({})
    .sort('-date')
    .populate([
      {
        path: 'job',
        select: 'title emp_type industry seniority_level company',
        populate: { path: 'company', select: 'name title email' },
      },
    ]);
  let results = [];
  recommendations.forEach((rec) => {
    if (rec.users.includes(user.id)) results.push(rec);
  });
  return results;
  // .skip(skip)
  // .limit(limit)
  // .sort('-date')
  // .populate([
  //   {
  //     path: 'job',
  //     select: 'title emp_type industry seniority_level company',
  //     populate: { path: 'company', select: 'name title email' },
  //   },
  // ]);
};

const findOneById = async (id) => {
  const recommendation = await Recommendation.findById(id);
  return recommendation.toObject();
};

const findByIdAndUpdate = async ({ id, updateRecommendation }) => {
  return await Recommendation.findByIdAndUpdate(id, updateRecommendation, {
    new: true,
    runValidators: true,
  });
};

const findByIdAndRemove = async (id) => {
  return await Recommendation.findByIdAndRemove(id);
};

module.exports = {
  create,
  findAll,
  findOneById,
  findByIdAndUpdate,
  findByIdAndRemove,
};
