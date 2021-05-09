const appliedjobsService = require('./services');

const findAll = async (req, res) => {
  const { body, query, params, user } = req;
  try {
    const response = await appliedjobsService.findAll({ httpRequest: { query, user } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const create = async (req, res) => {
  const { body, user } = req;
  try {
    const response = await appliedjobsService.create({ httpRequest: { body, user } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const findOne = async (req, res) => {
  const { params } = req;
  try {
    const response = await appliedjobsService.findOne({ httpRequest: { params } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const update = async (req, res) => {
  const { params, body } = req;
  try {
    const response = await appliedjobsService.update({ httpRequest: { params, body } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const destroy = async (req, res) => {
  const { params, user } = req;
  try {
    const response = await appliedjobsService.destroy({ httpRequest: { params, user } });
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
