'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var states = 'open closed closed_guest'.split(' ');

var lineItemsSchema = new Schema({
  product: String,
  price: Number,
  quantity: Number
});

var OrderSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  lineItems: [lineItemsSchema],
  status: {type: String, default:'open', enum: states},
  date: Date,
  shipping: Object,
  billing: Object,
  total: {type: Number, default: 0}
});

//method for open state
OrderSchema.methods.openOrder = function() {
  this.status = 'open';
};

//method for closed state
OrderSchema.methods.closeOrder = function() {
  this.status = 'closed';
};

//method for closed_guest state
OrderSchema.methods.closeGuestOrder = function() {
  this.status = 'closed_guest';
};

module.exports = mongoose.model('Order', OrderSchema);