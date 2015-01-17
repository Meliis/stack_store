'use strict';

var mongoose = require('mongoose'),
	User = require('../user/user.model'),
	Product = require('../product/product.model'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  stars: { type: Number, min: 1, max: 5, required: true },
  date: Date,
  title: { type: String, required: true },
  body: { type: String, required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);