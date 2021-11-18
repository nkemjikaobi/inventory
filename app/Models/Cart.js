const mongoose = require('mongoose');
// Cart Schema
const CartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'inventories',
		},
	},
	{ timestamps: true }
);

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;
