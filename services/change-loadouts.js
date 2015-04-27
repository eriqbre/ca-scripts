/**
 * Created by ebreland on 4/23/15.
 */
var async = require('async'),
    Task = require('../models/task'),
    login = require('../requests/sequences/login-sequence'),
    changeLoadouts = require('../requests/loadouts'),
    setToon = require('../config/toon'),
    _ = require('underscore');

module.exports = function (options, callback) {
    async.waterfall([
        // execute login sequence for battle loadouts
        function (callback) {
            // skip this step if another process has passed in the toons, already logged in
            if (!options.toons) {
                login({id: options.id}, function (error, data) {
                    callback(null, _.extend(options, data));
                });
            } else {
                callback(null, options);
            }
        },
        // change loadouts for battle
        function (options, callback) {
            async.map(options.toons, function (toon, callback) {
                changeLoadouts(toon, options.id, function (error, data) {
                    if (data) {
                        toon.data.loadouts = data.loadouts;
                        console.log(options.id + ' loadout changed for ' + toon.name);
                    }

                    callback(null, toon);
                });
            }, function (error, data) {
                // all done with each toon
                callback(error, options);
            });
        }
    ], function (error, data) {
        // end here
        var result = [],
            task;
        _.each(data.toons, function (toon) {
            result.push(setToon(toon));
        });

        console.log(options.id + ' loadouts task has completed');
        task = new Task({name: 'loadouts', type: options.id, data: result});
        task.save(function (error, response) {
            if (error) console.log(error);
        });

        if (callback) {
            callback(result);
        }
    });
};