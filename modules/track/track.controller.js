const TrackModel = require("./track.model");
const HttpError = require("../../common/httpError");


const getTracks = async (req, res) => {
    const Tracks = await TrackModel.find();
    if (!Tracks) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: Tracks });
}

const createTrack = async (req, res) => {
    const { title, streamUrl, imageUrl, author } = req.body;
    const newTrack = await TrackModel.create({ title, streamUrl, imageUrl, author, poster: req.user._id });
    if (!newTrack) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newTrack });
}

const getATrack = async (req, res) => {
    const { TrackId } = req.params;
    const Track = await TrackModel.findById(TrackId);
    if (!Track) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    res.send({ success: 1, data: Track });
}

const updateTrack = async (req, res) => {
    const { TrackId } = req.params;
    const { streamUrl, title } = req.body;
    const updateTrack = await TrackModel.findByIdAndUpdate(TrackId, { streamUrl, title }, { new: true });
    if (!updateTrack) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    res.send({ success: 1, data: updateTrack });
}

const deleteTrack = async (req, res) => {
    const { TrackId } = req.params;
    const TrackDelete = await TrackModel.findByIdAndDelete(TrackId);
    if (!TrackDelete) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    res.send({ success: 1, data: TrackId + " has been deleted" });
}

module.exports = {
    createTrack,
    getTracks,
    getATrack,
    updateTrack,
    deleteTrack
}