/**
 * Created by ebreland on 4/27/2015.
 */

var guild = require('../guild');

module.exports = function(options){
	var form = {
		action: 'guild_attack',
		ajax: '1',
		attack_key: '',
		attack_type: '',
		attacker_guild: guild.id,
		attacking_position: '',
		battle_type: '2000',
		bqh: '',
		defender_guild_id: options.defender_guild_id,
		is_attacker: '',
		sel_pos: '',
		target_id: ''
	};

	return form;
};