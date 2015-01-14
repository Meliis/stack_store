'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, productFactory, $routeParams) {
  	
    productFactory.viewProduct($routeParams.id).then(function(product) {
    	$scope.product = product;
    });

    $scope.maxStars = [1,2,3,4,5];

  });
