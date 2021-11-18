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

	editInventory = async (payload, params, res) => {
		const { name, price, quantity } = payload;
		const { id } = params;

		console.log(params);

		//Build Inventory Object
		const inventoryFields = {};
		if (name) inventoryFields.name = name;
		if (price) inventoryFields.price = price;
		if (quantity) inventoryFields.quantity = quantity;

		try {
			let inventory = await Inventory.findById(id);
			//Check if inventory exists
			if (!inventory) {
				return res.status(404).json({ msg: 'Inventory not found' });
			}

			//Update the inventory
			inventory = await Inventory.findByIdAndUpdate(
				id,
				{ $set: inventoryFields },
				{ new: true }
			);
			console.log(inventory);
			res.json(inventory);
		} catch (err) {
			console.error(err.message);
			return res.status(500).json({ msg: 'Server Error' });
		}
	};
}

module.exports = InventoryService;
