const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: String,
    author: {
        type: mongoose.Types.ObjectId
    },
    trackId: {
        type: mongoose.Types.ObjectId
    }
},{
    timestamps:true
})

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;