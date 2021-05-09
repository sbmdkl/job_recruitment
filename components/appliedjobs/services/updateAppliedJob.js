const { updateAppliedJobDTO } = require('../dtos');

module.exports = function makeUpdateAppliedJob({ AppliedJob }) {
  return async function updateAppliedJob({
    httpRequest: {
      params: { id },
      body,
    },
  }) {
    const appliedjob = await AppliedJob.findOneById(id);
    if (!appliedjob) throw { error: 'No such appliedjob exists' };
    const updateAppliedJob = {
      status: body.status,
      remarks: body.remarks,
    };
    let updatedAppliedJob = await AppliedJob.findByIdAndUpdate({ id, updateAppliedJob });
    if (!updateAppliedJob) throw { error: 'Error while updating AppliedJob' };
    return updateAppliedJobDTO({ appliedjob: { ...appliedjob, ...updatedAppliedJob } });
  };
};
