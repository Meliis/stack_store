'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      })
      .when('/products/add', {
        templateUrl: 'app/products/productAdd/productAdd.html',
        controller: 'ProductAddCtrl'
      })
      .when('/products/:id', {
        templateUrl: 'app/products/productView/productView.html',
        controller: 'ProductViewCtrl'
      })
  });
