const serviceLocator = require('./service-locator');
const turboLogger = require('turbo-logger').createStream({});
const UserService = require('../services/user');
const UserController = require('../controllers/user');
const InventoryService = require('../services/inventory');
const InventoryController = require('../controllers/inventory');
const StatusController = require('../controllers/status');
const CartController = require('../controllers/cart');
const CartService = require('../services/cart');


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

serviceLocator.register('inventoryService', () => {
	let logger = serviceLocator.get('logger');

	return new InventoryService(logger);
});

serviceLocator.register('inventoryController', () => {
	let inventoryService = serviceLocator.get('inventoryService');
	let logger = serviceLocator.get('logger');

	return new InventoryController(inventoryService, logger);
});

serviceLocator.register('cartService', () => {
	let logger = serviceLocator.get('logger');

	return new CartService(logger);
});

serviceLocator.register('cartController', () => {
	let cartService = serviceLocator.get('cartService');
	let logger = serviceLocator.get('logger');

	return new CartController(cartService, logger);
});

serviceLocator.register('statusController', () => {
	let logger = serviceLocator.get('logger');

	return new StatusController(logger);
});

module.exports = serviceLocator;
