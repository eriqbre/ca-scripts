/**
 * Created by ebreland on 4/26/15.
 */

module.exports = function (url, variable) {
    var query = url.split('?');
    var vars = query[1].split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
};