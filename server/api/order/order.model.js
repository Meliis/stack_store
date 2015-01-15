'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var OrderSchema = new Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	tempId: String,
	lineItems: Array,
	status: String,
	date: Date,
	shipping: Object,
	billing: Object,
	total: Number
});


module.exports = mongoose.model('Order', OrderSchema);