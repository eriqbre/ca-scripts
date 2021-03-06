/**
 * Created by ebreland on 4/12/15.
 * a base request wrapper that handles setting default headers, cookie jars, forms and template parsing
 */

var request = require('request'),
    _ = require('lodash'),
    async = require('async');

module.exports = function (options, callback) {
    //require('events').EventEmitter.setMaxListeners(0);
    //require('request-debug')(request);
    var _this = this,
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        },
        url, form,
        jar = options.jar || request.jar();

    if (options.url) {
        url = options.url;
    }

    if (options.form) {
        options.method = 'POST';
        form = options.form;
    } else {
        options.method = 'GET'
    }

    async.retry(5, function (callback, results) {
        request({
            followAllRedirects: true,
            followRedirect: true,
            formData: form,
            headers: headers,
            jar: jar,
            method: options.method,
	        //proxy: 'http://127.0.0.1:8888',
            strictSSL: false,
            timeout: options.timeout || 5000,
            url: url
        }, function (error, response) {
            process.nextTick(function () {
                if (!error && options.parser) {
                    options.parser(options, response, function (error, data) {
                        callback(error, data);
                    });
                } else {
                    callback(error, response);
                }
            });
        })
            .once('response', function (response) {
                // add global data to the response
                _.extend(response, {
                    data: {
                        jar: jar,
                        template: 'home',
                        url: url,
                        name: 'to-do'
                    }
                });
            })
            .once('error', function (error) {
                if (error.code !== 'ETIMEDOUT' && error.code !== 'ESOCKETTIMEDOUT') {
			        console.log(error);
		        }
            })
    }, function (error, response) {
        callback(error, response);
    });
};