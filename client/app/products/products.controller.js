'use strict';

angular.module('stackStoreApp')
  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();
    
  });
