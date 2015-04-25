/**
 * Created by ebreland on 4/25/15.
 * get all toons participating in this run by role
 * todo: enhance this tool by recording when the bot should next pull a toon
 */

var async = require('async'),
    collectResources = require('../requests/collect-resources'),
    cronfigs = require('../config/cron'),
    demiBlessing = require('../requests/demi-blessing'),
    heroCrystal = require('../requests/collect-hero-crystals'),
    itemArchives = require('../requests/enable-item-archive'),
    login = require('../requests/sequences/login-sequence'),
    Task = require('../models/task'),
    Toon = require('../models/toon'),
    _ = require('underscore'),
    task;

module.exports = function (callback) {
    // find all the toons that have roles defined in the cronfig
    Toon.find({roles: {$in: cronfigs.maintenance.roles}}, function (error, toons) {
        task = new Task({
            name: 'maintenance',
            type: 'maintenance',
            data: []
        });

        async.waterfall([
            function (callback) {
                // log in these toons and get to work
                login({roles: cronfigs.maintenance.roles, toons: toons}, function (error, data) {
                    callback(null, data);
                });
            },
            function (options, callback) {
                // all toons should now be logged in
                async.parallel([
                    // run toons with demi-blessings
                    function (callback) {
                        async.map(_.filter(options.toons, function (toon) {
                            // return the toons for this requests
                            return toon.roles.indexOf('demi-blessing') > -1 && toon.data.demiBlessing.available;
                        }), function (toon) {
                            // run the requests
                            if (toon) {
                                demiBlessing({
                                    config: toon.configs,
                                    jar: toon.jar,
                                    default: toon.data.demiBlessing.default || '2'
                                }, function (error, data) {
                                    task.data.push({
                                        type: 'demi-blessing', toon: toon.name
                                    });
                                    callback(null, data);
                                });
                            } else {
                                callback(null, {});
                            }
                        }, function (error, data) {
                            // return the results
                            callback(error, data);
                        });
                    },
                    // run toons with item archives
                    function (callback) {
                        async.map(_.filter(options.toons, function (toon) {
                            // return the toons for this requests
                            return toon.roles.indexOf('set-item-archives') > -1 && !toon.data.itemArchiveActive;
                        }), function (toon) {
                            if (toon) {
                                // run the requests
                                itemArchives({config: toon.configs, jar: toon.jar}, function (error, data) {
                                    task.data.push({
                                        type: 'item-archives', toon: toon.name
                                    });
                                    callback(null, data);
                                });
                            } else {
                                callback(null, {});
                            }
                        }, function (error, data) {
                            // return the results
                            callback(error, data);
                        });
                    },
                    // run toons with resource collections
                    function (callback) {
                        async.map(_.filter(options.toons, function (toon) {
                            // return the toons for this requests
                            return toon.roles.indexOf('collect-resources') > -1 && !toon.data.resourcesCollected;
                        }), function (toon) {
                            if (toon) {
                                // run the requests
                                collectResources({config: toon.configs, jar: toon.jar}, function (error, data) {
                                    task.data.push({
                                        type: 'collect-resources', toon: toon.name
                                    });
                                    callback(null, data);
                                });
                            } else {
                                callback(null, {});
                            }
                        }, function (error, data) {
                            // return the results
                            callback(error, data);
                        });
                    },
                    // run toons with hero crystal collections
                    function (callback) {
                        async.map(_.filter(options.toons, function (toon) {
                            // return the toons for this requests
                            return toon.roles.indexOf('collect-hero-crystal') > -1 && !toon.data.heroCrystalCollected;
                        }), function (toon) {
                            if (toon) {
                                // run the requests
                                heroCrystal({config: toon.configs, jar: toon.jar}, function (error, data) {
                                    task.data.push({
                                        type: 'hero-crystals', toon: toon.name
                                    });
                                    callback(null, data);
                                });
                            } else {
                                callback(null, {});
                            }
                        }, function (error, data) {
                            // return the results
                            callback(error, data);
                        });
                    }
                ], function (error, data) {
                    callback(error, data);
                });
            }
        ], function (error, data) {
            if (task.data.length > 0) {
                task.save(function (error) {
                    callback(null, task);
                });
            } else {
                callback(null, task);
            }
        });
    });
};