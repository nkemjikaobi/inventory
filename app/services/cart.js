/** @format */

const Cart = require('../models/Cart');
const Inventory = require('../models/Inventory');

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
				return res.status(200).json({ msg: 'Item is out of stock' });
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
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	};
}

module.exports = CartService;
