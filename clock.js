/**
 * Created by ebreland on 4/19/15.
 */

var app = require('./app'),
	util = require('util'),
	cronJob = require('cron').CronJob,
	loadouts = require('./workers/loadouts'),
	port = process.env.PORT || 3020,
	throng = require('throng'),
	preBattleTimes = require('./config/pre-battle-times'),
	preBattleJob = {
		name: 'pre-battle loadouts',
		onTick: throng(start('pre-battle', function () {
			process.exit();
		}), {workers: 1}),
		start: true,
		timeZone: 'America/New_York'
	}, preBattleJobs = {},
	battleDefenseTimes = require('./config/battle-defense-times'),
	battleDefenseJob = {
		name: 'battle-defense loadouts',
		onTick: throng(start('battle-defense', function () {
			process.exit();
		}), {workers: 1}),
		start: true,
		timeZone: 'America/New_York'
	}, battleDefenseJobs = {};

	app.listen(port);

process.on('SIGTERM', function () {
	console.log('shutting down');
	process.exit();
});

preBattleTimes.map(function (time) {
	preBattleJob.cronTime = time.time;
	preBattleJob.id = time.type;
	preBattleJobs[preBattleJob.id] = new cronJob(preBattleJob);
	console.log(util.format('%s cronjob scheduled at %s on timezone %s',
		preBattleJob.name,
		preBattleJob.cronTime,
		preBattleJob.timeZone));
});

battleDefenseTimes.map(function (time) {
	battleDefenseJob.cronTime = time.time;
	battleDefenseJob.id = time.type;
	battleDefenseJobs[battleDefenseJob.id] = new cronJob(battleDefenseJob);
	console.log(util.format('%s cronjob scheduled at %s on timezone %s',
		battleDefenseJob.name,
		battleDefenseJob.cronTime,
		battleDefenseJob.timeZone));
});

