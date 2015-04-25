/**
 * Created by ebreland on 4/25/15.
 * run this job continuously throughout the day
 */

var app = require('../app'),
    cronJob = require('cron').CronJob,
    cronfigs = require('../config/cron'),
    maintenance = require('../services/maintenance');

app.listen(3025, function () {
    console.log('starting maintenance run');

    new cronJob({
        cronTime: cronfigs.maintenance.time,
        onTick: function () {
            maintenance(function (error, data) {
                console.log('completed maintenance run');
                console.log(data);
            });
        },
        start: true,
        timeZone: cronfigs.timeZone
    });
});