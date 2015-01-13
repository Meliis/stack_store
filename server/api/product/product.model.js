'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Category = require('../category/category.model'),
    Product = require('../review/review.model')

var ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  images: [], 
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  quantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);