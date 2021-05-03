const mongoose = require('mongoose');
module.exports = async () => {
	mongoose
		.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('mongodb connected');
		});
};
