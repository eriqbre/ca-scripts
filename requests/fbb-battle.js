/**
 * Created by ebreland on 4/18/15.
 * this brings up the main battle page, if they haven't yet "entered battle", they will need to do so
 */

var parser = require('../parsers/fbb-battle'),
    request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/fbb-battle');

module.exports = function (options, callback) {
    options.url = routes.battle;
    options.form = form(options);

    request(options, function (error, response) {
        parser(options, response, function (error, data) {
            callback(error, data);
        });
    });
};