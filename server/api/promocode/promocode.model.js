'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Product = require('../product/product.model');

var types = "all single category".split(' ');

var PromocodeSchema = new Schema({
  code:{type: String, required: true},
  creationDate: {type: Date, required: true},
  expirationDate: {type: Date, required: true},
  promoType: {type: String, enum: types, required: true},
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
});

// Not sure if I need this since the type will always be set on the front end
// PromocodeSchema.methods.typeCheck = function(type) {
// 	if(type === 'single') {
// 		this.promoType = 'single';
// 	} else if (type === 'category') {
// 		this.promoType = 'category';
// 	} else {
// 		this.promoType = 'all';
// 	}
// };

PromocodeSchema
.path('promoType')
.validate(function(value) {
	if(value === 'single' && !this.productId) {
		return false
	} else {
		return true;
	}
}, "You need a productId for a single promotion!");

PromocodeSchema.statics.createDate = function(promocode) {
	promocode.creationDate = new Date();
	return promocode;
};

module.exports = mongoose.model('Promocode', PromocodeSchema);