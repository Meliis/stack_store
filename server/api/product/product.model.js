'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  categories: [categorySchema],
  images: [], 
  reviews: [reviewSchema],
  quantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);