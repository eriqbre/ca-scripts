/**
 * Created by ebreland on 4/12/15.
 */
module.exports = [
    {time: '53 5 * * 1-3', type: '100v100 morning weekdays'},
    {time: '53 23 * * 0,4-6', type: '100v100 late weekends'},
    {time: '53 11 * * *', type: '100v100 afternoon every day'},
    {time: '53 17 * * *', type: '100v100'},
    {time: '51 8 * * *', type: '10v10 morning every day'},
    {time: '51 14 * * *', type: '10v10 afternoon every day'},
    {time: '51 20 * * *', type: '10v10 evening every day'}
];

