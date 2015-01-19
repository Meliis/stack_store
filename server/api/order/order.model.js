'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model'),
    Product = require('../product/product.model');
var stripe = require('stripe')('sk_test_cpRVxDOZySsVJVoEW8xgYKpZ');
var Q = require('q');

var states = 'created processing processing_guest cancelled cancelled_guest completed completed_guest'.split(' ');

var lineItemsSchema = new Schema({
  productId: String,
  productName: String,
  price: Number,
  quantity: Number
});

var OrderSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  lineItems: {type:[lineItemsSchema], required:true },
  status: {type: String, default:'created', enum: states},
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
OrderSchema.methods.completeOrderCheck = function() {
  if(this.userId) {
    this.status = 'completed';
  } else {
    this.status = 'completed_guest';
  }
};

OrderSchema.methods.processOrderCheck = function() {
  if(this.userId) {
    this.status = 'processing';
  } else {
    this.status = 'processing_guest';
  }
};

OrderSchema.methods.createDate = function() {
  this.date = new Date();
}

OrderSchema.statics.createStripeCharge = function(info, res) {
  var deferral = Q.defer();
  var charge = stripe.charges.create({
      amount: info.total,
      currency: 'usd',
      card: info.billing.stripeToken,
      description: info.billing.email,
      capture: false
    }, function(err,charge) {
          if(err && err.type === 'StripeCardError') {
            return res.send(500, err)
          }
          deferral.resolve(charge);
    });
    return deferral.promise;
};

// //method for closed_guest state
// OrderSchema.methods.closeGuestOrder = function() {
//   this.status = 'closed_guest';
// };

module.exports = mongoose.model('Order', OrderSchema);