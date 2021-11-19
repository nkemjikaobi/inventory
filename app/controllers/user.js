const errors = require('../utils/errors');
const httpStatus = require('http-status');

class UserController {
	constructor(userService, logger) {
		this.userService = userService;
		this.logger = logger;
	}

	createUser = (req, res) => {
		return this.userService
			.createUser(req.body)
			.then(resp => {
				this.logger.log('Response createUser: ', resp);
				return res.status(httpStatus.OK).send({ data: resp });
			})
			.catch(err => {
				this.logger.log(err);
				this.logger.log('error from User Controller: ', err);
				if (err && err.code === 11000) {
					return res
						.status(httpStatus.FORBIDDEN)
						.send(new errors.ItemAlreadyExist('User Already Exists'));
				}
				return res
					.status(httpStatus.BAD_REQUEST)
					.send(new errors.BadRequestError(err.message.toString()));
			});
	};

	loginUser = (req, res) => {
		return this.userService
			.loginUser(req.body)
			.then(resp => {
				this.logger.log('Response loginUser: ', resp);
				return res.status(httpStatus.OK).send({ data: resp });
			})
			.catch(err => {
				this.logger.error(err);
				this.logger.error('error from User Controller: ', err);
				return res
					.status(httpStatus.BAD_REQUEST)
					.send(new errors.BadRequestError(err.message.toString()));
			});
	};
}

module.exports = UserController;
