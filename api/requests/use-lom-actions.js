/**
 * Created by ebreland on 4/11/15.
 * handle using up LoM actions
 *
 * determine how many actions remain
 * while actions > 200, attack targets
 */

var async = require('async'),
    login = require('../../requests/sequences/login-sequence'),
    landOfMistTower = require('../../requests/landOfMistTower');

module.exports = function (app) {
    var _this = this,
        actionsRemaining;

    app.route('/api/requests/use-lom-actions/:id')
        .get(function (request, response) {
            async.waterfall([
                // execute login sequence for lom actions
                function (callback) {
                    login({id: 'lom-actions'}, function (error, data) {
                        callback(null, data);
                    });
                },
                // grab one of the toons and enter the tower
                function (options, callback) {
                    landOfMistTower({id: request.params.id}, function (error, data) {
                        options.tower = data;
                    });
                },
                // attack the tower
                function (options, callback) {
                    // after every attack, check remaining actions
                    // once remaining actions hits a predetermined number, break out and end
                    // always attack the toon with the most health
                }
            ], function (error, data) {
                if (error) response.json(error);

                response.json(data);
            });
        });
};