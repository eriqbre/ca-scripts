/**
 * Created by ebreland on 4/19/15.
 */

var _ = require('underscore');

module.exports = function (data) {
    var result = {};

    _.each(data.inputs, function (input) {
        result[input.name] = input.value;
    });

    return result;
};