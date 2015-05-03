/**
 * Created by ebreland on 4/26/15.
 */
var _ = require('lodash');

module.exports = function (options) {
    return _.extend(options.tower, {
        ajax: '1',
        battle_id: options.battle.id
    });
};