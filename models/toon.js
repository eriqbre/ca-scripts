/**
 * Created by ebreland on 4/11/15.
 * toons subscribe to roles in which they will participate
 * for example; General Alliance gives permission for this toon to change their general alliances
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	cipher = require('../config/cipher'),
    ToonSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        caId: String,
        roles: [Schema.ObjectId]
    });

// helper methods
ToonSchema.pre('save', function(next) {
	this.password = cipher.encrypt(this.password);
	next();
});

// validate email is valid
ToonSchema.path('email').validate(function (email) {
	var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailRegex.test(email);
}, 'The specified email is invalid.');

// validate email is unique
ToonSchema.path('email').validate(function(value, callback) {
	mongoose.models["Toon"].findOne({email: value}, function(err, user) {
		if(err) throw err;
		if(user) return callback(false);
		callback(true);
	});
}, 'The specified email address is already in use.');

module.exports = mongoose.model('Toon', ToonSchema);