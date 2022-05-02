const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    name: String,
    age: String,
    avaUrl: String,

})

module.exports= AuthorSchema;