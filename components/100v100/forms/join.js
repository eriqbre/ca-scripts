/**
 * Created by ebreland on 5/2/15.
 */

module.exports = function (options) {
    return {
        action: 'enter_battle',
        ajax: '1',
        attacker_guild_id: options.battle.attacker.id,
        battle_id: options.battle.id,
        battle_type: 'hundred',
        defender_guild_id: options.battle.defender.id,
        is_attacker: ''
    }
};