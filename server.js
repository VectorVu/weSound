require('dotenv').config()
require('express-async-errors');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

