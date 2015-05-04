/**
 * Created by ebreland on 4/25/15.
 */

module.exports = function (options) {
	return {
		action: 'collect_battle',
		ajax: '1',
		attacker_guild_id: options.battle.attacker.id,
		battle_id: options.id,
		battle_type: 'hundred',
		defender_guild_id: options.battle.defender.id,
		is_attacker: ''
	}
};