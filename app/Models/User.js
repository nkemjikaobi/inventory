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
		password: {
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
UserSchema.virtual('pass')
	.set(function (pass) {
		this._password = pass;
		this.salt = this.makeSalt();
		this.password = this.encryptPassword(pass);
	})
	.get(function () {
		return this._password;
	});

// methods
UserSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.password; // true false
	},

	encryptPassword: function (password) {
		if (!pass) return '';
		try {
			return crypto.createHmac('sha1', this.salt).update(pass).digest('hex');
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
