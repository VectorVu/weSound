const EmoticanModel = require("./emotican.model");
const HttpError = require("../../common/httpError");

const likeTrack = async (req, res) => {
    const { trackId } = req.body;
    const isLiked = await EmoticanModel.find({ $and: [{ userId: req.user._id }, { trackId: trackId }] });
    if (isLiked.length) {
        throw new HttpError(400, trackId + " was liked earlier");
    }
    const newEmotican = await EmoticanModel.create({ trackId, userId: req.user._id });
    if (!newEmotican) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newEmotican });
}

const unlikeTrack = async (req, res) => {
    const { trackId } = req.body;
    const isLiked = await EmoticanModel.find({ $and: [{ userId: req.user._id }, { trackId: trackId }] });
    if (!isLiked.length) {
        throw new HttpError(400, trackId + " hasn't been liked yet");
    }
    const emoticanDelete = await EmoticanModel.findByIdAndDelete(isLiked[0]._id);
    if (!emoticanDelete) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: isLiked[0]._id + " has been deleted" });
}

const getAllEmoticanOfUser = async (req, res) => {
    const { userId } = req.params;
    const allEmoi = await EmoticanModel.find({ userId: userId });
    if (!allEmoi) {
        throw new HttpError(400, userId + " is not exist");
    }
    res.send({ success: 1, data: allEmoi });
}

const getAllEmoticanOfTrack = async (req, res) => {
    const { trackId } = req.params;
    const allEmoi = await EmoticanModel.find({ trackId: trackId });
    if (!allEmoi) {
        throw new HttpError(400, trackId + " is not exist");
    }
    res.send({ success: 1, data: allEmoi });
}

module.exports = {
    likeTrack,
    unlikeTrack,
    getAllEmoticanOfUser,
    getAllEmoticanOfTrack
}