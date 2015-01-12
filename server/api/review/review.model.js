'use strict';

var mongoose = require('mongoose'),
	User = require('../user/user.model'),
	Product = require('../product/product.model'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  stars: Number,
  date: Date,
  title: String,
  body: String
});

module.exports = mongoose.model('Review', ReviewSchema);