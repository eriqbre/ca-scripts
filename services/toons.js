/**
 * Created by Bridget on 4/13/2015.
 */

var Toon = require('../models/toon');

module.exports = {
    getToon: function(data, callback){
        Toon.findOne({id: request.params.id}, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        })
    },
    getToons: function(callback){
        Toon.find(function(error, data){
            if (error) callback(error, null);

            callback(null, data);
        });
    }
};