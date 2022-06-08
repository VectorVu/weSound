const express = require("express");
const router = express.Router();
const middlewares = require("../../common/middlewares");
const playlistController = require("./playlist.controller");
const {createPlaylistSchema, updatePlaylistSchema} = require("./playlist.validation");

router.get("/listOfuser/:userId", playlistController.getAllPlaylistByUserId);

router.get("/:playlistId", playlistController.getPlaylistById);

router.post("/", 
    middlewares.needAuthenticated,
    middlewares.validateInput(createPlaylistSchema, "body"),
    playlistController.createPlaylist
);

router.put("/:playlistId", 
    middlewares.needAuthenticated,
    middlewares.isPlaylistCreater,
    middlewares.validateInput(updatePlaylistSchema, "body"),
    playlistController.updatePlaylist
);

router.put("/list/:playlistId/addtrack/:TrackId",
    middlewares.needAuthenticated,
    middlewares.isPlaylistCreater,
    playlistController.addTrackToPlaylist
);

router.put("/list/:playlistId/removetrack/:TrackId",
    middlewares.needAuthenticated,
    middlewares.isPlaylistCreater,
    playlistController.removeTrackFromPlaylist
);

router.delete("/:playlistId",
    middlewares.needAuthenticated,
    middlewares.isPlaylistCreater,
    playlistController.deletePlaylist
);

module.exports = router;

