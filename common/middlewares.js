const jwt = require("jsonwebtoken");
const UserModel = require("../modules/auth/user");
const TrackModel = require("../modules/track/track.model");
const PlaylistModel = require("../modules/playlist/playlist.model");
const CommentModel = require("../modules/comment/comment.model");
const HttpError = require("./httpError");

async function needAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        throw new HttpError(401, 'Not found token');
    }
    const jwtToken = token.split(' ')[1];
    const data = jwt.verify(jwtToken, process.env.SECRET_KEY).data;
    const userId = data.userId;
    if (!userId) {
        throw new HttpError(401, 'Authorization is wrong');
    }
    const existedUser = await UserModel.findById(userId);
    if (!existedUser) {
        throw new HttpError(401, 'Authorization is wrong');
    }
    req.user = existedUser;
    next();
}
async function isTrackPoster(req, res, next) {
    const { trackId } = req.params;
    const track = await TrackModel.findById(trackId);
    if (!track) {
        throw new HttpError(401, 'Not found track');
    }
    const isTrackPoster = req.user._id.equals(track.poster);
    if (!isTrackPoster) {
        throw new HttpError(403, 'Not the poster');
    }
    next();
}

async function isPlaylistCreater(req, res, next) {
    const { playlistId } = req.params;
    const playlist = await PlaylistModel.findById(playlistId);
    if (!playlist) {
        throw new HttpError(401, 'Not found playlist');
    }
    const isPlaylistCreater = req.user._id.equals(playlist.createBy);
    if (!isPlaylistCreater) {
        throw new HttpError(403, 'Not the creater');
    }
    next();
}

async function isCommentPoster(req, res, next) {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new HttpError(401, 'Not found comment');
    }
    const isCommentPoster = req.user._id.equals(comment.author);
    if (!isCommentPoster) {
        throw new HttpError(403, 'Not the poster');
    }
    next();
}

const validateInput = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            throw new HttpError(422, message);
        }
    }
}
const checkRole = (role) => {
    return (req, res, next) => {
        const isRole = req.user.role === role;
        if (!isRole) {
            throw new HttpError(400, "invalid role");
        }
        next();
    }
}

module.exports = {
    needAuthenticated,
    isTrackPoster,
    validateInput,
    checkRole,
    isCommentPoster,
    isPlaylistCreater
}