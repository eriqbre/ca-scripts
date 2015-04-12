/**
 * Created by ebreland on 4/11/15.
 * toons subscribe to roles in which they will participate
 * for example; General Alliance gives permission for this toon to change their general alliances
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ToonSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        caId: String,
        roles: [Schema.ObjectId]
    });

module.exports = mongoose.model('Toon', ToonSchema);