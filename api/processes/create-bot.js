/**
 * Created by ebreland on 4/20/2015.
 */

var Toon = require('../../models/toon');

module.exports = function(app){
	app.post('/process/create-bot/:role', function(request, response){
		// grab the role._id
		Toon.findOne({ email: request.body.email }, function(error, toon){
			if (!toon){
				var toon = new Toon(request.body);
			}

			toon.save(function(error){
				response.json(toon);
			});
		});
	});
};