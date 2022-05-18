const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    trackId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{
    timestamps:true
})

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;