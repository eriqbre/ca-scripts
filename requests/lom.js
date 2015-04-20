/**
 * Created by ebreland on 4/18/15.
 * returns land of mist home data
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    cheerio = require('cheerio');

module.exports = function (data, callback) {
    var _this = this,
        options = {
            url: routes.landOfMist
        };

    request(options, function (error, response) {
        callback(error, _this.parse(response));
    });

    parse = function (response) {
        var $ = cheerio.load(response.body),
            data = response.data;

        // parse lands
        data.lands = [];

        return data;
    }
};