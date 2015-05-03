/**
 * Created by ebreland on 4/26/15.
 */

var _ = require('lodash');

module.exports = function (options) {
    // if options.action.target then search the towers for that target and use their form
    // todo: come up with something cool for deciding whom to attack
    var data = {};
    _.each(options.form.inputs, function (input) {
        if (input && input.name && input.value) {
            data[input.name] = input.value;
        }
    });

    return data;
};