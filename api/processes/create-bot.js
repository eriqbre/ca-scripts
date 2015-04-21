/**
 * Created by ebreland on 4/20/2015.
 */

var Toon = require('../../models/toon'),
	Role = require('../../models/role'),
	Config = require('../../models/configs');

module.exports = function(app){
	app.post('/process/create-bot/:role', function(request, response){
		// grab the role._id
		Role.findOne({ identifier: request.params.role }, function(error, role){

			Toon.findOne({ email: request.body.email}, function(error, toon){

				if (!toon){
					// create the toon
					var toon = new Toon(request.body);
					toon.roles.push(role.id);
				}
				toon.save(function(error, data){

					// if present, create a config
					if (request.body.config){

						Config.findOne({ toon: toon.id, role: role.id }, function(error, configs){

							if (!configs){
								var configs = new Config({ toon: toon.id, role: role.id, data: request.body.config });

								configs.save(function(error, data){
									if (error) response.send(error);

									response.json({
										role: role,
										toon: toon,
										config: configs
									});
								});
							}
						});
					} else {
						response.json({
							role: role,
							toon: toon
						});
					}
				});
			});
		});
	});
};