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
            // schedule a job for each battle, to set loadouts for all the toons
            new cron(new Date(), function(){
                console.log('executing battle-loadouts job');
                // log in each toon that subscribes to battle-loadouts and set their battle loadout
                async.map(toons, function (toon, callback) {
                    console.log('run loadout for toon');

                    // waterfall through the login process and set loadouts
                    async.waterfall([
                        // login
                        function(callback){
                            login(toon, function(error, response){
                                callback(error, response.data);
                            })
                        },
                        // set battle loadouts
                        function(data, callback){
                            callback(null, data);
                        }
                    ],
                        // terminates waterfall
                        function(error, callback){
                            // callback to end async.map
                            callback(error, callback);
                    });

                }, function (error, data) {
                    // finished with async.map
                    console.log('battle-loadout mapping complete');
                    callback(error, data);
                });
            }, function(){ // executed when job stops
                console.log('battle-loadout job complete');
            }, true, 'America/New_York');
        });
    });

    // nothing to return as this is a scheduled job
    console.log('battle-loadouts scheduled')
};