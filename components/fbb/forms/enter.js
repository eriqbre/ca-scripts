/**
 * Created by ebreland on 4/27/2015.
 */

var guild = require('../../../config/guild');

module.exports = function(options){
	var form = {
		//action: 'enter_battle',
		ajax: '1',
		attacker_guild: options.toon.battle.attacker_guild_id,
		battle_type: options.toon.battle.battle_type,
		defender_guild_id: options.toon.battle.defender_guild_id
	};

	return form;
};