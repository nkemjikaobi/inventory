const serviceLocator = require('./service-locator');
const turboLogger = require('turbo-logger').createStream({});
const UserService = require('../services/user');
const UserController = require('../controllers/user');

serviceLocator.register('logger', () => {
	return turboLogger;
});

serviceLocator.register('userService', () => {
	let logger = serviceLocator.get('logger');

	return new UserService(logger);
});

serviceLocator.register('userController', () => {
	let userService = serviceLocator.get('userService');
	let logger = serviceLocator.get('logger');

	return new UserController(userService, logger);
});

module.exports = serviceLocator;
