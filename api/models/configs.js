/**
 * Created by ebreland on 4/11/15.
 */

var Config = require('../../models/configs');

module.exports = function (app) {
    app.route('/api/configs')
        .all(function (request, response, next) {
            console.log('configs interceptor');
            next();
        })
        .get(function (request, response) {
            Config.find(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'show all configs',
                    data: data
                });
            });
        });

    app.route('/api/config')
        .all(function (request, response, next) {
            console.log('configs interceptor');
            next();
        })
        .post(function (request, response) {
            var config = new Config(request.body);

            config.save(function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            });
        });

    app.route('/api/config/:id')
        .all(function (request, response, next) {
            console.log('single config interceptor');
            next();
        })
        .get(function (request, response) {
            Config.findOne({id: request.params.id}, function (error, data) {
                if (error) return response.send({error: error.message});

                response.json(data);
            })
        })
        .delete(function (request, response) {
            Config.findOneAndRemove({_id: request.params.id}, function (error, data) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'delete a document',
                    data: data
                })
            });
        });
};