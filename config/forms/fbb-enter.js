/**
 * Created by ebreland on 4/27/2015.
 */

var guild = require('../guild');

module.exports = function(options){
	var form = {
		action: 'enter_battle',
		ajax: '1',
		attacker_guild: guild.id,
		battle_type: '2000',
		defender_guild_id: options.defender_guild_id
	};

	return form;
};