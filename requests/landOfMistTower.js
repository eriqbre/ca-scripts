/**
 * Created by ebreland on 4/18/15.
 * returns land of mist tower data
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

        // parse all the toons in the tower
        data.toons = [];

        // parse the time and actions remaining
        data.actionsRemaining = 0;
        data.timeRemaining = new Date();

        return data;
    }
};