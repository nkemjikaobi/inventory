const express = require('express');
const router = express.Router();
const di = require('../config/di');
const userController = di.get('userController');

router.post('/user/register', userController.createUser,);
router.post('/user/login', userController.loginUser,);

module.exports = router;
