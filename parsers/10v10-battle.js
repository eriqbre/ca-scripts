/**
 * Created by ebreland on 4/26/15.
 */

var cheerio = require('cheerio');

module.exports = function (options, response, callback) {
    var $ = cheerio.load(response),
        data = {
            action: options.action,
            success: true, // did the action trigger successfully? if not, recursively trigger the action till it does, fucking CA devs
            result: false, // did they win or lose?
            remaining: {
                attackers: 0,
                defenders: 0
            },
            damage: {
                attacker: 0,
                defender: 0
            },
            health: {
                attacker: 0,
                defender: 0
            },
            tokens: 10,
            tower: {
                toons: []
            }
        };

    callback(null, data);
};