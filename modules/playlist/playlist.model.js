
const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: String,
    listDescription: String,
    streamable: Boolean,
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trackCount: {
        type: Number,
        default: 0
    },
    tracks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }]

})
const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);
module.exports = PlaylistModel;