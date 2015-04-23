/**
 * Created by ebreland on 4/12/15.
 */
module.exports = [
    {time: '10 * * * *', type: '100v100 morning weekdays'},
    {time: '45 5 * * 1-3', type: '100v100 morning weekdays'},
    {time: '45 23 * * 0,4-6', type: '100v100 late weekends'},
    {time: '45 11 * * *', type: '100v100 afternoon every day'},
    {time: '45 17 * * *', type: '100v100'},
    {time: '45 8 * * *', type: '10v10 morning every day'},
    {time: '45 14 * * *', type: '10v10 afternoon every day'},
    {time: '45 20 * * *', type: '10v10 evening every day'}
];

