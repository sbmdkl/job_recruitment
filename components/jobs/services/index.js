const Job = require('../jobsDAL');
const AppliedJob = require('../../appliedjobs/appliedjobsDAL');
const { addJobDocument: ElasticAddJob } = require('../../commons/services');
const makeCreateJob = require('./createJob');
const makeDeleteJob = require('./deleteJob');
const makeFindAllJobs = require('./findAllJobs');
const makeFindOneJob = require('./findOneJob');
const makeUpdateJob = require('./updateJob');
const makeGetAppliedUsers = require('./getAppliedUsers');

const create = makeCreateJob({ Job, ElasticAddJob });
const destroy = makeDeleteJob({ Job });
const findAll = makeFindAllJobs({ Job });
const findOne = makeFindOneJob({ Job, AppliedJob });
const update = makeUpdateJob({ Job, ElasticAddJob });
const getAppliedUsers = makeGetAppliedUsers({ Job, AppliedJob });

module.exports = {
  create,
  destroy,
  findAll,
  findOne,
  update,
  getAppliedUsers,
};
