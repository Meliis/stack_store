'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromocodeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Promocode', PromocodeSchema);