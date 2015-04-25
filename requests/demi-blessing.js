/**
 * Created by ebreland on 4/18/15.
 * returns land of mist tower data
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/demi-blessing');

module.exports = function (options, callback) {
    var _this = this;
    options = form(options);

    request(options, function (error, response) {
        _this.parse(options, function (data) {
            callback(null, data);
        });
    });

    parse = function (options, callback) {
        var symbols = ['energy', 'attack', 'defense', 'health', 'stamina'],
            result = {
                tribute: symbols[parseInt(options.form.symbol)]
            };

        callback(result);
    };
};