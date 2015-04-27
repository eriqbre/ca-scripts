/**
 * Created by ebreland on 4/26/15.
 */

module.exports = function (options) {
    return {
        action: 'enter_battle',
        ajax: '1',
        battle_id: options.id
    }
};