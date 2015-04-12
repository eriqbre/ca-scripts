/**
 * Created by ebreland on 4/11/15.
 */

var Role = require('../../models/role');

module.exports = function (app) {
    app.route('/api/roles')
        .all(function (request, response, next) {
            console.log('roles interceptor');
            next();
        })
        .get(function (request, response) {
            Role.find(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'show all roles',
                    data: data
                });
            });
        });

    app.route('/api/role')
        .all(function (request, response, next) {
            console.log('role interceptor');
            next();
        })
        .post(function (request, response) {
            var role = new Role(request.body);

            role.save(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            });
        });

    app.route('/api/role/:id')
        .all(function (request, response, next) {
            console.log('single role interceptor');
            next();
        })

        // get a single document
        .get(function (request, response) {
            Role.findOne({id: request.params.id}, function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            })
        })

        // delete a document
        .delete(function (request, response) {
            Role.findOneAndRemove({_id: request.params.id}, function (error, data) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'delete a document',
                    data: data
                })
            });
        });
};