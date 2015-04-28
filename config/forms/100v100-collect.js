/**
 * Created by Bridget on 4/27/2015.
 */

var guild = require('../guild');

modules.exports = function(options){
    return {
        action: 'collect_battle',
        ajax: '1',
        attacker_guild_id: guild.id,
        defender_guild_id: options.defender_guild_id,
        battle_type: 'hundred',
        is_attacker: '',
        battle_id: options.battleId
    }
};