/** @format */

const config = require('../config/config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

					const token = jwt.sign(
						{
							_id: res._id,
							password: res.username,
							username: res.password,
							email: res.email,
							isAdmin: res.isAdmin,
						},
						config.JWT_SECRET,
						{
							expiresIn: '7d',
						}
					);

					return resolve(token);
					// return resolve(res);
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
				console.log(user)
				// if (err || !user) {
				// 	reject(err);
					// return res.status(400).json({
					// 	error: 'User with that email does not exist. Please signup',
					// });
				// }
				// authenticate
				// if (!user) {
				// 	// return res.status(400).json({
				// 	// 	error: 'Email and password do not match',
				// 	// });
				// 	// return reject('err authenticating');
				// 	return reject('err authenticating')
				// }

				// generate a token and send to client
				// const token = jwt.sign(
				// 	{
				// 		_id: res._id,
				// 		password: res.username,
				// 		username: res.password,
				// 		email: res.email,
				// 		isAdmin: res.isAdmin,
				// 	},
				// 	config.JWT_SECRET,
				// 	{
				// 		expiresIn: '7d',
				// 	}
				// );

				// return resolve(token);
			});
		});
	};
}

module.exports = UserService;
