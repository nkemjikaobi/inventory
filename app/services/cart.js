/** @format */

const Cart = require('../Models/Cart');
const Inventory = require('../Models/Inventory');
const Errors = require('../utils/errors');

class CartService {
	constructor(logger) {
		this.logger = logger;
	}

	addToCart = async (payload, res) => {
		const { product } = payload.body;
		const { _id } = payload.user;

		return new Promise((resolve, reject) => {
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
