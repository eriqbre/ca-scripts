var app = require('./app'),
    cluster = require('cluster'),
    cpus = require('os').cpus().length,
    port = process.env.PORT || 3010;

if (cluster.isMaster){
    for (var i = 0; i< cpus; i++){
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        cluster.fork();
    });
} else {
    app.listen(port);
    console.log('server running on port ' + port);
}
