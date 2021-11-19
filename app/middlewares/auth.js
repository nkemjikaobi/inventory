const expressJwt = require('express-jwt');
const config = require('../config/config');
const User = require('../Models/User');
const httpStatus = require('http-status');

exports.requireSignin = expressJwt({
	secret: config.JWT_SECRET,
	algorithms: ['HS256'],
});

exports.adminMiddleware = (req, res, next) => {
	User.findById({ _id: req.user._id }).exec((err, user) => {
		if (err || !user) {
			return res.status(httpStatus.OK).send({ error: 'User Not Found' });
		}

		if (user.isAdmin !== true) {
			return res
				.status(httpStatus.OK)
				.send({ error: 'Admin Resource. Access Denied!' });
		}

		req.profile = user;
		next();
	});
};
