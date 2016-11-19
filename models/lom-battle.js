/**
 * Created by ebreland on 4/12/15.
 * permission to access toons, attached to users. a user should only have access to toons specified in permissions
 */

var mongoose = require('mongoose'),
    LomBattleToon = require('./lom-battle-toon'),
    LomBattleSchema = new mongoose.Schema({
        id: String,
        toons: [{type: mongoose.Schema.Types.ObjectId, ref: 'LomBattleToon'}],
        totalHealth: Number,
        healthRemaining: Number,
        actionsRemaining: Number,
        healthPerAction: Number,
        timeRemaining: Date
    });

module.exports = mongoose.model('LomBattle', LomBattleSchema);