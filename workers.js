/**
 * Created by ebreland on 4/25/15.
 */

var app = require('./app'),
    attack = require('./services/lom-actions'),
	battleActions = require('./services/battle-actions'),
	battleCollection = require('./services/battle-collect'),
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
                    console.log(cronfig.type + ' loadouts worker finished');
                    process.on('exit', exitHandler.bind(null, { exit: true }));
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
                process.on('exit', exitHandler.bind(null, { exit: true }));
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
                process.on('exit', exitHandler.bind(null, { exit: true }));
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
                process.on('exit', exitHandler.bind(null, { exit: true }));
			});
		},
		start: true,
		timeZone: cronfigs.timeZone
	});

	// check for 10v10 battle-collection
	new cronJob({
		cronTime: cronfigs.tvtCollect.time,
		onTick: function () {
			battleCollection({role: 'auto-collect-10v10'}, function (error, data) {
				console.log('completed battle-collection for 10v10');
                process.on('exit', exitHandler.bind(null, { exit: true }));
			});
		},
		start: true,
		timeZone: cronfigs.timeZone
	});

	// check for 100v100 battle-actions
	cronfigs.hvhActions.times.map(function (cronfig) {
		new cronJob({
			cronTime: cronfig.time,
			onTick: function () {
				battleActions({role: '100v100-actions'}, function (error, data) {
					console.log('completed battle-actions for 100v100');
                    process.on('exit', exitHandler.bind(null, { exit: true }));
				});
			},
			start: true,
			timeZone: cronfigs.timeZone
		});
	});

	// auto-collect for 100v100 battle
	cronfigs.hvhCollect.times.map(function (cronfig) {
		new cronJob({
			cronTime: cronfig.time,
			onTick: function () {
				battleCollection({role: 'auto-collect-100v100'}, function (error, data) {
					console.log('completed battle-collection for 100v100');
                    process.on('exit', exitHandler.bind(null, { exit: true }));
				});
			},
			start: true,
			timeZone: cronfigs.timeZone
		});
	});

    // handle process exits
    function exitHandler(options, error){
        process.exit();
    }
});