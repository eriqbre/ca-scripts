/**
 * Created by ebreland on 4/11/15.
 */

var mongoose = require('mongoose'),
    ToonSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        caId: String
    });

module.exports = mongoose.model('Toon', ToonSchema);