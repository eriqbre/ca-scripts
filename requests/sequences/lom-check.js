/**
 * Created by ebreland on 4/18/15.
 * returns land of mist tower data
 */

var async = require('async'),
    login = require('./login-sequence'),
    lom = require('../lom');

module.exports = function (options, callback) {
    async.waterfall([
        function (callback) {
            login({id: 'lom-check'}, function (error, data) {
                callback(error, data);
            });
        },
        function (options, callback) {
            async.map(options.toons, function (toon) {
                lom({jar: toon.jar}, function (error, data) {
                    callback(error, data);
                });
            });
        }
    ], function (error, data) {
        callback(error, data);
    });
};