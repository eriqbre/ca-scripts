var app = require('./app'),
	cluster = require('express-cluster'),
	cpus = require('os').cpus().length,
    port = process.env.PORT || 3010;

// for production
cluster(function(worker) {
	app.listen(port);
	console.log('server running on port ' + port);
}, {count: cpus});

// uncomment when debugging
// app.listen(port);