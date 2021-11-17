const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const mongoHost = config.MONGODB_URI;
const logger = require('turbo-logger').createStream({});

const startServer = async function () {
	try {
		await Promise.all([
			mongoose.connect(config.MONGODB_URI),
			app.listen(config.PORT),
		]);
		logger.log(
			`Server has started on port: ${config.PORT}, connected to mongo at ${mongoHost}`
		);
	} catch (error) {
		logger.error('Could not start the app: ', error);
	}
};
startServer();
