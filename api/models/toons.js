/**
 * Created by ebreland on 4/11/15.
 */

var Toon = require('../../models/toon'),
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

        // delete a toon document
        .delete(function (request, response) {
            Toon.findOneAndRemove({_id: request.params.id}, function (error, toon) {
                if (error) return response.send({error: error.message});

                response.json({
                    message: 'delete a toon',
                    data: toon
                })
            });
        });
};