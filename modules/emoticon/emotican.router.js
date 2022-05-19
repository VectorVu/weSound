const express = require("express");
const router = express.Router();
const middlewares = require("../../common/middlewares");
const EmoticanController = require("./emotican.controller");

router.post("/", 
    middlewares.needAuthenticated,
    EmoticanController.likeTrack
);

router.get("/allOfUser/:userId",
    middlewares.needAuthenticated,
    EmoticanController.getAllEmoticanOfUser
);

router.get("/allOfTrack/:trackId", EmoticanController.getAllEmoticanOfTrack);

router.delete("/:emoticanId", 
    middlewares.needAuthenticated,
    EmoticanController.unlikeTrack
);

module.exports = router;