/**
 * Created by ebreland on 4/12/15.
 * configs will carry the data necessary to execute the proper commands for a given toon.
 * the models are variable, depending on the command, so we will need a role and a toon
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ConfigSchema = new mongoose.Schema({
        toon: Schema.ObjectId,
        role: Schema.ObjectId,
        data: Schema.Types.Mixed
    });

module.exports = mongoose.model('Config', ConfigSchema);