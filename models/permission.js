/**
 * Created by ebreland on 4/12/15.
 * permission to access toons, attached to users. a user should only have access to toons specified in permissions
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PermissionSchema = new mongoose.Schema({
        toon: Schema.ObjectId
    });

module.exports = mongoose.model('Permission', PermissionSchema);