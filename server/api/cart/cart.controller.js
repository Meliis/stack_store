'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');

// Get list of carts
exports.index = function(req, res) {
  Cart.find(function (err, carts) {
    if(err) { return handleError(res, err); }
    console.log("cart from backend", carts);
    return res.json(200, carts);
  });
};

// Get a single cart
exports.show = function(req, res) {
  var myCart;

//   Cart.findById(req.params.id, function (err, cart) {
//     if(err) { return handleError(res, err); }
//     if(!cart) { return res.send(404); }
//     // myCart = cart;
// })
  Cart.findById(req.params.id)
    .populate('lineItems.item')
    .exec(function(err, cart) {
      console.log("controller", cart);
      if(err) { return handleError(res, err); }
      return res.json(cart);
    });
};

// Creates a new cart in the DB.
exports.create = function(req, res) {
  Cart.create(req.body, function(err, cart) {
    if(err) { return handleError(res, err); }
    return res.json(201, cart);
  });
};

// Updates an existing cart in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    var updated = _.assign(cart, req.body);
    console.log("not updated cart", updated);
    updated.lineItems = _.map(updated.lineItems, function(lineItem) {
      if(lineItem.item && lineItem.item._id) { 
        lineItem.item = lineItem.item._id.toString();
      }
      return lineItem;
    });
    console.log("updated cart", updated);
    updated.save(function (err) {
      console.log("Error", err);
      if (err) { return handleError(res, err); }
      return res.json(200, cart);
    });
  });
};

// Deletes a cart from the DB.
exports.destroy = function(req, res) {
  Cart.findById(req.params.id, function (err, cart) {
    if(err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    cart.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}