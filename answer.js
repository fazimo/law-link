const { count } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePafinate = require('mongoose-paginate');

const answer = new Schema({
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        message: { type: String },
        mes_id: { type: Schema.Types.ObjectId, ref: 'moshavere' },
        vakil: { type: String },
})
answer.plugin(timestamps);
answer.plugin(mongoosePafinate)



module.exports = mongoose.model('answer', answer)