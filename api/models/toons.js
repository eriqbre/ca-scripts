/**
 * Created by ebreland on 4/11/15.
 */

var Toon = require('../../models/toon'),
	//Role = require('../../models/role'),
    cipher = require('../../config/cipher'),
    toonService = require('../../services/toons'),
   _ = require('lodash');

module.exports = function (app) {
    // api/toons
    app.route('/api/toons')
        .all(function (request, response, next) {
            console.log('toons interceptor');
            next();
        })
        .get(function (request, response) {
            toonService.getToons(function(error, data){
                response.json(data);
            });
        });

    app.route('/api/toon')
        .all(function (request, response, next) {
            console.log('toon interceptor');
            next();
        })
        .post(function (request, response) {
            var toon = new Toon(request.body);

            toon.save(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            });
        });

    app.route('/api/toon/:email')
       .get(function(request, response) {
	       toonService.findByEmail({ email: request.params.email }, function(error, data){
		       response.json(data);
	       });
       })
	    .patch(function (request, response) {
		    toonService.findByEmail({ email: request.body.email }, function(error, toon){
			    if (request.body.configs) {
				    _.each(request.body.configs, function(value, key){
					    toon.configs[key] = value;
				    });
			    }

			    if (request.body.password) {
				    toon.password = request.body.password;
			    }

			    if (request.body.roles) {
				    toon.roles = request.body.roles;
			    }

			    toon.save(function (error, data) {
				    if (error) return response.send({error: error.message});

				    response.json(data);
			    });
		    });
	    });

    app.route('/api/toon/:id')
        .all(function (request, response, next) {
            console.log('single toon interceptor');
            next();
        })
        .get(function (request, response) {
            toonService.getToon({ id: request.params.id }, function(error, data){
                response.json(data);
            });
        })
        .delete(function (request, response) {
            Toon.findOneAndRemove({_id: request.params.id}, function (error, toon) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'delete a toon',
                    data: toon
                })
            });
        })
       .post(function (request, response) {});

	app.route('/api/bots/:role')
		.get(function(request, response){
			Toon.find({ roles: request.params.role }, function(error, toons){
				response.json(toons);
			});
		});
};