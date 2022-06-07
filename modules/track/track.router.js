
const express = require("express");
const router = express.Router();
const trackController = require("./track.controller");
const commentController = require("../comment/comment.controller");
const middlewares = require("../../common/middlewares");
const { createTrackSchema, updataTrackSchema } = require("./track.validation");

// router tập hợp các API có điểm chung => track

router.get("/:trackId", trackController.getATrack);
router.get("/", trackController.getTracksByQuery);

router.post("/",
    middlewares.needAuthenticated,
    middlewares.validateInput(createTrackSchema, "body"),
    trackController.createTrack
);

router.put("/:trackId",
    middlewares.needAuthenticated,
    middlewares.isTrackPoster,
    middlewares.validateInput(updataTrackSchema, "body"),
    trackController.updateTrack
);

router.put("/like/:trackId",
    middlewares.needAuthenticated,
    trackController.updateTrack
);

router.put("/unlike/:trackId",
    middlewares.needAuthenticated,
    trackController.updateTrack
);

router.delete("/:trackId",
    middlewares.needAuthenticated,
    middlewares.isTrackPoster,
    trackController.deleteTrack
);

router.get("/:trackId/comments", commentController.readCommentsOfATrack);

module.exports = router;
