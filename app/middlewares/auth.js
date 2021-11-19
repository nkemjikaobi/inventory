const expressJwt = require('express-jwt');
const config = require('../config/config');
const User = require('../Models/User');
const Errors = require('../utils/errors');

exports.requireSignin = expressJwt({
	secret: config.JWT_SECRET,
	algorithms: ['HS256'],
});

exports.adminMiddleware = (req, res, next) => {
	User.findById({ _id: req.user._id }).exec((err, user) => {
		if (err || !user) {
			return new Errors.NotFoundError('User Not Found');
		}

		if (user.isAdmin !== true) {
			return new Errors.UnauthorizedError('Admin Resource. Access Denied!');
		}

		req.profile = user;
		next();
	});
};
