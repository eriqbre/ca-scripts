/**
 * Created by ebreland on 4/23/15.
 */
module.exports = function (options) {
    var today = "",
        result = {
            symbol: options[today] || options['default'], // if a blessing is present for today, use it, otherwise use the default
            action: 'tribute',
            ajax: '1'
        };

    return result;
};