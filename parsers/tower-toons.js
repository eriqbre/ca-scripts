/**
 * Created by Bridget on 5/2/2015.
 */

var _ = require('lodash'),
    cheerio = require('cheerio');

module.exports = function($container){
    var toons = [];

    _.each($container, function (container, i) {
        var $container = $(container),
            form = {
                inputs: []
            }, data = [];

        _.each($container.find('input[type="hidden"]'), function (input) {
            var $input = $(input),
                input = {
                    name: $input.attr('name'),
                    value: $input.val()
                };

            form.inputs.push(input);
        });

        forms.push(form);
    });

    return toons;
}