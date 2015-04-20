/**
 * Created by ebreland on 4/19/15.
 */

var http = require('http'); //importing http

var options = {
    host: 'ca-scripts.herokuapp.com',
    port: 80,
    path: '/WAKEUP_DYNO'
};
console.log("======WAKUP DYNO START");
http.get(options, function (res) {
    res.on('data', function (chunk) {
        try {
            // optional logging... disable after it's working
            console.log("======WAKUP DYNO: HEROKU RESPONSE: " + chunk);
        } catch (err) {
            console.log(err.message);
        }
    });
}).on('error', function (err) {
    console.log("Error: " + err.message);
});