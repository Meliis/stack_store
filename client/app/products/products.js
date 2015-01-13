'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      });
  });
