const { findOneJobDTO } = require('../dtos');
module.exports = function makeFindOneJob({ Job, AppliedJob }) {
  return async function findOneJob({
    httpRequest: {
      params: { id },
      user,
    },
  }) {
    let job = await Job.findOneById(id);
    if (!job) throw { error: 'No such job exists' };
    let appliedJob = await AppliedJob.findOne({ job: id, user: user.id });
    let isApplied = false;
    if (appliedJob) {
      isApplied = true;
    }
    return findOneJobDTO({ job, isApplied });
  };
};
