/**
 * Created by ebreland on 4/11/15.
 */

var User = require('../../models/user'),
    userService = require('../../services/users');

module.exports = function (app) {
    app.route('/api/users')
        .all(function (request, response, next) {
            console.log('users interceptor');
            next();
        })
        .get(function (request, response) {
            userService.getUsers(function(error, data){
                response.json(data);
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
            userService.getUser(request.params.id, function(error, data){
                response.json(data);
            });
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