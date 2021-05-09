const recommendationsService = require('./services');

const findAll = async (req, res) => {
  const { body, query, params, user } = req;
  try {
    const response = await recommendationsService.findAll({ httpRequest: { query, user } });
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = {
  findAll,
};
