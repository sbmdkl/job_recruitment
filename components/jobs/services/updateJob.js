const { validateJob } = require('../validators');
const { updateJobDTO } = require('../dtos');

module.exports = function makeUpdateJob({ Job, ElasticAddJob }) {
  return async function updateJob({
    httpRequest: {
      params: { id },
      body,
      user,
    },
  }) {
    const job = await Job.findOne({ _id: id, company: user.id });
    if (!job) throw { error: 'No such job exists' };
    const { errors, isValid, data } = validateJob({ ...job, ...body });
    if (!isValid) {
      throw { ...errors };
    }
    const updateJob = {
      title: data.gettitle(),
      location: data.getlocation(),
      total_applicants: data.gettotal_applicants(),
      level: data.getseniority_level(),
      skills: data.getskills(),
      seniority_level: data.getseniority_level(),
      industry: data.getindustry(),
      job_function: data.getjob_function(),
      salary: data.getsalary(),
      emp_type: data.getemp_type(),
      status: data.getstatus(),
      description: data.getdescription(),
      endDate: data.getendDate(),
    };
    let updatedJob = await Job.findByIdAndUpdate({ id, updateJob });
    if (!updateJob) throw { error: 'Error while updating Job' };

    ElasticAddJob({
      httpRequest: {
        body: {
          id: id,
          title: updatedJob.title,
          location: updatedJob.location,
          industry: updatedJob.industry,
        },
      },
    });

    return updateJobDTO({ job: { ...job, ...updatedJob } });
  };
};
