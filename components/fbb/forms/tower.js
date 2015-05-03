/**
 * Created by ebreland on 4/26/15.
 */
var _ = require('lodash');

module.exports = function (options) {
    return _.extend(options.tower, {
        attacker_guild_id: options.battle.attacker.id,
        ajax: '1',
        battle_type: options.battle.battle_type,
        defender_guild_id: options.battle.defender.id
    });
};