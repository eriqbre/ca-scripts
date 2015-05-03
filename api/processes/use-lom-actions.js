/**
 * Created by ebreland on 4/11/15.
 * handle using up LoM actions
 */

var lomAttack = require('../../services/lom-actions'),
    _ = require('lodash');

module.exports = function (app) {
	app.get('/api/requests/use-lom-actions/:tower', function (request, response) {
        var options = {
            id: request.params.tower
        };

        if (request.query.healthPerActionTarget){
            options.healthPerActionTarget = parseInt(request.query.healthPerActionTarget);
        }
        if (request.query.healthPercentage){
            options.healthPercentage = parseInt(request.query.healthPercentage);
        }
        if (request.query.ceiling){
            options.ceiling = parseInt(request.query.ceiling);
        }
        if (request.query.floor){
            options.floor = parseInt(request.query.floor);
        }

		lomAttack(options, function (data) {
			response.json(data);
		});
    });
};