const usersService = require('./services');

const findAll = async (req, res) => {
  const { body, query, params } = req;
  try {
    const response = await usersService.findAll({ httpRequest: { query } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e);
  }
};

const login = async (req, res) => {
  const { body } = req;
  try {
    const response = await usersService.login({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const signup = async (req, res) => {
  const { body } = req;
  try {
    const response = await usersService.signUp({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e);
  }
};

const resetPassword = async (req, res) => {
  const { body, user } = req;
  try {
    const response = await usersService.resetPassword({
      httpRequest: { body },
    });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
const verifyPassword = async (req, res) => {
  const { body, user } = req;
  try {
    const response = await usersService.verifyPassword({
      httpRequest: { body },
    });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
const changeResetPassword = async (req, res) => {
  const { body, user } = req;
  try {
    const response = await usersService.changeResetPassword({
      httpRequest: { body, AuthUser: user },
    });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = {
  login,
  signup,
  findAll,
  resetPassword,
  verifyPassword,
  changeResetPassword,
};
