const EmoticanModel = require("./emotican.model");
const HttpError = require("../../common/httpError");

const addEmotican = async(req, res)=>{
    const {postId} = req.body;
    const newEmotican = await EmoticanModel.create({postId, userId: req.user._id});
    if(!newEmotican){
        throw new HttpError("Something broke!");
    }
    res.send({success:1, data: newEmotican});
}
const deleteEmotican = async(req, res)=>{
    const{emoticanId}= req.params;
    const emoticanDelete = await EmoticanModel.findByIdAndDelete(emoticanId);
    if (!emoticanDelete) {
        throw new HttpError(400, emoticanId + " is not exist");
    }
    res.send({ success: 1, data: emoticanId + " has been deleted" });
}

module.exports={
    addEmotican,
    deleteEmotican
}