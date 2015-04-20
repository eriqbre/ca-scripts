/**
 * Created by ebreland on 4/20/2015.
 */

var Toon = require('../../models/toon'),
	Role = require('../../models/role'),
	Config = require('../../models/configs');

module.exports = function(app){
	app.post('/process/create-bot', function(request, response){
		// grab the role._id
		Role.findOne({ identifier: 'lom-actions' }, function(error, role){
			if (error) response.send(error);

			// create the toon
			var newToon = new Toon(request.body);
			newToon.roles.push(role.id);

			newToon.save(function(error, toon){
				if (error) response.send(error);

				// if present, create a config
				if (request.body.config){
					var newConfig = new Config({ toon: toon.id, role: role.id, data: request.body.config });

					newConfig.save(function(error, config){
						if (error) response.send(error);

						response.json({
							role: role,
							toon: newToon,
							config: newConfig
						});
					});
				} else {
					response.json({
						role: role,
						toon: newToon
					});
				}
			});
		});
	});
};