/**
 * Created by ebreland on 4/26/15.
 */

module.exports = function (options) {
    var form = {
        action: 'guild_attack',
        attack_type: options.action.action.type,
        attack_key: options.action.action.key,
        ajax: '1',
        battle_id: options.toon.data.tvt.id,
        bqh: options.toon.battle.bqh,
        target_id: options.action.target,
        view_allies: options.action.view === 'allies'
    };

	if (!data.is_attacker) {
		data.is_attacker = '';
	}

    return form;
};