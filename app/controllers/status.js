const errors = require('../utils/errors');
const httpStatus = require('http-status');

const response = {
	status: 'success',
	message: 'Query successful.',
	data: {
		status: 'success',
		message: 'Inventory App is up and running!',
	},
};

class StatusController {
	constructor(logger) {
		this.logger = logger;
	}
	getStatus = (req, res) => {
		this.logger.log('Response statusCheck: ', response);
		return res.status(httpStatus.OK).send(response);
	};
}

module.exports = StatusController;
