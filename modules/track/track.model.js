const mongoose = require("mongoose");

// Track model
const TrackSchema = new mongoose.Schema({
    title: String,
    streamUrl: String,
    imageUrl: String,
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    poster:{
        type: mongoose.Types.ObjectId,
        required: true 
    },
    streamable: Boolean,
    genre: String
}, {
    timestamps: true
})
const TrackModel = mongoose.model('Track', TrackSchema);
module.exports = TrackModel;
