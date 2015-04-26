/**
 * Created by ebreland on 4/25/15.
 */

var app = require('./app'),
    cluster = require('cluster'),
    cpus = require('os').cpus().length,
    cronJob = require('cron').CronJob,
    cronfigs = require('./config/cron'),
    changeLoadouts = require('./services/change-loadouts'),
    maintenance = require('./services/maintenance');

if (cluster.isMaster){
    for (var i = 0; i< cpus; i++){
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        cluster.fork();
    });
} else {
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
    });
}