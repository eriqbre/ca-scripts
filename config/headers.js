/**
 * Created by ebreland on 4/12/15.
 */

module.exports = function (options) {
    var data = {
        followAllRedirects: true,
        followRedirect: true,
        jar: true,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        }
    };

    if (options.url) {
        data.url = options.url;
    }

    if (options.form) {
        data.method = 'POST';
        data.formData = options.form;
    }

    return data;
};