/**
 @description Define errors available in project
 **/


var create = require('custom-error-generator');

module.exports = {
	InvalidVersion: create('InvalidVersion', { code: 'INVALID_VERSION' }),

	MethodNotImplemented: create('MethodNotImplemented', {
		code: 'METHOD_NOT_IMPLEMENTED',
	}),

	InternalServerError: create('InternalServerError', {
		code: 'INTERNAL_SERVER_ERROR',
	}),

	UnauthorizedError: create('UnauthorizedError', { code: 'UNAUTHORIZED' }),

	BadRequestError: create('BadRequestError', { code: 'BAD_REQUEST' }),

	NotFoundError: create('NotFoundError', { code: 'NOT_FOUND' }),

	ItemAlreadyExist: create('ItemAlreadyExist', { code: 'ITEM_ALREADY_EXIST' }),
};
