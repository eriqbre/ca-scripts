/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
    async = require('async'),
    changeLoadout = require('../requests/loadouts'),
    login = require('../requests/sequences/login-sequence'),
    port = process.env.PORT || 3020,
    setToon = require('../config/toon'),
    throng = require('throng'),
    Task = require('../models/task'),
    _ = require('underscore');

start = function (id) {
    var _this = this;

    app.listen(port);

    process.on('SIGTERM', function () {
        console.log('shutting down');
        process.exit();
    });

    async.waterfall([
        // execute login sequence for battle loadouts
        function (callback) {
            login({id: id}, function (error, data) {
                callback(null, data);
            });
        },
        // change loadouts for battle
        function (options, callback) {
            async.map(options.toons, function (toon, callback) {
                changeLoadout(toon, function (error, data) {
                    if (error) callback(error, null);
                    toon.data.loadouts = data.loadouts;

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

        task = new Task({name: 'loadouts', type: id, data: result});
        task.save(function (error, response) {
            if (error) console.log(error);

            console.log('loadouts task has completed');
            process.exit();
        });
    });
};

throng(start('pre-battle'), {workers: 1});
