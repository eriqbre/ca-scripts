/**
 * Created by ebreland on 4/12/15.
 */
module.exports = [
    {time: '53 9 * * 1-3', type: '100v100 morning weekdays'},
    {time: '53 3 * * 0,4-6', type: '100v100 late weekends'},
    {time: '53 15 * * *', type: '100v100 afternoon every day'},
    {time: '53 21 * * *', type: '100v100'},
    {time: '51 11 * * *', type: '10v10 morning every day'},
    {time: '51 17 * * *', type: '10v10 afternoon every day'},
    {time: '51 23 * * *', type: '10v10 evening every day'}
];

