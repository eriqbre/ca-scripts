/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio'),
    battleData = require('../config/battle-data');

module.exports = function (options, response, callback) {
    var $ = cheerio.load(response),
        data = battleData;

    callback(null, data);
};