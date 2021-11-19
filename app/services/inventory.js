/** @format */

const Inventory = require('../Models/Inventory');
const Errors = require('../utils/errors');

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

	editInventory = async (payload, params, res) => {
		const { name, price, quantity } = payload;
		const { id } = params;
		return new Promise((resolve, reject) => {
			//Build Inventory Object
			const inventoryFields = {};
			if (name) inventoryFields.name = name;
			if (price) inventoryFields.price = price;
			if (quantity) inventoryFields.quantity = quantity;

			return Inventory.findByIdAndUpdate(
				id,
				{ $set: inventoryFields },
				{ new: true }
			)
				.then(res => {
					if (!res) {
						this.logger.log('Inventory Not Found');
						return reject(new Errors.NotFoundError('Inventory Not Found'));
					}
					this.logger.log(res);
					return resolve(res);
				})
				.catch(err => {
					this.logger.log(err.message);
					return reject(new Errors.BadRequestError(err.message));
				});
		});
	};

	getInventories = async res => {
		return new Promise((resolve, reject) => {
			return Inventory.find()
				.sort({
					date: -1,
				})
				.then(res => {
					this.logger.log('Inventory fetched');
					return resolve(res);
				})
				.catch(err => {
					this.logger.error('error occured', err);
					return reject(err);
				});
		});
	};

	deleteInventory = async (res, params) => {
		return new Promise((resolve, reject) => {
			const { id } = params;
			return Inventory.findByIdAndRemove(id)
				.then(res => {
					if (!res) {
						this.logger.log('Inventory Not Found');
						return reject(new Errors.NotFoundError('Inventory Not Found'));
					}
					this.logger.log(res);
					return resolve({ msg: 'Inventory Removed ' });
				})
				.catch(err => {
					this.logger.error('error occured', err);
					return reject(err);
				});
		});
	};
}

module.exports = InventoryService;
