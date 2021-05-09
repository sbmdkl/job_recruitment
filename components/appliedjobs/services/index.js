const AppliedJob = require('../appliedjobsDAL');

const makeCreateAppliedJob = require('./createAppliedJob');
const makeDeleteAppliedJob = require('./deleteAppliedJob');
const makeFindAllAppliedjobs = require('./findAllAppliedjobs');
const makeFindOneAppliedJob = require('./findOneAppliedJob');
const makeUpdateAppliedJob = require('./updateAppliedJob');

const create = makeCreateAppliedJob({ AppliedJob });
const destroy = makeDeleteAppliedJob({ AppliedJob });
const findAll = makeFindAllAppliedjobs({ AppliedJob });
const findOne = makeFindOneAppliedJob({ AppliedJob });
const update = makeUpdateAppliedJob({ AppliedJob });

module.exports = {
	create,
	destroy,
	findAll,
	findOne,
	update
};
