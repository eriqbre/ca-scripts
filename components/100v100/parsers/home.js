/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio');

module.exports = function (options, response, callback) {
    var $ = cheerio.load(response.body);
    data = {
        id: $('input[name="battle_id"]').val()
    };

    callback(null, data);
};