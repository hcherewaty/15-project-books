'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};
const client = mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

module.exports = client;

// require('./src/app.js').start(process.env.PORT);