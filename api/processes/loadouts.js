/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var changeLoadouts = require('../../services/change-loadouts');

module.exports = function (app) {
    app.get('/api/requests/loadouts/:id', function (request, response) {
        changeLoadouts({id: request.params.id}, function (data) {
            response.json(data);
        });
    });
};