var app = require('./app'),
	cluster = require('express-cluster'),
	cpus = require('os').cpus().length,
	port = process.env.PORT || 3010,
	environment = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'production') {
	// for production, no debugging possible
	cluster(function (worker) {
		app.listen(port);
		console.log('server running on port ' + port);
		console.log('cluster environment for ' + environment);
	}, {
		count: cpus,
		respawn: true,
		verbose: true
	});
} else {
	// use when debugging
	app.listen(port);
	console.log('server running on port ' + port);
	console.log('single process environment for ' + environment);
}

