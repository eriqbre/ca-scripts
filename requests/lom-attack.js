/**
 * Created by ebreland on 4/18/15.
 * returns land of mist tower data
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    form = require('../config/forms/lom-attack'),
    parser = require('../parsers/parser');

module.exports = function (options, callback) {
    options.url = routes.landOfMistTower(options.id);
    options.form = form(options.form);

    request(options, function (error, response) {
        parser(response, function (error, data) {
            callback(null, data);
        });
    });
};