/**
 * Created by ebreland on 4/11/15.
 * handle using up LoM actions
 */

var lomAttack = require('../../services/lom-actions');

module.exports = function (app) {
	app.get('/api/requests/use-lom-actions/:tower', function (request, response) {
		lomAttack({ id: request.params.tower }, function (data) {
			response.json(data);
		});
    });
};