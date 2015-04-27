/**
 * Created by ebreland on 4/18/15.
 * collect resources
 */

var parser = require('../parsers/10v10-battle'),
    request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/10v10-enter');

module.exports = function (options, callback) {
    options.url = routes.tvt;
    options.form = form(options);

    request(options, function (error, response) {
        parser(options, response, function (error, data) {
            callback(error, data);
        });
    });
};