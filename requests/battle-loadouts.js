/**
 * Created by ebreland on 4/12/15.
 */

var request = require('../requests/base'),
    login = require('./requests/login'),
    async = require('async'),
    form = require('../config/forms/loadouts'),
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
        callback(response.data);
    });
};