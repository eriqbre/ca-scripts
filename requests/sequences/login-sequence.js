/**
 * Created by ebreland on 4/18/15.
 * grabs all the toons for a given role and logs them in
 * return object will contain toons that are logged in and ready to go
 */

var async = require('async'),
    configService = require('../../services/configs'),
    roleService = require('../../services/roles'),
    toonService = require('../../services/toons'),
    login = require('../../requests/login'),
    _ = require('underscore');

module.exports = function (options, callback) {
    async.waterfall([
        // get the toons
        function (callback) {
            toonService.getToons({roles: options.id}, function (error, data) {
                if (error) callback(error, null);

                callback(error, {role: options.role, toons: data});
            });
        },
        // login each toon
        function (options, callback) {
            async.map(options.toons, function (toon, callback) {
                login({email: toon.email, password: toon.password}, function (error, data) {
                    if (error) callback(error, null);

                    toon.data = data;
                    toon.jar = data.jar;
                    callback(null, {toon: toon, jar: data.jar});
                });
            }, function (error, data) {
                // all done with each toon
                callback(error, options);
            });
        },
    ], function (error, data) {
        callback(error, data);
    });
};