/**
 * Created by ebreland on 4/12/15.
 */
module.exports = function () {
    var result = {
        times: []
    }, setTime = function (hours, min) {
        var date = new Date();

        date.setUTCHours(hours);
        date.setUTCMinutes(miutes);

        return date;
    }, setCron = function (cron) {

    };

    result.times.push({time: '45 9 * * 1-3', type: '100v100'});    // weekday morning battles
    result.times.push({time: '45 3 * * 0,4-6', type: '100v100'});  // weekend late battles
    result.times.push({time: '45 15 * * 0,4-6', type: '100v100'});  // lunch battles
    result.times.push({time: '45 21 * * 0,4-6', type: '100v100'});  // dinner battles

    result.times.push({time: '45 11 * * 0,4-6', type: '10v10'});  // morning 10v10 battles
    result.times.push({time: '45 17 * * 0,4-6', type: '10v10'});  // lunch 10v10 battles
    result.times.push({time: '45 23 * * 0,4-6', type: '10v10'});  // dinner 10v10 battles

    return result;
};

