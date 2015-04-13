/**
 * Created by Bridget on 4/13/2015.
 */

var User = require('../models/user');

module.exports = {
    getUser: function(data, callback){
        User.findOne({id: request.params.id}, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        })
    },
    getUsers: function(callback){
        User.find(function(error, data){
            if (error) callback(error, null);

            callback(null, data);
        });
    }
};