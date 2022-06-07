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
    const { TrackId } = req.params;
    const updatedTrack = await PostModel
        .findByIdAndUpdate(
            TrackId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );
    if (!updatedTrack) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    res.send({ success: 1, data: updatedTrack });
}

const unlikeTrack = async (req, res) => {
    const { TrackId } = req.params;
    const updatedTrack = await PostModel
        .findByIdAndUpdate(
            TrackId,
            { $inc: { likeCount: -1 } },
            { new: true }
        );
    if (!updatedTrack) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    res.send({ success: 1, data: updatedTrack });
}

const getATrack = async (req, res) => {
    const { TrackId } = req.params;
    const Track = await TrackModel.findById(TrackId);
    if (!Track) {
        throw new HttpError(400, TrackId + " is not exist");
    }
    res.send({ success: 1, data: Track });
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
        console.log(regexCond);
        filter.title = regexCond;   
    }
    const Track = await TrackModel.find(filter);
    if (!Track) {
        throw new HttpError(400, "Not found");
    }
    res.send({success:1, data: Track});
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
    getATrack,
    updateTrack,
    deleteTrack,
    likeTrack,
    unlikeTrack,
    getTracksByQuery
}