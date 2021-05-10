const axios = require('axios');
const Shortlist = require('../shortlistsDAL');
const Job = require('../../jobs/jobsDAL');
const AppliedJob = require('../../appliedjobs/appliedjobsDAL');
const Profile = require('../../profiles/profilesDAL');

const makeFindOneShortlist = require('./findOneShortlist');

const findOne = makeFindOneShortlist({ Shortlist, Job, AppliedJob, Profile, axios });

module.exports = {
  findOne,
};
