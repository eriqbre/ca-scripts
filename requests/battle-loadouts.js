/**
 * Created by ebreland on 4/12/15.
 */

var request = require('../requests/base'),
    async = require('async'),
    form = require('../config/forms/loadouts'),
    routes = require('../config/routes'),
    cheerio = require('cheerio');

module.exports = function (data, callback) {
    var options = {
        url: routes.changeLoadout,
        form: form(data)
    };

    request(options, function (error, response) {
        console.log('template is ' + response.template);
        callback(error, response.data);
    });
};