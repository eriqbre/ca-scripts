/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
    loadouts = require('../workers/loadouts'),
    port = process.env.PORT || 3021,
    throng = require('throng');

app.listen(port);

process.on('SIGTERM', function () {
    console.log('shutting down');
    process.exit();
});

throng(start('battle-defense', function () {
    process.exit();
}), {workers: 1});