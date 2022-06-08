require('dotenv').config()
require('express-async-errors');
const route = require('./modules/route.index')
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


mongoose.connect(process.env.MONGODB_URL, err => {
    if (err) return console.log("can not connect to MongoDb", err);
    console.log("successful connection to MongoBb");
})

const trackRouter = require("./modules/track/track.router");
const commentRouter = require("./modules/comment/comment.router");
const emoticanRouter = require("./modules/emoticon/emotican.router");
const authRouter = require("./modules/auth/auth.router");
const playlistRouter = require("./modules/playlist/playlist.router");
const uploadRouter = require("./modules/upload/upload.router");

app.get("/", (req, res)=>{
    res.send('<h1>Đây là demo weSound</h1><br><p>Test các api khác bằng Postman qua đường dẫn trang web/api/... Register -> login -> lấy token -> tạo post -> tạo comment ||upload ảnh,.... </p>')
})

const corsOptions ={
    origin: process.env.CORS_ACCESS_URL, 
    // origin:"http://localhost:3000",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/api/track', trackRouter);
app.use('/api/comment', commentRouter);
app.use('/api/emotican', emoticanRouter);
app.use('/api/auth', authRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/upload', uploadRouter);

app.use('*', (req, res)=>{

    res.send({message: '404 not found'});
})

app.use(function (err, req, res, next) {
    res.status(err.status||500).send({success:0, message: err.message})
})

app.listen(process.env.PORT || 9009, err => {
    if (err) return console.log("can not start");
    console.log("successs started at Port");
})

