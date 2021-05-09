const { findOneJobDTO } = require('../dtos');
module.exports = function makeGetAppliedUsers({ Job, AppliedJob }) {
  return async function getAppliedUsers({
    httpRequest: {
      params: { id },
      user,
    },
  }) {
    let job = await Job.findOne({ id, company: user.id });
    if (!job) throw { error: 'No such job exists' };
    let appliedJob = await AppliedJob.findAllAppliedJobs(id);
    return appliedJob;
    return findOneJobDTO({ job, isApplied });
  };
};
