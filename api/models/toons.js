/**
 * Created by ebreland on 4/11/15.
 */

var Toon = require('../../models/toon'),
	Role = require('../../models/role'),
    cipher = require('../../config/cipher'),
    toonService = require('../../services/toons');

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
	    .put(function (request, response) {
            Toon.findOne({_id: request.params.id}, function (error, toon) {

                if (request.body.email) {
                    toon.email = request.body.email;
                }

                if (request.body.password) {
                    toon.password = request.body.password;
                }

                if (request.body.caId) {
                    toon.caId = request.body.caId;
                }

                if (request.body.name) {
                    toon.name = request.body.name;
                }

                toon.save(function (error) {
                    response.json(toon);
                });

		    });
	    });

	app.route('/api/bots/:role')
		.get(function(request, response){
			Toon.find({ roles: request.params.role }, function(error, toons){
				response.json(toons);
			});
		});
};