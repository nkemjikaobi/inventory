/** @format */

//const Cart = require('../models/Cart');
//const Inventory = require('../models/Inventory');
const Errors = require('../utils/errors');

class CartService {
	constructor(logger) {
		this.logger = logger;
	}

	addToCart = async (payload, res) => {
		const { product } = payload.body;
		const { _id } = payload.user;

		// return new Promise((resolve, reject) => {
		// 	return Inventory.findByIdAndUpdate(
		// 		product,
		// 		{ $set: inventoryFields },
		// 		{ new: true }

		// 	).then(res => {
		// 						const inventoryFields = {};
		// 		if (res.quantity < 1) {
		// 			this.logger.log('Items Out of Stock');
		// 			return reject(new Errors.BadRequestError('Items Out of Stock'));
		// 		}

		// 		//Add product to cart
		// 		const currentCart = {
		// 			product,
		// 			user: _id,
		// 		};
		// 		let cart = await Cart.create(currentCart);
		// 		cart = await cart.populate('product');

		// 		//Update the product quantity
		// 		//Build Inventory Object
		// 		inventoryFields.quantity = productToAdd.quantity - 1;

		// 		productToAdd = await Inventory.findByIdAndUpdate(
		// 			product,
		// 			{ $set: inventoryFields },
		// 			{ new: true }
		// 		);
		// 	})
		// })
		return new Promise((resolve, reject) => {
			// try {
			// 	let productToAdd = await Inventory.findById(product);
			// 	if (productToAdd.quantity < 1) {
			// 		this.logger.log('Items Out of Stock');
			// 		return reject(new Errors.BadRequestError('Items Out of Stock'));
			// 	}

			// 	//Add product to cart
			// 	const currentCart = {
			// 		product,
			// 		user: _id,
			// 	};
			// 	let cart = await Cart.create(currentCart);
			// 	cart = await cart.populate('product');

			// 	//Update the product quantity
			// 	//Build Inventory Object
			// 	const inventoryFields = {};
			// 	inventoryFields.quantity = productToAdd.quantity - 1;

			// 	productToAdd = await Inventory.findByIdAndUpdate(
			// 		product,
			// 		{ $set: inventoryFields },
			// 		{ new: true }
			// 	);
			// 	return resolve({ msg: cart });
			// } catch (err) {
			// 	this.logger.log(err.message);
			// 	return reject(new Errors.BadRequestError(err.message));
			// }
			return Inventory.findById(product)
				.then(res => {
					if (res.quantity < 1) {
						this.logger.log('Items Out of Stock');
						return reject(new Errors.BadRequestError('Items Out of Stock'));
					}
					//Add product to cart
					const currentCart = {
						product,
						user: _id,
					};
					if (res) {
						return Cart.create(currentCart)
							.then(res => {
								return res.populate('product');
							})
							.then(populated => {
								const inventoryFields = {};
								inventoryFields.quantity = populated.product.quantity - 1;
								return Inventory.findByIdAndUpdate(
									product,
									{ $set: inventoryFields },
									{ new: true }
								).then(res => {
									populated.product.quantity = populated.product.quantity - 1;
									resolve(populated);
								});
							});
					}
				})
				.catch(err => {
					this.logger.log(err.message);
					return reject(new Errors.BadRequestError(err.message));
				});
		});
	};
}

module.exports = CartService;
