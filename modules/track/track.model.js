const mongoose = require("mongoose");

// Track model
const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    streamUrl: {
        type: String,
        required: true
    },
    imageUrl: String,
    author: {
        type: String,
        required: true
    },
    poster: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    playCount: {
        type: Number,
        default: 0
    },
    streamable: Boolean,
    genre: String
}, {
    timestamps: true
})
const TrackModel = mongoose.model('Track', TrackSchema);
module.exports = TrackModel;
