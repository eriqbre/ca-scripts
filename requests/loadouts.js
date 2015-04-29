/**
 * Created by ebreland on 4/12/15.
 */

var request = require('../requests/base'),
    form = require('../config/forms/loadouts'),
    routes = require('../config/routes'),
    parseLoadouts = require('../parsers/loadouts'),
    cheerio = require('cheerio'),
    _ = require('lodash');

module.exports = function (options, role, callback) {
    var _this = this;

    _.extend(options, {
        url: routes.changeLoadout,
        form: form(options,role)
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
        data.loadouts = parseLoadouts($);

        callback(null, data);
    };
};