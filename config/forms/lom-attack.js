/**
 * Created by ebreland on 4/19/15.
 */

var _ = require('underscore');

module.exports = function (data) {
    var result = {
            'is_attacker': '1'
        },
        ignore = [
            'attacking_position',
            'is_attacker'
        ];

    _.each(data.inputs, function (input) {
        if (ignore.indexOf(input.name) === -1) {
            result[input.name] = input.value;
        }
    });

    return result;
};