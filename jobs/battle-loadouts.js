/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var async = require('async'),
    battles = require('../config/battle-times'),
    cron = require('cron').CronJob,
    login = require('../requests/login'),
    toonService = require('../services/toons'),
    _ = require('underscore');

module.exports = function (app) {
    // grab all the toons that subscribe to battle-loadouts
    toonService.getToons(function(error, toons){
        if (error) return error;

        // for each battle time
        _.each(battles, function(battle){
            try {
                // schedule a job for each battle, to set loadouts for all the toons
                new cron(new Date(), function(){
                    console.log('executing battle-loadouts job');
                    // log in each toon that subscribes to battle-loadouts and set their battle loadout
                    async.map(toons, function (toon, callback) {
                        console.log('run loadout for toon');

                        login(toon, function(error, response){
                            callback(error, response.data);
                        });

                    }, function (error, data) {
                        console.log('battle-loadout mapping complete');
                    });
                }, function(){ // executed when job stops
                    console.log('battle-loadout job complete');
                }, true, 'America/New_York');
            }
            catch(exception){
                console.log('invalid cron pattern');
            }
        });
    });
};