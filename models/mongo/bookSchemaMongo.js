'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const books = mongoose.Schema({
  title: { type:String, required:true},
  author: { type:String, required:true },
  isbn: { type:String, required:false },
  image: { type:String, required:false },
  description: { type:String, required:true },
  id: { type:String, required:false},
});


module.exports = books;