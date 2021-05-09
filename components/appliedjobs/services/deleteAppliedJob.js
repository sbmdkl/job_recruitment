const { deleteAppliedJobDTO } = require('../dtos');

module.exports = function makeDeleteAppliedJob({ AppliedJob }) {
  return async function deleteAppliedJob({ httpRequest: { params, user } }) {
    let doesAppliedJobExists = await AppliedJob.findOne({id: params.id, user: user.id});
    if (!doesAppliedJobExists) throw { error: 'No such AppliedJob exists' };
    let deletedAppliedJob = await AppliedJob.findByIdAndRemove(params.id);
    return deleteAppliedJobDTO({ appliedjob: deletedAppliedJob });
  };
};
