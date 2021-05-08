const Common = require('../commonsDAL');

const makeCreateCommon = require('./createCommon');
const makeDeleteCommon = require('./deleteCommon');
const makeSearch = require('./search');
const makeFindOneCommon = require('./findOneCommon');
const makeUpdateCommon = require('./updateCommon');

const create = makeCreateCommon({ Common });
const destroy = makeDeleteCommon({ Common });
const search = makeSearch({ Common });
const findOne = makeFindOneCommon({ Common });
const update = makeUpdateCommon({ Common });

module.exports = {
	create,
	destroy,
	search,
	findOne,
	update,
};
