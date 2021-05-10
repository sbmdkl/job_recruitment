const shortlistsService = require('./services');


const findOne = async (req, res) => {
	const { params, user } = req;
	try {
		const response = await shortlistsService.findOne({ httpRequest: { params, user } });
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};


module.exports = {
	findOne,
};
