const UserModel = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/httpError");

const register = async (req, res) => {
    const { username, password, role, avatarUrl } = req.body;
    const existedUser = await UserModel.findOne({ username });
    if (existedUser) {
        throw new HttpError(400, 'Username duplicate');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
        username,
        password: hashPassword,
        role,
        avatarUrl
    });
    res.send({
        success: 1,
        data: {
            _id: newUser.id,
            username: newUser.username
        }
    })
}
const login = async (req, res) => {
    const { username, password } = req.body;
    const existedUser = await UserModel.findOne({ username });
    if (!existedUser) {
        throw new HttpError(400, 'Username or password is wrong');
    }
    const matchPassword = await bcrypt.compare(password, existedUser.password);
    if (!matchPassword) {
        throw new HttpError(400, 'Username or password is wrong');
    }
    const data = {
        username: username,
        userId: existedUser._id
    }
    const token = jwt.sign({
        data,
    }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 7
    })
    res.send({
        success: 1,
        data: {
            _id: data.userId,
            token
        }
    })
}
module.exports = {
    register,
    login
}