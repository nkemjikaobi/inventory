const mongoose = require('mongoose');
// Cart Schema
const CartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'inventory',
		},
	},
	{ timestamps: true }
);

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;
