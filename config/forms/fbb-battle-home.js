/**
 * Created by Bridget on 4/27/2015.
 */
var guild = require('guild');

module.exports = function(options){
    return {
        ajax: '1',
        attacker_guild_id: guild.id,
        battle_type: '2000',
        defender_guild_id: options.defender_guild_id
    };
};