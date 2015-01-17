'use strict';

angular.module('stackStoreApp')
  .factory('Product', function ($http, $location, $resource) {
    var Product = $resource('/api/products/:id', { id: '@_id'});

    return Product;

  });