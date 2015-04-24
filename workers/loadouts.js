/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
	_ = require('underscore'),
	cronJob = require('cron').CronJob,
	cronfigs = require('../config/cron'),
	changeLoadouts = require('../services/change-loadouts');

app.listen(3023, function () {
    console.log('running');

	cronfigs.loadouts.map(function (cronfig) {
		new cronJob({
			cronTime: cronfig.time,
			onTick: function () {
				changeLoadouts(cronfig.type, app);
			},
			start: true,
			timeZone: 'America/New_York'
		});
	});

	// heartbeat for the dynos, let's try it without first :)
	/*
	 ["40 * * * *", "10 * * * *"].map(function (keepAlive) {
	 new cronJob({
	 cronTime: keepAlive,
	 onTick: function () {
	 console.log('keep alive');
	 },
	 start: true,
	 timeZone: 'America/New_York'
	 });
	 });*/
});

