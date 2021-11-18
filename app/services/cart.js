/** @format */

const Cart = require('../models/Cart');
const Inventory = require('../models/Inventory');
const Errors = require('../utils/errors');

class CartService {
	constructor(logger) {
		this.logger = logger;
	}

	addToCart = async (payload, res) => {
		const { product } = payload.body;
		const { _id } = payload.user;

		try {
			let productToAdd = await Inventory.findById(product);
			if (productToAdd.quantity < 1) {
				
			this.logger.log("Items Out of Stock");
			return reject(new Errors.BadRequestError("Items Out of Stock"));
			}

			//Add product to cart
			const currentCart = new Cart({
				product,
				user: _id,
			});

			const cart = await currentCart.save();
			//Update the product quantity
			//Build Inventory Object
			const inventoryFields = {};
			inventoryFields.quantity = productToAdd.quantity - 1;

			productToAdd = await Inventory.findByIdAndUpdate(
				product,
				{ $set: inventoryFields },
				{ new: true }
			);
			res.status(200).json({ msg: cart });
		} catch (err) {
			this.logger.log(err.message);
			return reject(new Errors.BadRequestError(err.message));
		}
	};
}

module.exports = CartService;
