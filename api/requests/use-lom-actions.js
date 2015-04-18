/**
 * Created by ebreland on 4/11/15.
 * handle using up LoM actions
 *
 * grab all the bots from the database
 * log into the bots, determine how many tokens each has available and store the cookie jars
 * find the lands in defense
 * prioritize the lands by time, actions, health
 * determine how many actions remain in each land under defense
 * while actions > 200, attack targets
 */

var login = require('../../requests/login'),
    Toon = require('../../models/toon');

module.exports = function (app) {

    // log into ca
    app.route('/api/requests/use-lom-actions')
        .get(function (request, response) {

        });

    function getBots(callback) {
        var data, error;
        callback(error, data);
    }

    function loginBots(options, callback) {
        var data, error;
        callback(error, data);
    }

    function getLandsInDefense(options, callback) {
        var data, error;
        callback(error, data);
    }

    function prioritizeLandsInDefense(options, callback) {
        var data, error;
        callback(error, data);
    }

    function attack(options, callback) {
        var data, error;
        callback(error, data);
    }
};