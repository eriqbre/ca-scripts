/**
 * Created by ebreland on 4/12/15.
 * a base request wrapper that handles setting default headers, cookie jars, forms and template parsing
 */

var request = require('request'),
    _ = require('lodash');

module.exports = function (options, callback) {
    require('request-debug')(request);
    var headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        },
        url, form,
        jar = request.jar();

    if (options.url) {
        url = options.url;
    }

    if (options.form) {
        options.method = 'POST';
        form = options.form;
    } else {
        options.method = 'GET'
    }

   return request({
       followAllRedirects: true,
       followRedirect: true,
       formData: form,
       headers: headers,
       jar: true,
       method: options.method,
       url: url
    }, function(error, response, body){

       callback(error, response);
   })
       .on('response', function (response) {
           _.extend(response, {
               template: 'home',
               url: url,
               data: {
                   name: 'to-do'
               }
           });
       })
        .on('error', function (error) {
            console.log(error);
        });
};