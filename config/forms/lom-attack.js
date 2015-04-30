/**
 * Created by ebreland on 4/19/15.
 */

var _ = require('lodash');

module.exports = function (data) {
    var result = {
		    'attack_type': 'normal',
            'is_attacker': '1',
            'target_id': '1259347008'
        },
        ignore = [
            'attacking_position',
            'is_attacker',
	        'attack_type',
            'target_id'
        ];

    _.each(data.inputs, function (input) {
        if (ignore.indexOf(input.name) === -1) {
            result[input.name] = input.value;
        }
    });

    return result;
};