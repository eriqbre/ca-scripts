/**
 * Created by ebreland on 4/18/15.
 * returns land of mist home data
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    cheerio = require('cheerio'),
    _ = require('lodash');

module.exports = function (options, callback) {
    var _this = this;
    options.url = routes.landOfMist;

    request(options, function (error, response) {
        callback(error, _this.parse(response));
    });

    parse = function (response) {
        var $ = cheerio.load(response.body),
            data = response.data,
            landsInDefense = $('img[src*="conq2_btn_defend"]'),
            timers = $('span:contains("BATTLE")');

        // parse lands
        data.towersInDefense = [];

        // parse lands in defense
        _.each(landsInDefense, function (land, i) {
            var $land = $(land),
                $timers = $(timers),
                url = $land.parent('a').attr('href'),
                slots = url.split('slot=');

            if (slots.length === 2 && timers && timers[i]) {
                data.towersInDefense.push({
                    slot: slots[1],
                    hoursRemaining: parseInt($(timers[i]).siblings('span').first().text().split(' ')[0])
                });
            }
        });

        // sort
        data.towersInDefense = _.sortBy(data.towersInDefense, function (tower) {
            return -tower.hoursRemaining;
        });

        return data;
    }
};