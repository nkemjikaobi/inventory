const express = require('express');
const router = express.Router();
const di = require('../config/di');
const { requireSignin, adminMiddleware } = require('../middlewares/auth');
const cartController = di.get('cartController');

router.post(
	'/cart/add',
	requireSignin,
	adminMiddleware,
	cartController.addToCart
);

module.exports = router;
