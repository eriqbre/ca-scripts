/**
 * Created by ebreland on 4/25/15.
 */

var guild = require('./guild');

module.exports = function (options) {
    return {
        action: 'collect_battle',
        attacker_guild_id: options.attacker,
        defender_guild_id: guild.id,
        battle_type: '2000',
        is_attacker: '',
        ajax: '1'
    }
};