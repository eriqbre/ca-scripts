/**
 * Created by ebreland on 4/25/15.
 */
module.exports = function (options) {
    return {
        action: 'collect_battle',
	    battle_id: options.battle.id,
        ajax: '1'
    };

	// if an fp-threshold has been set and that threshold is less than the current battle points, do a favor point collection
	if (options.toon.configs[options.role] && options.toon.configs[options.role]['fp-threshold'] && options.battle.points > parseInt(options.toon.configs[options.role]['fp-threshold'])) {
		form.bonus_collect = '1';
	}
};