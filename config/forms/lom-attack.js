/**
 * Created by ebreland on 4/19/15.
 */

module.exports = function (data) {
    var result = {};

    _.each(data.inputs, function (input) {
        result[input.name] = input.value;
    });

    return result;
};