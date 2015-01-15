'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl'
      });
  });
