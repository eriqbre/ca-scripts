/**
 * Created by ebreland on 4/18/15.
 * collect resources
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/10v10-collect');

module.exports = function (options, callback) {
    options.url = routes.hvhBattle;
    options.form = form(options);

    request(options, function (error, response) {
        parser(options, response, function (error, data) {
            callback(error, data);
        });
    });
};