const express = require('express');
const router = express.Router();
const di = require('../config/di');
const { requireSignin, adminMiddleware } = require('../middlewares/auth');
const inventoryController = di.get('inventoryController');

router.post('/inventory/create', requireSignin, adminMiddleware, inventoryController.createInventory);

module.exports = router;
