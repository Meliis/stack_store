'use strict';

var mongoose = require('mongoose'),
	Product = require('../product/product.model'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String
});

var productsInCat = [];

CategorySchema.statics.findProducts = function(categoryName, productSchema, cb){
    this.findOne({name: categoryName}, function(err, categoryObj){

      productSchema.find({}, function(err, allProducts){

          allProducts.forEach(function(singleProduct){
            // console.log(singleProduct);
            singleProduct.categories.forEach(function(catEl){
              // console.log(JSON.stringify(catEl));
              if (JSON.stringify(catEl) == JSON.stringify(categoryObj._id)){
                productsInCat.push(singleProduct);
              }
            });
          });
          
          cb(productsInCat);
      });

    });
}

module.exports = mongoose.model('Category', CategorySchema);