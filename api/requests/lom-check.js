/**
 * Created by ebreland on 4/12/15.
 * setup automated jobs for setting loadouts before each battle
 */

var lom = require('../../services/lom-check');

module.exports = function (app) {
    app.get('/api/requests/lom-check', function (request, response) {
        lom(function (error, data) {
            response.json(data);
        });
    });
};