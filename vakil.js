const { count } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePafinate = require('mongoose-paginate');

const vakil = new Schema({
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        semat: { type: String },
        tume: { type: String },
        main: { type: String },
        loc: { type: String },
        log: { type: String },
})
vakil.plugin(timestamps);
vakil.plugin(mongoosePafinate)



module.exports = mongoose.model('vakil', vakil)