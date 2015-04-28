/**
 * Created by ebreland on 4/12/15.
 * trigger 10v10-actions manually
 */

var trigger = require('../../services/fbb-actions');

module.exports = function (app) {
    app.get('/api/requests/fbb-actions', function (request, response) {
        trigger({ role: 'fbb-actions' }, function (error, data) {
            response.json(data);
        });
    });
};