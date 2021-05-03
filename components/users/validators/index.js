const Validator = require('validator');
const isEmpty = require('is-empty');

const makeValidateLogin = require('./validateLogin');
const makeValidateSignUp = require('./validateSignUp');

const validateLogin = makeValidateLogin({ Validator, isEmpty });
const validateSignUp = makeValidateSignUp({ Validator, isEmpty });

module.exports = {
	validateLogin,
	validateSignUp
};
