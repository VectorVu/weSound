const TrackModel = require("./track.model");
const HttpError = require("../../common/httpError");


const createTrack = async (req, res) => {
    const { title, streamUrl, imageUrl, author } = req.body;
    const newTrack = await TrackModel.create({ title, streamUrl, imageUrl, author, poster: req.user._id });
    if (!newTrack) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newTrack });
}

const likeTrack = async (req, res) => {
    const { trackId } = req.params;
    const updatedTrack = await TrackModel
        .findByIdAndUpdate(
            trackId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );
    if (!updatedTrack) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: updatedTrack });
}

const unlikeTrack = async (req, res) => {
    const { trackId } = req.params;
    const updatedTrack = await TrackModel
        .findByIdAndUpdate(
            trackId,
            { $inc: { likeCount: -1 } },
            { new: true }
        );
    if (!updatedTrack) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: updatedTrack });
}

const getATrack = async (req, res) => {
    const { trackId } = req.params;
    const Track = await TrackModel.findById(trackId).populate('poster', 'username avatarUrl');
    if (!Track) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: Track });
}
const getAllTrackByUserId = async(req, res)=>{
    const{userId} = req.params;
    const tracks = await TrackModel.find({poster:userId}).populate('poster', 'username');
    if (!tracks) {
        throw new HttpError(400, userId + " is not exist");
    }
    res.send({ success: 1, data: tracks });
}

const getTracksByQuery = async(req, res)=>{
    let filter={};
    const {poster, q} = req.query;
    if(poster){
        filter.poster = poster;
    }
    if(q){
        const regex = new RegExp(`${q}`, 'i');
        const regexCond = { $regex: regex };
        filter.title = regexCond;   
    }
    const Track = await TrackModel.find(filter).populate('poster', 'username');
    if (!Track) {
        throw new HttpError(400, "Not found");
    }
    res.send({success:1, data: Track});
}

const updateTrack = async (req, res) => {
    const { trackId } = req.params;
    const { streamUrl, title } = req.body;
    const updateTrack = await TrackModel.findByIdAndUpdate(trackId, { streamUrl, title }, { new: true });
    if (!updateTrack) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: updateTrack });
}

const deleteTrack = async (req, res) => {
    const { trackId } = req.params;
    const TrackDelete = await TrackModel.findByIdAndDelete(trackId);
    if (!TrackDelete) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: trackId + " has been deleted" });
}
const addPlayCount =async (req, res)=>{
    const { trackId } = req.params;
    const updatedTrack = await TrackModel
        .findByIdAndUpdate(
            trackId,
            { $inc: { playCount: 1 } },
            { new: true }
        );
    if (!updatedTrack) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: updatedTrack });
}
const getTrendingTracks = async(req, res)=>{
    const trending = await TrackModel.find().sort({playCount:-1}).populate('poster', 'username');
    if(!trending){
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: trending });
}
module.exports = {
    createTrack,
    getATrack,
    updateTrack,
    deleteTrack,
    likeTrack,
    unlikeTrack,
    getTracksByQuery,
    getAllTrackByUserId,
    addPlayCount,
    getTrendingTracks
}