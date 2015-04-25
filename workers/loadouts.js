/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
	cronJob = require('cron').CronJob,
	cronfigs = require('../config/cron'),
	changeLoadouts = require('../services/change-loadouts');

app.listen(cronfigs.loadouts.port, function () {
	console.log('running loadouts cronjob');

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
});

