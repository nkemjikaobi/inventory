/** @format */
const config = require('../config/config');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const Errors = require('../utils/errors');

class UserService {
	constructor() {
		this.logger = require('turbo-logger').createStream({});
	}

	createUser = payload => {
		return new Promise((resolve, reject) => {
			const { username, email, password, isAdmin } = payload;
			return new User({ username, email, password, isAdmin })
				.save()
				.then(res => {
					this.logger.log('User Created');
					return resolve(res);
				})
				.catch(err => {
					this.logger.error('error occured', err);
					return reject(err);
				});
		});
	};

	loginUser = payload => {
		return new Promise((resolve, reject) => {
			const { email, password } = payload;
			User.findOne({ email }).exec((err, user) => {
				if (err || !user) {
					return reject(
						new Errors.BadRequestError(
							'User with that email does not exist. Please register'
						)
					);
				}
				// authenticate
				if (!user.authenticate(password)) {
					return reject(
						new Errors.BadRequestError('Email and password do not match')
					);
				}

				// generate a token and send to client
				const token = jwt.sign(
					{
						_id: user._id,
						username: user.username,
						email: user.email,
						password: user.password,
						isAdmin: user.isAdmin,
					},
					config.JWT_SECRET,
					{
						expiresIn: '7d',
					}
				);
				const { _id, email } = user;

				const data = {
					token,
					user: { _id, email },
				};
				return resolve(data);
			});
		});
	};
}

module.exports = UserService;
