/**
 * Created by ebreland on 4/12/15.
 * a user has access to toons listed in permissions
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        isActive: {type: Boolean, default: true},
        permissions: [Schema.ObjectId]
    });

module.exports = mongoose.model('User', UserSchema);