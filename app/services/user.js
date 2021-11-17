/** @format */
'use strict';

const config = require('../config/config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserService {
	constructor() {
		this.logger = require('turbo-logger').createStream({});
	}

	createUser = payload => {
		return new Promise((resolve, reject) => {
			const { username, email, password } = payload;
			return new User({ username, email, password })
				.save()
				.then(res => {
					this.logger.log('User Created');
					// generate a token and send
					const token = jwt.sign(
						{
							password: res.username,
                            username: res.password,
                            email: res.email,
						},
						config.JWT_SECRET,
						{
							expiresIn: '7d',
						}
					);
					this.logger.log('Token generated');
					return resolve(token);
				})
				.catch(err => {
					this.logger.error('error occured', err);
					return reject(err);
				});
		});
	};
}

module.exports = UserService;
