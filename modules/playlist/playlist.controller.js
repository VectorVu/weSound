const PlaylistModel = require("./playlist.model");
const HttpError = require("../../common/httpError");
const TrackModel = require("../../modules/track/track.model");

const createPlaylist = async (req, res) => {
    const { title, imageUrl, listDescription } = req.body;
    const newPlaylist = await PlaylistModel.create({ title, imageUrl, listDescription, createBy: req.user._id });
    if (!newPlaylist) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newPlaylist });
}

const updatePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { title, description } = req.body;
    const updatePlaylist = await PlaylistModel.findByIdAndUpdate(playlistId, { title, description }, { new: true });
    if (!updatePlaylist) {
        throw new HttpError(400, playlistId + " is not exist");
    }
    res.send({ success: 1, data: updatePlaylist });
}

const addTrackToPlaylist = async (req, res) => {
    const { playlistId, TrackId } = req.params;
    const isTrack = await TrackModel.findById(TrackId);
    if (!isTrack) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    const isAddedTrack = await PlaylistModel.find({ $and: [{ _id: playlistId }, { tracks: TrackId }] });
    // if document notfound => isAddedTrack = empty Array []
    if (isAddedTrack.length) {
        throw new HttpError(400, TrackId + " was added earlier");
    }
    const addTrack = await PlaylistModel.findByIdAndUpdate(
        playlistId,
        { $push: { tracks: TrackId } },
        { $inc: { trackCount: 1 } },
        { new: true }
    );
    if (!addTrack) {
        throw new HttpError(400, playlistId + " is not exist");
    }
    res.send({ success: 1, data: addTrack });
}

const removeTrackFromPlaylist = async (req, res) => {
    const { playlistId, TrackId } = req.params;
    const isTrack = await TrackModel.findById(TrackId);
    if (!isTrack) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    const isAddedTrack = await PlaylistModel.find({ $and: [{ _id: playlistId }, { tracks: TrackId }] });
    if (!isAddedTrack.length) {
        throw new HttpError(400, TrackId + " hasn't been added yet");
    }
    const removeTrack = await PlaylistModel.findByIdAndUpdate(
        playlistId,
        { $pull: { tracks: TrackId } },
        { $inc: { trackCount: -1 } },
        { new: true }
    );
    if (!removeTrack) {
        throw new HttpError(400, playlistId + " is not exist");
    }
    res.send({ success: 1, data: removeTrack });
}

const getPlaylistById = async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await PlaylistModel.findById(playlistId).populate('createBy', 'username');
    if (!playlist) {
        throw new HttpError(400, playlistId + " is not exist");
    }
    res.send({ success: 1, data: playlist });
}

const getAllPlaylistByUserId = async (req, res) => {
    const { userId } = req.params;
    const playlistOfUser = await PlaylistModel.find({ createBy: userId });
    if (!playlistOfUser) {
        throw new HttpError(400, userId + " is not exits");
    }
    res.send({ success: 1, data: playlistOfUser });
}

const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await PlaylistModel.findByIdAndDelete(playlistId);
    if (!playlist) {
        throw new HttpError(400, playlistId + " is not exist");
    }
    res.send({ success: 1, data: playlistId + " has been deleted" });
}

module.exports = {
    createPlaylist,
    updatePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    getPlaylistById,
    deletePlaylist,
    getAllPlaylistByUserId
}

