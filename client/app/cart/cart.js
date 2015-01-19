'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cart', {
        templateUrl: 'app/cart/cart.html',
        controller: 'CartCtrl'
      })
      .when('/cart/:id', {
        templateUrl: 'app/cart/cart.html',
        controller: 'CartCtrl'
      });

  });
