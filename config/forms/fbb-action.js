/**
 * Created by ebreland on 4/27/2015.
 */

var guild = require('../guild');

module.exports = function(options){
	var form = {
		action: 'guild_attack',
		ajax: '1',
		attack_key: '', // attack position according to attack keys. always 1 when normal attack
		attack_type: '',    // normal/special
		attacker_guild: guild.id,
		//attacking_position: '',
		battle_type: '2000',
		bqh: '',
		defender_guild_id: options.defender_guild_id,
		is_attacker: '1',
		sel_pos: '',    // indicates tower that should be returned in response
		target_id: ''   // id of the toon you're performing an action upon
	};

	return form;
};