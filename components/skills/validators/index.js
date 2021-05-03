const Validator = require('validator');
const isEmpty = require('is-empty');

const makeValidateSkill = require('./validateSkill');

const validateSkill = makeValidateSkill({ Validator, isEmpty });

module.exports = {
	validateSkill
};
