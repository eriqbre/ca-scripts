/**
 * Created by ebreland on 4/11/15.
 * data must contain email, password
 */

var request = require('../requests/base'),
    form = require('../config/forms/login'),
    routes = require('../config/routes'),
    parse = require('../parsers/home');

module.exports = function (data, callback) {
    var _this = this,
        options = {
            url: routes.login,
            form: form(data)
        };

    request(options, function (error, response) {
        if (error || !response.body) {
            callback(error, null);
        } else {
            parse(response, function (error, data) {
                callback(error, data);
            });
        }
    });
};