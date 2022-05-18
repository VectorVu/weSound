require('dotenv').config()
require('express-async-errors');
const route = require('./modules/route.index')
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

route(app)
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })

