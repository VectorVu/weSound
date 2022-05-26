const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    avatarUrl:{
        type:String
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        // required:true
    }
},{
    timestamps:true
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;