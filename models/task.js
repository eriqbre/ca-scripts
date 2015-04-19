/**
 * Created by ebreland on 4/12/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TaskSchema = new mongoose.Schema({
        name: String,
        type: String,
        data: Schema.Types.Mixed,
        created: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Task', TaskSchema);