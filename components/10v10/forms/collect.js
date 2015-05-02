/**
 * Created by ebreland on 4/25/15.
 */
module.exports = function (options) {
    return {
        action: 'collect_battle',
        battle_id: options.id,
        ajax: '1'
    }
};