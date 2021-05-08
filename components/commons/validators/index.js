const Validator = require('validator');
const isEmpty = require('is-empty');

const makeValidateCommon = require('./validateCommon');

const validateCommon = makeValidateCommon({ Validator, isEmpty });

module.exports = {
	validateCommon
};
