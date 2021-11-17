const express = require('express');
const router = express.Router();
const di = require('../config/di');
const statusController = di.get('statusController');

router.get('/', statusController.getStatus);

module.exports = router;
