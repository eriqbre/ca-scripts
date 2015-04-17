/**
 * Created by ebreland on 4/12/15.
 */

var request = require('../requests/base'),
    async = require('async'),
    form = require('../config/forms/loadouts'),
    routes = require('../config/routes'),
    cheerio = require('cheerio'),
    _ = require('lodash');

module.exports = function (options, callback) {
    _.extend(options, {
        url: routes.changeLoadout,
        form: form(options)
    });

    request(options, function (error, response) {
        console.log('template is ' + response.template);
        callback(error, response.data);
    });
};