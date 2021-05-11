const commonsService = require('./services');

const search = async (req, res) => {
  const { body, query, params } = req;
  try {
    const response = await commonsService.search({ httpRequest: { query } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
const initialize = async (req, res) => {
  const { body } = req;
  try {
    const response = await commonsService.initialize({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send({ error: 'Document indexing has already been initialized' });
  }
};
const populate = async (req, res) => {
  const { body } = req;
  try {
    const response = await commonsService.populate({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send({ error: 'Error during populating data' });
  }
};
const destroy = async (req, res) => {
  const { body } = req;
  try {
    const response = await commonsService.destroy({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send({ error: 'Error during deleting data' });
  }
};
const addUserDocument = async (req, res) => {
  const { body } = req;
  try {
    const response = await commonsService.addUserDocument({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send({ error: 'Error during populating data' });
  }
};
const addJobDocument = async (req, res) => {
  const { body } = req;
  try {
    const response = await commonsService.addJobDocument({ httpRequest: { body } });
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send({ error: 'Error during populating data' });
  }
};

module.exports = {
  search,
  initialize,
  populate,
  destroy,
  addUserDocument,
  addJobDocument,
};
