/**
 * Created by Bridget on 4/13/2015.
 */

var Role = require('../models/role'),
    mongoose = require('mongoose');

module.exports = {
    getRole: function (options, callback) {
        Role.findOne(options, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        })
    },
    getRoles: function (options, callback) {
        Role.find(options, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        });
    }
};