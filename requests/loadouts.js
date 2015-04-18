/**
 * Created by ebreland on 4/12/15.
 */

var request = require('../requests/base'),
    form = require('../config/forms/loadouts'),
    routes = require('../config/routes'),
    parseLoadouts = require('../parsers/loadouts'),
    cheerio = require('cheerio'),
    _ = require('underscore');

module.exports = function (options, callback) {
    var _this = this;

    _.extend(options, {
        url: routes.changeLoadout,
        form: form(options)
    });

    request(options, function (error, response) {
        if (error || !response.body) {
            callback(error, null);
        } else {
            _this.parse(response, function (error, data) {
                callback(error, data);
            });
        }
    });

    parse = function (response, callback) {
        var $ = cheerio.load(response.body),
            data = response.data;

        // parse  loadouts
        data.loadouts = [];
        _.each($('select[name="choose_loadout"] option'), function (option) {
            var $option = $(option);
            data.loadouts.push({
                name: $option.text(),
                id: $option.val(),
                selected: $option.attr('selected') === 'selected'
            });
        });

        callback(null, data);
    };
};