/**
 * Created by Bridget on 4/13/2015.
 */

var Toon = require('../models/toon'),
	mongoose = require('mongoose');

module.exports = {
    getToon: function(data, callback){
        Toon.findOne({id: request.params.id}, function (error, data) {
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