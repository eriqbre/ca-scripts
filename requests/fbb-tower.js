/**
 * Created by ebreland on 4/18/15.
 * request to view a specific tower in 100v100 battles
 */

var parser = require('../parsers/fbb-battle'),
    request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/fbb-tower');

module.exports = function (options, callback) {
    options.url = routes.index;
    options.form = form(options);

    request(options, function (error, response) {
        parser(options, response, function (error, data) {
            callback(error, data);
        });
    });
};