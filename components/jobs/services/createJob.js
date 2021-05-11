const { validateJob } = require('../validators');
const { createJobDTO } = require('../dtos');

module.exports = function makeCreateJob({ Job, ElasticAddJob, axios, Recommendation }) {
  return async function createJob({ httpRequest: { body, user } }) {
    const { errors, isValid, data } = validateJob(body);
    if (!isValid) {
      throw { ...errors };
    }
    const newJob = {
      company: user.id,
      title: data.gettitle(),
      location: data.getlocation(),
      total_applicants: data.gettotal_applicants(),
      skills: data.getskills(),
      seniority_level: data.getseniority_level(),
      industry: data.getindustry(),
      job_function: data.getjob_function(),
      salary: data.getsalary(),
      emp_type: data.getemp_type(),
      status: data.getstatus(),
      description: data.getdescription(),
      endDate: data.getendDate(),
      date: data.getdate(),
    };
    let createdJob = await Job.create(newJob);

    let dataAI = '';
    // fetch for recommendation list
    createdJob.skills.forEach((skill) => {
      dataAI += skill.name + ' ';
    });
    console.log(dataAI);
    axios
      .post('http://flask-job-recommendation.herokuapp.com/recommend-job', { job_skills: dataAI })
      .then((res) => {
        const recommendedUser = res.data.userId;
        const recommendationObj = {
          job: createdJob.id,
          users: recommendedUser,
        };
        Recommendation.create(recommendationObj);
      });

    ElasticAddJob({
      httpRequest: {
        body: {
          id: createdJob.id,
          title: createdJob.title,
          location: createdJob.location,
          industry: createdJob.industry,
        },
      },
    });

    return createJobDTO({ job: createdJob });
  };
};
