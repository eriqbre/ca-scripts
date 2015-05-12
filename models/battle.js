/**
 * Created by ebreland on 4/12/15.
 * permission to access toons, attached to users. a user should only have access to toons specified in permissions
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BattleSchema = new mongoose.Schema({

    });

module.exports = mongoose.model('Battle', BattleSchema);