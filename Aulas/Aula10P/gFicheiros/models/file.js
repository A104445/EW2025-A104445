var mongoose = require('mongoose')

var fileSchema = new mongoose.Schema({
    _id : Number,
    nome : String,
    nomeOriginal : String,
    date : Date, 
    mimetype : String,
    size : Number,
    path : String
}, {versionKey : false})

module.exports = mongoose.model('file', fileSchema)