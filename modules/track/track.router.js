

const express = require("express");

const router = express.Router();

const trackController = require("./track.controller");
const commentController = require("../comment/comment.controller");
const middlewares = require("../../common/middlewares");
const { createTrackSchema, updataTrackSchema } = require("./track.validation");

// router tập hợp các API có điểm chung => track
router.get("/", trackController.getTracks);
router.get("/:trackId", trackController.getATrack);
router.post("/",
    middlewares.needAuthenticated,
    middlewares.checkRole("user"),
    middlewares.validateInput(createTrackSchema, "body"),
    trackController.createTrack);
router.put("/:trackId",
    middlewares.needAuthenticated,
    middlewares.isPoster,
    middlewares.validateInput(updataTrackSchema, "body"),
    trackController.updateTrack);
router.delete("/:trackId",
    middlewares.needAuthenticated,
    middlewares.checkRole("admin"),
    trackController.deleteTrack);
router.get("/:trackId/comments", commentController.readCommentsOfATrack);
module.exports = router;
