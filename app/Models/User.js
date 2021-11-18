const crypto = require('crypto');
const mongoose = require('mongoose');
// User Schema
const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			min: 3,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		hashed_password: {
			type: String,
			required: true,
			min: 6,
		},
		salt: {
			type: String,
		},
	},
	{ timestamps: true }
);

// virtual
UserSchema.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

// methods
UserSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password; // true false
	},

	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			return '';
		}
	},

	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + '';
	},
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
