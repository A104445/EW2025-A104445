const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    nome: String,

})

userSchema.plugin(passportLocalMongoose)

mongoose.export = mongoose.model('User', userSchema)