'use strict';

angular.module('stackStoreApp')
  .controller('ProductsCtrl', function ($scope, productFactory) {
    $scope.message = 'Hello';

    $scope.products = productFactory.getAll();
    
  });
