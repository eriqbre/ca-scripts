/**
 * Created by ebreland on 4/18/15.
 * returns land of mist tower data
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    parser = require('../parsers/lom-tower');

module.exports = function (options, callback) {
    options.url = routes.landOfMistTower(options.id);

    request(options, function (error, response) {
        parser(response, function (error, data) {
            callback(null, data);
        });
    });
};