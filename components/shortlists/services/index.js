const Shortlist = require('../shortlistsDAL');
const Job = require('../../jobs/jobsDAL');

const makeFindOneShortlist = require('./findOneShortlist');

const findOne = makeFindOneShortlist({ Shortlist, Job });

module.exports = {
	findOne,
};
