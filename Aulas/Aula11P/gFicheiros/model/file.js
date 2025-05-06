var mongoose = require('mongoose')

var fileSchema = new mongoose.Schema({
    date: Date,
    mimetype : String,
    name: String,
    originalname: String,
    size: Number
}, {versionKey : false})

module.exports = mongoose.model('file', fileSchema)