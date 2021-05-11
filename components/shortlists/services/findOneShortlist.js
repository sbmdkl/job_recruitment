const { findOneShortlistDTO } = require('../dtos');
module.exports = function makeFindOneShortlist({ Shortlist, Job, AppliedJob, Profile, axios }) {
  return async function findOneShortlist({
    httpRequest: {
      params: { jobId },
      user,
    },
  }) {
    let job = await Job.findOne({ company: user.id, _id: jobId });

    if (!job) throw { error: 'No such job exists' };
    let appliedjob = await AppliedJob.findAllAppliedJobs(jobId);
    let profiles = [];
    for (const aj of appliedjob) {
      profile = await Profile.findOne({ user: aj.user._id });
      profiles.push(profile);
    }
    console.log({
      job,
      appliedUsers: profiles,
    });
    let shortlist = await Shortlist.findOne({ job: jobId });
    if (!shortlist) {
      // call for AI
      axios
        .post('https://flask-job-recommendation.herokuapp.com/userSortList', {
          job,
          appliedUsers: profile,
        })
        .then((res) => {
          const shortlistUsers = res.data.userId;
          const shortlistUsersObj = {
            job: jobId,
            users: shortlistUsers,
          };
          Shortlist.create(shortlistUsersObj);
        });
      return findOneShortlistDTO({ shortlist: { job: {}, users: [] } });
    } else {
      return findOneShortlistDTO({ shortlist });
    }
  };
};
