const profilesService = require('./services');

const findAll = async (req, res) => {
  const { body, query, params } = req;
  try {
    const response = await profilesService.findAll({ httpRequest: { query } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const create = async (req, res) => {
  const { body, user } = req;
  try {
    const response = await profilesService.create({ httpRequest: { body, user } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const findOne = async (req, res) => {
  const { params, user } = req;
  try {
    const response = await profilesService.findOne({ httpRequest: { params, user } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const update = async (req, res) => {
  const { params, body, user } = req;
  try {
    const response = await profilesService.update({ httpRequest: { params, body, user } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const destroy = async (req, res) => {
  const { params } = req;
  try {
    const response = await profilesService.destroy({ httpRequest: { params } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = {
  findAll,
  create,
  findOne,
  update,
  destroy,
};
