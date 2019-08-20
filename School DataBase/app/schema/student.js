var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    standard: Number,
    name: String,
    section: String,
    markDetails: [{
        exams: String,
        tamil: Number,
        english: Number,
        maths: Number,
        science: Number,
        total: Number
    }]

});
module.exports = mongoose.model('Studentdata', StudentSchema);
