/**
 * Created by ebreland on 4/18/15.
 * helper for parsing loadouts from page
 */

var _ = require('underscore'),
    $ = require('cheerio');

module.exports = function ($) {
    var loadouts = [];

    try {
        _.each($('select[name="choose_loadout"] option'), function (option) {
            var $option = $(option);
            loadouts.push({
                name: $option.text(),
                id: $option.val(),
                selected: $option.attr('selected') === 'selected'
            });
        });
    } catch (exception) {
        console.log(exception);
    }

    return loadouts;
};