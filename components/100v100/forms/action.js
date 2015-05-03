/**
 * Created by ebreland on 4/26/15.
 */

var guild = require('../../../config/guild');

module.exports = function (options) {
    // if options.action.target then search the towers for that target and use their form
    // todo: come up with something cool for deciding whom to attack
    var form = {
        attack_type: options.action.type,
        attack_key: options.action.key,
        attacker_guild_id: toon.data.attacker.guild,
        ajax: '1',
        battle_id: options.toon.data.hvh.id,
        battle_type: 'hundred',
        bqh: options.toon.data.bqh,
        defender_guild_id: guild.id,
        enemy_guild_id: toon.data.attacker.guild,
        is_attacker: 1,
        sel_pos: options.action.position,
        target_id: options.action.target,
        view_allies: options.action.view === 'allies'
    };

    return form;
};