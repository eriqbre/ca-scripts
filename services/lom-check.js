/**
 * Created by ebreland on 4/23/15.
 */

var async = require('async'),
    lom = require('../requests/sequences/lom-check'),
	lomActions = require('./lom-actions'),
	lomTower = require('../requests/lom-tower'),
	lomTowerSort = require('./sort-lom-defense-towers'),
	_ = require('underscore');

module.exports = function (callback) {
    async.waterfall([
        // login and check for lands under defense
        function (callback) {
            lom({}, function (error, data) {
                callback(error, data);
            });
        },
	    // if there are lands under attack, get the remaining actions in each
	    function (options, callback) {
		    if (options.towersInDefense.length > 0) {
			    async.map(options.towersInDefense, function(tower, callback){
				    lomTower({id: tower.slot, jar: options.jar}, function (error, data) {
					    _.extend(tower, {
						    toons: data.toons,
						    actionsRemaining: data.actionsRemaining,
						    timeRemaining: data.timeRemaining
					    });

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
			    lomActions(lomTowerSort(options), function(error, data){
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