const expressJwt = require('express-jwt');
const config = require('../config/config');

exports.requireSignin = expressJwt({
	secret: config.JWT_SECRET,
});
