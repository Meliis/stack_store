'use strict';

angular.module('stackStoreApp')
  .controller('ProductAddCtrl', function ($scope, productFactory) {
    $scope.message = 'Hello';

    $scope.newProduct;

    $scope.addProduct = function(){
    	productFactory.addProduct($scope.newProduct);
    }

  });
