/**
 * Created by ebreland on 4/11/15.
 * data must contain email, password
 */

var request = require('../requests/base'),
    form = require('../config/forms/login'),
    routes = require('../config/routes'),
    cheerio = require('cheerio');

module.exports = function (data, callback) {
    var options = {
        url: routes.login,
        form: form(data)
    };

    request(options, function (error, response) {
        console.log('good response from ' + routes.login);
        console.log('template is ' + response.template);
        callback(error, response);
    });
};