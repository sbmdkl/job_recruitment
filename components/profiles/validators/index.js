const Validator = require('validator');
const isEmpty = require('is-empty');

const makeValidateProfile = require('./validateProfile');

const validateProfile = makeValidateProfile({ Validator, isEmpty });

module.exports = {
	validateProfile
};
