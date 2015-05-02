/**
 * Created by ebreland on 4/23/15.
 */

var async = require('async'),
	login = require('../requests/sequences/login-sequence'),
    lom = require('../requests/sequences/lom-check'),
	lomActions = require('./lom-actions'),
	lomTower = require('../requests/lom-tower'),
	lomTowerSort = require('./sort-lom-defense-towers'),
	_ = require('lodash');

module.exports = function (callback) {
	console.log('start lom-check');
    async.waterfall([
        // login and check for lands under defense
        function (callback) {
            lom({}, function (error, data) {
                callback(error, data);
            });
        },
		// grab an attacker and scope out the tower
		function (options, callback) {
			if (options.towersInDefense.length > 0) {
				login({id: 'lom-actions'}, function (error, data) {
					options.toons = data.toons;

					callback(null, options);
				});
			} else {
				callback(null, options);
			}
		},
	    // if there are lands under attack, get the remaining actions in each
	    function (options, callback) {
			if (options.towersInDefense.length > 0 && options.toons.length > 0) {
			    async.map(options.towersInDefense, function(tower, callback){
					lomTower({id: tower.slot, jar: options.toons[0].jar}, function (error, data) {
					    _.extend(tower, data);

					    callback(null, options);
				    });
			    }, function(error, data){
				    callback(null, options);
			    });
		    } else {
			    callback(null, options);
		    }
	    },
	    // if there are lands under attack, filter and prioritize
	    function(options, callback){
		    if (options.towersInDefense && options.towersInDefense.length > 0){
			    // filter out toons with no tokens
			    options.toons = _.filter(options.toons, function(toon){
				    return toon.data.tokens > 0;
			    });
			    lomActions(lomTowerSort(options), function(error, data){
				    console.log('lom-actions complete')
				    callback(null, options);
			    });
		    } else {
			    callback(null, options);
		    }
	    }
    ], function (error, data) {
        console.log('lom-check complete');
        callback(error, data);
    });
};