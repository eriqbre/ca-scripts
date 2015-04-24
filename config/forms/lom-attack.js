/**
 * Created by ebreland on 4/19/15.
 */

var _ = require('underscore');

module.exports = function (data) {
    var result = {
		    'attack_type': 'normal',
            'is_attacker': '1'
        },
        ignore = [
            'attacking_position',
            'is_attacker',
	        'attack_type'
        ];

    _.each(data.inputs, function (input) {
        if (ignore.indexOf(input.name) === -1) {
            result[input.name] = input.value;
        }
    });

    return result;
};