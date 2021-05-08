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

const create = async (req, res) => {
	const { body } = req;
	try {
		const response = await commonsService.create({ httpRequest: { body } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const findOne = async (req, res) => {
	const { params } = req;
	try {
		const response = await commonsService.findOne({ httpRequest: { params } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const update = async (req, res) => {
	const { params, body } = req;
	try {
		const response = await commonsService.update({ httpRequest: { params, body } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const destroy = async (req, res) => {
	const { params } = req;
	try {
		const response = await commonsService.destroy({ httpRequest: { params } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

module.exports = {
	search,
	create,
	findOne,
	update,
	destroy,
};
