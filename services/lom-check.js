/**
 * Created by ebreland on 4/23/15.
 */

var async = require('async'),
    lom = require('../requests/sequences/lom-check');

module.exports = function (callback) {
    async.waterfall([
        // login and check for lands under defense
        function (callback) {
            lom({}, function (error, data) {
                callback(error, data);
            });
        }
    ], function (error, data) {
        console.log('lom-action check complete');
        callback(error, data);
    });
};