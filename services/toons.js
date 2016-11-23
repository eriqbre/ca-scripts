/**
 * Created by Bridget on 4/13/2015.
 */

var Toon = require('../models/toon');

module.exports = {
    findByEmail: function(data, callback) {
	    Toon.findOne({email: data.email}, function (error, data) {
		    if (error) callback(error, null);

		    callback(null, data);
	    })
    },
    getToon: function(data, callback){
        Toon.findOne({_id: data.id}, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        })
    },
    getToons: function(options, callback){
        Toon.find(options, function(error, data){
            if (error) callback(error, null);

            callback(null, data);
        });
    }
};