/**
 * Created by ebreland on 4/12/15.
 * trigger battle-collect manually
 */

var trigger = require('../../services/battle-collect');

module.exports = function (app) {
	app.get('/api/requests/battle-collect/:role', function (request, response) {
		trigger({role: request.params.role}, function (error, data) {
			response.json(data);
		});
	});
};