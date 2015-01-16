'use strict';

angular.module('stackStoreApp')
  .factory('Product', function ($http, $location, $resource) {
    var Product = $resource('/api/products/:id', { id: '@_id'});

    Product.search = function(str) {
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
    
    return Product;

  });