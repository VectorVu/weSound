const mongoose = require("mongoose");

const EmoticanShema = new mongoose.Schema({
    trackId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    iconUrl: String
}, {
    timestamps: true
})

const EmoticanModel = mongoose.model('Emotican', EmoticanShema);
module.exports = EmoticanModel;