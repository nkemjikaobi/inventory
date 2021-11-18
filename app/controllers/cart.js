const errors = require('../utils/errors');
const httpStatus = require('http-status');

class CartController {
	constructor(cartService, logger) {
		this.cartService = cartService;
		this.logger = logger;
	}

	addToCart = (req, res) => {
		return this.cartService
			.addToCart(req, res)
			.then(resp => {
				this.logger.log('Response addToCart: ', resp);
				return res.status(httpStatus.OK).send({ data: resp });
			})
			.catch(err => {
				this.logger.error(err);
				this.logger.error('error from Cart Controller: ', err);
				return res
					.status(httpStatus.BAD_REQUEST)
					.send(new errors.BadRequestError(err.message.toString()));
			});
	};
}

module.exports = CartController;
