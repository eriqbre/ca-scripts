/**
 * Created by ebreland on 4/12/15.
 * a base request wrapper that handles setting default headers, cookie jars, forms and template parsing
 */

var request = require('request'),
    cookie = require('tough-cookie'),
    cheerio = require('cheerio');

module.exports = function (options, callback) {
    var headers = {
            followAllRedirects: true,
            followRedirect: true,
            jar: true,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            }
        },
        url, form;

    if (options.url) {
        url = options.url;
    }

    if (options.form) {
        headers.method = 'POST';
        form = options.form;
    }

    return request({
        formData: form,
        headers: headers,
        url: url
    }, callback)
        .on('response', function (response) {
            response.data = {
                template: 'home',
                data: {
                    name: 'to-do'
                }
            }
        })
        .on('error', function (error) {
            console.log(error);
            response.data = {
                template: 'error',
                error: error,
                data: {}
            }
        });
};