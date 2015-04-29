/**
 * Created by ebreland on 4/12/15.
 * trigger 10v10-actions manually
 */

var trigger = require('../../services/battle-actions');

module.exports = function (app) {
    app.get('/api/requests/battle-actions/:role', function (request, response) {
        trigger({role: request.params.role}, function (error, data) {
            response.json(data);
        });
    });
};