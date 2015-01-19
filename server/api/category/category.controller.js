'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var Product = require('../product/product.model');

// Get list of categories
exports.index = function(req, res) {
  Category.find(function (err, categories) {
    if(err) { return handleError(res, err); }
    console.log(categories);
    return res.json(200, categories);
  });
};

// Get products from single category
exports.show = function(req, res) {
    
    var productsInCat = [];

    Category.findOne({name: req.params.name}, function(err, categoryObj){
    console.log('finding this:', categoryObj.id);

      Product.find({}, function(err, allProducts){

          allProducts.forEach(function(singleProduct){
            // console.log(singleProduct);
            singleProduct.categories.forEach(function(catEl){
              // console.log(JSON.stringify(catEl));
              if (JSON.stringify(catEl) == JSON.stringify(categoryObj._id)){
                productsInCat.push(singleProduct);
              }
            });
          });
          console.log(productsInCat);
          return res.json(201,productsInCat);
      });
    });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.json(201, category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}