/**
 * Created by ebreland on 4/18/15.
 * returns land of mist tower data
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/enable-item-archive');

module.exports = function (options, callback) {
    options.url = routes.index;
    options.form = form;

    request(options, function (error, response) {
        callback(null, null);
    });
};