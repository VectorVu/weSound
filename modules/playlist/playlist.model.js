
const mongoose = require("mongoose");
const TrackModel = require("../track/track.model");

const PlaylistModel = mongoose.Schema({
    title: String,
    imageUrl: String,
    desciption: String,
    streamable: Boolean,
    tracks: [TrackModel]

})
module.exports = PlaylistModel;