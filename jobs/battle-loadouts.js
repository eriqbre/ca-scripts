/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var async = require('async'),
    battles = require('../config/battle-times'),
    schedule = require('node-schedule'),
    toonService = require('../services/toons'),
    _ = require('underscore');

module.exports = function (app) {
    // grab all the toons that subscribe to battle-loadouts
    toonService.getToons(function(error, toons){
        if (error) return error;
        var immediate = new Date().addMinute(1);
        battles.push(immediate);

        // for each battle time
        _.each(battles, function(battle){
            // schedule a job for each battle, to set loadouts for all the toons
            schedule.scheduleJob(battle.time, function(){
                // log in each toon that subscribes to battle-loadouts and set their battle loadout
                async.map(toons, function (battle) {

                }, function (error, data) {
                    var stop = true;
                });
            }, true);

        });
    });
};