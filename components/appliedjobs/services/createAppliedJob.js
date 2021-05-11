const { createAppliedJobDTO } = require('../dtos');

module.exports = function makeCreateAppliedJob({ AppliedJob, Job }) {
  return async function createAppliedJob({ httpRequest: { body, user } }) {
    let isJobApplied = await AppliedJob.findOne({ job: body.jobId, user: user.id });
    if (isJobApplied?.user) {
      throw { error: 'You have already applied for this Job' };
    }
    AppliedJob.findOne;
    const newAppliedJob = {
      user: user.id,
      job: body.jobId,
    };
    let createdAppliedJob = await AppliedJob.create(newAppliedJob);
    let job = await Job.findOne({ _id: body.jobId });
    let upjob = await Job.findByIdAndUpdate({
      id: job.id,
      updateJob: { total_applicants: parseInt(job.total_applicants) + 1 },
    });
    console.log(upjob);
    return createAppliedJobDTO({ appliedjob: createdAppliedJob });
  };
};
