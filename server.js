var app = require('./app'),
    port = process.env.PORT || 3010;

app.listen(port);
console.log('server running on port ' + port);

