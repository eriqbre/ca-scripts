/**
 * Created by ebreland on 4/12/15.
 *
 */

var mongoose = require('mongoose'),
    LomBattleToonSchema = new mongoose.Schema({
        name: String,
        health: Number,
        totalHealth: Number,
        class: String,
        level: Number,
        caId: String
    });

module.exports = mongoose.model('LomBattleToon', LomBattleToonSchema);