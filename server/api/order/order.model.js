'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var OrderSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  lineItems: Array,
  status: String,
  date: Date,
  shipping: Object,
  billing: Object,
  email: String,
  total: Number
});


module.exports = mongoose.model('Order', OrderSchema);