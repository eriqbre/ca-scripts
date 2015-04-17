/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var async = require('async'),
    battles = require('../../config/battle-times'),
    changeLoadout = require('../../requests/loadouts'),
    login = require('../../requests/login'),
    toonService = require('../../services/toons'),
    _ = require('underscore');

module.exports = function (app) {
    app.get('/requests/battle-loadouts', function(request, response){

        // grab all the toons that subscribe to battle-loadouts
        toonService.getToons(function(error, toons){
            if (error) return error;

            login({ email: 'ebreland@madmobile.com', password: '27cfh3' }, function(error, loginResponse){
                changeLoadout({ id: 1, jar: loginResponse.jar }, function(error, changeLoadoutResponse){
                    response.json(changeLoadoutResponse.data);
                });
            })

            // for each battle time
            /*
             _.each(battles, function(battle){
             // schedule a job for each battle, to set loadouts for all the toons
             new cron(new Date(),
             function(){
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
             changeLoadout({ id: 1 }, function(error, response){
             callback(null, data);
             });
             }
             ],
             // terminates waterfall
             function(error, data){
             // callback to end async.map
             callback(error, data);
             });

             }, function (error, data) {
             // finished with async.map
             console.log('battle-loadout mapping complete. at this point, tasks are scheduled');
             });
             },
             function(){ // executed when job stops
             console.log('battle-loadout job complete');
             },
             true,
             'America/New_York');
             });
             */
        });
    });
};