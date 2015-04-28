/**
 * Created by ebreland on 4/12/15.
 * trigger 10v10-actions manually
 */

var trigger = require('../../services/100v100-actions');

module.exports = function (app) {
    app.get('/api/requests/100v100-actions', function (request, response) {
        trigger({}, function (error, data) {
            response.json(data);
        });
    });
};