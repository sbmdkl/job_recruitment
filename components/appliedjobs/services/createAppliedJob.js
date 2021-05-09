const { createAppliedJobDTO } = require('../dtos');

module.exports = function makeCreateAppliedJob({ AppliedJob }) {
  return async function createAppliedJob({ httpRequest: { body, user } }) {
    const newAppliedJob = {
      user: user.id,
      job: body.jobId,
    };
    let createdAppliedJob = await AppliedJob.create(newAppliedJob);
    return createAppliedJobDTO({ appliedjob: createdAppliedJob });
  };
};
