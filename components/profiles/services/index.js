const Profile = require('../profilesDAL');

const makeCreateProfile = require('./createProfile');
const makeDeleteProfile = require('./deleteProfile');
const makeFindAllProfiles = require('./findAllProfiles');
const makeFindOneProfile = require('./findOneProfile');
const makeUpdateProfile = require('./updateProfile');

const create = makeCreateProfile({ Profile });
const destroy = makeDeleteProfile({ Profile });
const findAll = makeFindAllProfiles({ Profile });
const findOne = makeFindOneProfile({ Profile });
const update = makeUpdateProfile({ Profile });

module.exports = {
	create,
	destroy,
	findAll,
	findOne,
	update
};
