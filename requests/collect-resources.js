/**
 * Created by ebreland on 4/18/15.
 * collect resources
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/collect-resources');

module.exports = function (options, callback) {
    options.url = routes.index;
    options.form = form;

    request(options, function (error, response) {
        callback(null, {});
    });
};