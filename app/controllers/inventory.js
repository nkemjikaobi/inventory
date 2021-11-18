const errors = require('../utils/errors');
const httpStatus = require('http-status');

class InventoryController {
	constructor(inventoryService, logger) {
		this.inventoryService = inventoryService;
		this.logger = logger;
	}

	createInventory = (req, res) => {
		return this.inventoryService
			.createInventory(req.body)
			.then(resp => {
				this.logger.log('Response createInventory: ', resp);
				return res.status(httpStatus.OK).send({ data: resp });
			})
			.catch(err => {
				this.logger.error(err);
				this.logger.error('error from Inventory Controller: ', err);
				return res
					.status(httpStatus.BAD_REQUEST)
					.send(new errors.BadRequestError(err.message.toString()));
			});
	};
}

module.exports = InventoryController;
