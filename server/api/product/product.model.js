'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Category = require('../category/category.model'),
    Product = require('../review/review.model')

var ProductSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {blurb: {type: String, required: true}, full: {type: String, required: true}},
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
  images: {type: Array, default: ['http://lorempixel.com/400/400']}, 
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  quantity: Number // quantity available--needs to increment when order placed
});

ProductSchema.statics.search = function(str, products) {
  var searchResults = [];
        // overlook articles
        var cleanedUpSearch = function(query) {
          var dirtySearch = query.split(" ");
          dirtySearch.forEach(function(term, i) {
            if (term.length <= 2 || term === "the" || term === "time") {
              dirtySearch.splice(i, 1);
            }
          });
          return dirtySearch;
        }
        var searchTerms = cleanedUpSearch(str);
        products.forEach(function(product) {
          var counter = 0;
          searchTerms.forEach(function(term) {
            var re = new RegExp(term, "gi");
            if (re.test(product.name) || re.test(product.description.full)) {
              counter++;
            } 
          });
          if (counter > 0) {
            searchResults.push({product: product, terms: counter});
          }
        });

        searchResults.sort(function(a,b) {
          if (a.terms > b.terms) return -1;
          if (a.terms < b.terms) return 1;
          return 0;
        });

        return searchResults; 
}

ProductSchema
  .path('name')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({name: value}, function(err, product) {
      if(err) throw err;
      if(product) {
        if(self.id === product.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
}, 'A product with this name already exists.');

// ProductSchema
//   .path('categories')
//   .validate(function(arr, respond) {
//       // Category.findOne({name: arr[0]}, function(err, category) {
//     // });  // NOT YET
//     if(arr.length === 0) {
//       return respond(false);
//     }
//     return respond(true);
//   }, 'You must include at least one category.');

module.exports = mongoose.model('Product', ProductSchema);