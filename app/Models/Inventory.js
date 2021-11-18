const mongoose = require('mongoose');
// Inventory Schema
const InventorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;
