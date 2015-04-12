/**
 * Created by ebreland on 4/11/15.
 */

var User = require('../../models/user');

module.exports = function (app) {
    app.route('/api/users')
        .all(function (request, response, next) {
            console.log('users interceptor');
            next();
        })
        .get(function (request, response) {
            User.find(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'show all users',
                    data: data
                });
            });
        });

    app.route('/api/user')
        .all(function (request, response, next) {
            console.log('user interceptor');
            next();
        })
        .post(function (request, response) {
            var user = new User(request.body);

            user.save(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            });
        });

    app.route('/api/user/:id')
        .all(function (request, response, next) {
            console.log('single user interceptor');
            next();
        })
        .get(function (request, response) {
            User.findOne({id: request.params.id}, function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            })
        })
        .delete(function (request, response) {
            User.findOneAndRemove({_id: request.params.id}, function (error, data) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'delete a document',
                    data: data
                })
            });
        });
};