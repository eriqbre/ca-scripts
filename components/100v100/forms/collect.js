/**
 * Created by ebreland on 4/25/15.
 */

module.exports = function (options) {
	var form = {
		action: 'collect_battle',
		ajax: '1',
		attacker_guild_id: options.battle.attacker.id,
		battle_id: options.battle.id,
		battle_type: 'hundred',
		defender_guild_id: options.battle.defender.id,
		is_attacker: ''
	};

	// if an fp-threshold has been set and that threshold is less than the current battle points, do a favor point collection
	if (options.toon.configs[options.role] && options.toon.configs[options.role]['fp-threshold'] && options.battle.points > parseInt(options.toon.configs[options.role]['fp-threshold'])) {
		form.bonus_collect = '1';
	}

	return form;
};