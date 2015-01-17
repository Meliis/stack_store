'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function ($scope, $http, Product) {
    $scope.products = Product.query();
  });
