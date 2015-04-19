/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
    times = require('../config/pre-battle-times'),
    cronJob = require('cron').CronJob,
    loadouts = require('../workers/loadouts'),
    port = process.env.PORT || 3020,
    throng = require('throng'),
    job = {
        name: 'pre-battle loadouts',
        onTick: throng(start('pre-battle', function () {
            process.exit();
        }), {workers: 1}),
        start: true,
        timeZone: 'America/New_York'
    }, jobs = {};

exports.schedule = function () {
    app.listen(port);

    process.on('SIGTERM', function () {
        console.log('shutting down');
        process.exit();
    });

    times.map(function (time) {
        job.cronTime = time.time;
        job.id = time.type;
        jobs[job.id] = new cronJob(job);
        console.log(common.util.format('%s cronjob scheduled at %s on timezone %s', job.name, job.cronTime, job.timeZone));
    });
};

