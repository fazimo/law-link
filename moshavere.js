const { count } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePafinate = require('mongoose-paginate');

const moshavere = new Schema({
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        message: { type: String },
        vakil: { type: String },
        user: { type: String },
})
moshavere.plugin(timestamps);
moshavere.plugin(mongoosePafinate)



module.exports = mongoose.model('moshavere', moshavere)