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

	// getStatus = (req, res) => {
	// 	return this.userService
	// 		.getStatus(req.body)
	// 		.then(resp => {
	// 			this.logger.log('Response createUser: ', resp);
	// 			return res.status(httpStatus.OK).send({ data: resp });
	// 		})
	// 		.catch(err => {
	// 			this.logger.error(err);
	// 			this.logger.error('error from User Controller: ', err);
	// 			return res
	// 				.status(httpStatus.BAD_REQUEST)
	// 				.send(new errors.BadRequestError(err.message.toString()));
	// 		});
	// };
	getStatus = (req, res) => {
		this.logger.log('Response statusCheck: ', response);
		return res.status(httpStatus.OK).send(response);
	};
}

module.exports = StatusController;
