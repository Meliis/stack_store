'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model'),
    Product = require('../product/product.model');

var CartSchema = new Schema({
	  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	  lineItems: [{item:{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}, quantity: Number}],
	  date: Date
	});

CartSchema.virtual('total').get(function() {
  var total = 0;
  this.lineItems.forEach(function(lineItem) {
    var subtotal = lineItem.item.price * lineItem.quantity;
    total += subtotal;
  });
  return {
    'total': total
  }
});




module.exports = mongoose.model('Cart', CartSchema);