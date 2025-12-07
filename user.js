const { count } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePafinate = require('mongoose-paginate');

const user = new Schema({
        name: { type: String },
        phone: { type: String },
        password: { type: String },
        vid: { type: String },
        type: { type: Number }, // 0:user , 1:vakil , 2:admin
})
user.plugin(timestamps);
user.plugin(mongoosePafinate)



module.exports = mongoose.model('user', user)