/**
 * Created by ebreland on 4/23/15.
 */
var routes = require('../routes');

module.exports = function (options) {
    var today = new Date,
        dayOfWeek,
        daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        result = {
            form: {
                action: 'tributeHeader',
                ajax: '1',
                symbol: options.default
            },
            url: routes.index
        };

    // each toon can override the default blessing with their own default, or with a day-specific blessing
    if (options.config && options.config['demi-blessing']) {
        // account for timezone difference
        today.setHours(today.getHours() - 3);
        dayOfWeek = daysOfWeek[today.getDay()];
        result.form.action = 'tribute';  // if a default is specified then don't trigger the header tribute, rather specify the tribute
        result.url = routes.oracle;

        if (options.config['demi-blessing'][dayOfWeek]) {
            result.form.symbol = options.config['demi-blessing'][dayOfWeek];
        } else if (options.config['demi-blessing']['default']) {
            result.form.symbol = options.config['demi-blessing']['default'];
        }
    }

    return result;
};