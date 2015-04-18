/**
 * Created by Bridget on 4/13/2015.
 * return a config by toon and role
 */

var Configs = require('../models/configs');

module.exports = {
    getConfig: function (options, callback) {
        Configs.findOne(options, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        })
    },
    getConfigs: function (options, callback) {
        Configs.find(options, function (error, data) {
            if (error) callback(error, null);

            callback(null, data);
        });
    }
};