const expressJwt = require('express-jwt');
const config = require('../config/config');
const User = require('../models/User');

exports.requireSignin = expressJwt({
	secret: config.JWT_SECRET,
	algorithms: ['HS256'],
});

exports.adminMiddleware = (req, res, next) => {
	User.findById({ _id: req.user._id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'User not found',
			});
		}

		if (user.isAdmin !== true) {
			return res.status(400).json({
				error: 'Admin resource. Access denied.',
			});
		}

		req.profile = user;
		next();
	});
};
