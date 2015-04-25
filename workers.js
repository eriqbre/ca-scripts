/**
 * Created by ebreland on 4/25/15.
 */

var app = require('../app'),
    cronJob = require('cron').CronJob,
    cronfigs = require('../config/cron'),
    changeLoadouts = require('../services/change-loadouts'),
    maintenance = require('../services/maintenance');

app.listen(3001, function () {
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
});