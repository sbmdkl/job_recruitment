const skillsService = require('./services');

const findAll = async (req, res) => {
	const { body, query, params } = req;
	try {
		const response = await skillsService.findAll({ httpRequest: { query } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const create = async (req, res) => {
	const { body } = req;
	try {
		const response = await skillsService.create({ httpRequest: { body } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const findOne = async (req, res) => {
	const { params } = req;
	try {
		const response = await skillsService.findOne({ httpRequest: { params } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const update = async (req, res) => {
	const { params, body } = req;
	try {
		const response = await skillsService.update({ httpRequest: { params, body } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const destroy = async (req, res) => {
	const { params } = req;
	try {
		const response = await skillsService.destroy({ httpRequest: { params } });
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
	destroy
};
