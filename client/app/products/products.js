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
        controller: 'ProductAddCtrl',
        authenticate: true
      })
      .when('/products/:id', {
        templateUrl: 'app/products/productView/productView.html',
        controller: 'ProductViewCtrl'
      })
      .when('/products/:id/edit', {
        templateUrl: 'app/products/productEdit/productEdit.html',
        controller: 'ProductEditCtrl'
      })
  });
