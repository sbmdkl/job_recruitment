const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../usersDAL');
const { generateOTP } = require('../../../utils/helpers');

const makeFindAllUsers = require('./findAllUsers');
const makeUserLogin = require('./usersLogin');
const makeUserSignUp = require('./usersSignUp');
const makePasswordReset = require('./ResetPassword');
const makeVerifyPassword = require('./VerifyPassword');
const makeChangeResetPassword = require('./changeResetPassword');

const findAll = makeFindAllUsers({ User });
const login = makeUserLogin({ User, bcrypt, jwt });
const signUp = makeUserSignUp({ User, bcrypt, jwt });
const resetPassword = makePasswordReset({ User, generateOTP });
const verifyPassword = makeVerifyPassword({ User, generateOTP, jwt });
const changeResetPassword = makeChangeResetPassword({ User, bcrypt });

module.exports = {
  login,
  signUp,
  findAll,
  resetPassword,
  verifyPassword,
  changeResetPassword,
};
