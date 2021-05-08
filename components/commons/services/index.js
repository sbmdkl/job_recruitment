const Common = require('../commonsDAL');
const { findAll: FindAllUsers } = require('../../users/services');
const { findAll: FindAllJobs } = require('../../jobs/services');
const Client = require('../../../elasticsearch/connection');
const makeElasticInitialize = require('./elasticInitialize');
const makeSearch = require('./search');
const makeElasticPopulate = require('./elasticPopulate');
const makeAddUserDocument = require('./addUserDocument');
const makeAddJobDocument = require('./addJobDocument');

const initialize = makeElasticInitialize({ Common, Client });
const search = makeSearch({ Common, Client });
const populate = makeElasticPopulate({ Common, Client, FindAllUsers, FindAllJobs });
const addUserDocument = makeAddUserDocument({ Common, Client });
const addJobDocument = makeAddJobDocument({ Common, Client });

module.exports = {
	initialize,
	search,
	populate,
	addUserDocument,
	addJobDocument,
};
