/**
 * Created by ebreland on 4/23/15.
 */
module.exports = function (options) {
    var today = new Date,
        dayOfWeek,
        daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        result = {
            action: 'tributeHeader',
            ajax: '1',
            symbol: options.default
        };

    // each toon can override the default blessing with their own default, or with a day-specific blessing
    if (options.config && options.config['demi-blessing']) {
        // account for timezone difference
        today.setHours(today.getHours() - 3);
        dayOfWeek = daysOfWeek[today.getDay()];
        result.action = 'tribute';  // if a default is specified then don't trigger the header tribute, rather specify the tribute

        if (options.config['demi-blessing'][dayOfWeek]) {
            result.symbol = options.config['demi-blessing'][dayOfWeek];
        } else if (options.config['demi-blessing']['default']) {
            result.symbol = options.config['demi-blessing']['default'];
        }
    }

    return result;
};