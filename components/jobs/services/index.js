const Job = require('../jobsDAL');

const makeCreateJob = require('./createJob');
const makeDeleteJob = require('./deleteJob');
const makeFindAllJobs = require('./findAllJobs');
const makeFindOneJob = require('./findOneJob');
const makeUpdateJob = require('./updateJob');

const create = makeCreateJob({ Job });
const destroy = makeDeleteJob({ Job });
const findAll = makeFindAllJobs({ Job });
const findOne = makeFindOneJob({ Job });
const update = makeUpdateJob({ Job });

module.exports = {
	create,
	destroy,
	findAll,
	findOne,
	update
};