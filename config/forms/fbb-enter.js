/**
 * Created by ebreland on 4/27/2015.
 */

var guild = require('../guild');

module.exports = function(options){
	var form = {
		attacker_guild: guild.id,
		battle_type: '2000',
		ajax: '1'
	};

	if (options.defender_guild_id){
		form.defender_guild_id = options.defender_guild_id;
		form.action = 'enter_battle';
	}

	return form;
};