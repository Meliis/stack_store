'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model'),
    Product = require('../product/product.model');

var states = 'open closed closed_guest'.split(' ');

var lineItemsSchema = new Schema({
  productId: String,
  productName: String,
  price: Number,
  quantity: Number
});

var OrderSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  lineItems: {type:[lineItemsSchema], required:true },
  status: {type: String, default:'open', enum: states},
  date: Date,
  shipping: Object,
  billing: Object
});


OrderSchema.virtual('total').get(function() {
  var total = 0;
  this.lineItems.forEach(function(lineItem) {
    var subtotal = lineItem.price * lineItem.quantity;
    total += subtotal;
  });
  return {
    'total': total
  }
});

//method for closed state
OrderSchema.methods.closeOrder = function() {
  this.status = 'closed';
};

//method for closed_guest state
OrderSchema.methods.closeGuestOrder = function() {
  this.status = 'closed_guest';
};

module.exports = mongoose.model('Order', OrderSchema);