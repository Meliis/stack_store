'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/orders', {
      	templateUrl: 'app/admin/orders/orders.html',
      	controller: 'AdminOrderCtrl'
      });
  });