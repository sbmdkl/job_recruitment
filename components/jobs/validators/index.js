const Validator = require('validator');
const isEmpty = require('is-empty');

const makeValidateJob = require('./validateJob');

const validateJob = makeValidateJob({ Validator, isEmpty });

module.exports = {
	validateJob
};
