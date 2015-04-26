/**
 * Created by ebreland on 4/25/15.
 */

var app = require('./app'),
    async = require('async'),
    attack = require('./services/lom-actions'),
//cluster = require('cluster'),
//cpus = require('os').cpus().length,
    cronJob = require('cron').CronJob,
    cronfigs = require('./config/cron'),
    changeLoadouts = require('./services/change-loadouts'),
    lom = require('./services/lom-check'),
    lomAttack = require('./services/lom-actions'),
    maintenance = require('./services/maintenance');

app.listen(cronfigs.port, function () {
    console.log('cron jobs');

    // cron for changing loadouts
    cronfigs.loadouts.times.map(function (cronfig) {
        new cronJob({
            cronTime: cronfig.time,
            onTick: function () {
                changeLoadouts(cronfig.type);
            },
            start: true,
            timeZone: cronfigs.timeZone
        });
    });

    // cron for basic maintenance tasks
    new cronJob({
        cronTime: cronfigs.maintenance.time,
        onTick: function () {
            maintenance(function (error, data) {
                console.log('completed maintenance run');
            });
        },
        start: true,
        timeZone: cronfigs.timeZone
    });

    // check land of mist for lands in defense
    new cronJob({
        cronTime: cronfigs.lomActions.time,
        onTick: function () {
            async.waterfall([
                // login and check for lands under defense
                function (callback) {
                    lom(function (error, data) {
                        callback(error, data)
                    });
                    /*
                    lomAttack({id: '1'}, function (data) {
                        response.json(data);
                     });*/
                },
                function (options, callback) {
                    attack(options, function (error, data) {
                        callback(null, data);
                    });
                }
            ], function (error, data) {
                console.log('lom-action check complete');
            });
        },
        start: true,
        timeZone: cronfigs.timeZone
    });
});