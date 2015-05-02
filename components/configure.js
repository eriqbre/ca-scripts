/**
 * Created by ebreland on 4/28/15.
 * configure battle actions for each battle type
 */

var request = require('../requests/base'),
    routes = require('../config/routes'),
    _ = require('lodash');

module.exports = function (options) {
    switch (options.role) {
        case '10v10-actions':
            var config = {
                parser: require('./10v10/parsers/battle'),
                url: routes.hvhBattle
            };

            return {
                home: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./10v10/forms/home')(options),
                        jar: options.jar,
                        parser: require('./10v10/parsers/home'),
                        url: routes.hvh
                    }), callback);
                },
                action: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./10v10/forms/action')(options),
                        jar: options.jar
                    }), callback);
                },
                enter: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./10v10/forms/enter')(options),
                        jar: options.jar
                    }), callback);
                },
                join: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./10v10/forms/join')(options),
                        jar: options.jar
                    }), callback);
                },
                tower: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./10v10/forms/tower')(options),
                        jar: options.jar
                    }), callback);
                }
            };
            break;
        case '100v100-actions':
            var config = {
                parser: require('./100v100/parsers/battle'),
                url: routes.hvhBattle
            };

            return {
                home: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./100v100/forms/home')(options),
                        jar: options.jar,
                        parser: require('./100v100/parsers/home'),
                        url: routes.hvh
                    }), callback);
                },
                action: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./100v100/forms/action')(options),
                        jar: options.jar
                    }), callback);
                },
                enter: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./100v100/forms/enter')(options),
                        jar: options.jar
                    }), callback);
                },
                join: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./100v100/forms/join')(options),
                        jar: options.jar
                    }), callback);
                },
                tower: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./100v100/forms/tower')(options),
                        jar: options.jar
                    }), callback);
                }
            };
            break;
        case 'fbb-actions':
            var config = {
                parser: require('./fbb/parsers/battle'),
                url: routes.fbbEnter
            };

            return {
                home: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./fbb/forms/home')(options),
                        jar: options.jar,
                        parser: require('./fbb/parsers/home'),
                        url: routes.fbbHome
                    }), callback);
                },
                action: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./fbb/forms/action')(options),
                        jar: options.jar
                    }), callback);
                },
                enter: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./fbb/forms/enter')(options),
                        jar: options.jar
                    }), callback);
                },
                join: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./fbb/forms/join')(options),
                        jar: options.jar
                    }), callback);
                },
                tower: function (options, callback) {
                    return request(_.extend(_.clone(config, true), {
                        form: require('./fbb/forms/tower')(options),
                        jar: options.jar
                    }), callback);
                }
            };
            break;
    }
};