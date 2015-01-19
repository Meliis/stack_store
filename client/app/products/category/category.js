'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/category/query/:name', {
        templateUrl: 'app/products/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
