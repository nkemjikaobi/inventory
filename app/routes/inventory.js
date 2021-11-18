const express = require('express');
const router = express.Router();
const di = require('../config/di');
const inventoryController = di.get('inventoryController');

router.post('/inventory/create', inventoryController.createInventory);

module.exports = router;
