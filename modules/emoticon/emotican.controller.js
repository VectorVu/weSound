const EmoticanModel = require("./emotican.model");
const HttpError = require("../../common/httpError");

const addEmotican = async (req, res) => {
    const { trackId } = req.body;
    const newEmotican = await EmoticanModel.create({ trackId, userId: req.user._id });
    if (!newEmotican) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: newEmotican });
}

const deleteEmotican = async (req, res) => {
    const { emoticanId } = req.params;
    const emoticanDelete = await EmoticanModel.findByIdAndDelete(emoticanId);
    if (!emoticanDelete) {
        throw new HttpError(400, emoticanId + " is not exist");
    }
    res.send({ success: 1, data: emoticanId + " has been deleted" });
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
    addEmotican,
    deleteEmotican,
    getAllEmoticanOfUser,
    getAllEmoticanOfTrack
}