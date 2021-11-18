/** @format */

const Inventory = require('../models/Inventory');

class InventoryService {
	constructor(logger) {
		this.logger = logger;
	}

	createInventory = payload => {
		return new Promise((resolve, reject) => {
			const { name, price, quantity } = payload;
			return new Inventory({ name, price, quantity })
				.save()
				.then(res => {
					this.logger.log('Inventory Created');
					return resolve(res);
				})
				.catch(err => {
					this.logger.error('error occured', err);
					return reject(err);
				});
		});
	};
}

module.exports = InventoryService;
