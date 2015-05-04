/**
 * Created by ebreland on 4/25/15.
 */

var app = require('./app'),
    attack = require('./services/lom-actions'),
	battleActions = require('./services/battle-actions'),
    cronJob = require('cron').CronJob,
    cronfigs = require('./config/cron'),
    changeLoadouts = require('./services/change-loadouts'),
    lom = require('./services/lom-check'),
    maintenance = require('./services/maintenance');

app.listen(cronfigs.port, function () {
    console.log('registering cron jobs');

    // cron for changing loadouts
    cronfigs.loadouts.times.map(function (cronfig) {
        new cronJob({
            cronTime: cronfig.time,
            onTick: function () {
                changeLoadouts({id: cronfig.type}, function (data) {
                    console.log(cronfig.type + ' loadouts worker finished')
                });
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
            lom(function (error, data) {
                console.log('completed lom-check');
            });
        },
        start: true,
        timeZone: cronfigs.timeZone
    });

	// check for 10v10 battle-actions
	new cronJob({
		cronTime: cronfigs.tvtActions.time,
		onTick: function () {
			battleActions({role: '10v10-actions'}, function (error, data) {
				console.log('completed battle-actions for 10v10');
			});
		},
		start: true,
		timeZone: cronfigs.timeZone
	});

	cronfigs.hvhActions.times.map(function (cronfig) {
		new cronJob({
			cronTime: cronfig.time,
			onTick: function () {
				battleActions({role: '100v100-actions'}, function (error, data) {
					console.log('completed battle-actions for 100v100');
				});
			},
			start: true,
			timeZone: cronfigs.timeZone
		});
	});
});