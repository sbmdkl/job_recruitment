// import AppliedJob model
const AppliedJob = require('./AppliedJob');

const create = async (newAppliedJob) => {
  return await AppliedJob.create(newAppliedJob);
};

const findAll = async ({ query, user }) => {
  let { skip, limit } = query;
  skip = skip ? Number(skip) : 0;
  limit = limit ? Number(limit) : 10;
  return await AppliedJob.find({ user: user.id })
    .skip(skip)
    .limit(limit)
    .sort('-date')
    .populate([
      {
        path: 'job',
        select: 'title emp_type industry seniority_level company',
        populate: { path: 'company', select: 'name title email' },
      },
    ])
    .populate('user', 'name title');
};

const findAllAppliedJobs = async (jobId) => {
  return await AppliedJob.find({ job: jobId }).sort('-date').populate('user', 'name title');
};

const findOne = async (appliedJobObj) => {
  const appliedjob = await AppliedJob.findOne(appliedJobObj);
  if (appliedjob) return appliedjob.toObject();
  else return null;
};
const findOneById = async (id) => {
  const appliedjob = await AppliedJob.findById(id);
  if (appliedjob) return appliedjob.toObject();
  else return null;
};

const findByIdAndUpdate = async ({ id, updateAppliedJob }) => {
  return await AppliedJob.findByIdAndUpdate(id, updateAppliedJob, {
    new: true,
    runValidators: true,
  });
};

const findByIdAndRemove = async (id) => {
  return await AppliedJob.findByIdAndRemove(id);
};

module.exports = {
  create,
  findAll,
  findOne,
  findOneById,
  findByIdAndUpdate,
  findByIdAndRemove,
  findAllAppliedJobs,
};
