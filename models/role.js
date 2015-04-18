/**
 * Created by ebreland on 4/12/15.
 */

var mongoose = require('mongoose'),
    RoleSchema = new mongoose.Schema({
        name: String,
        description: String,
        identifier: String
    });

module.exports = mongoose.model('Role', RoleSchema);