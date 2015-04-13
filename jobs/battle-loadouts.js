/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var schedule = require('node-schedule'),
    async = require('async'),
    battles = require('./config/battle-times'),
    _ = require('underscore');

module.exports = function (app) {

    // create job for swapping loadouts before battle starts
    async.map(battles.times,
        function (battle, callback) {

        },
        function (error, data) {

        });
};