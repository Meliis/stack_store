'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, Product, $routeParams, Auth, Order) {

  	$scope.user = Auth.getCurrentUser();

  	$scope.quantity = 1;
  	
    Product.get({id: $routeParams.id}, function(product) {
    	$scope.product = product;
    });

    $scope.maxStars = [1,2,3,4,5];

    $scope.addToCart = function(quantity) {

    	var productExists = false;
    	angular.forEach($scope.user.orders[0].products, function(product) {
    		if($scope.product._id === product.product._id) {
    			product.qty += quantity;
    			productExists = true;
    		}
    	});

    	if(productExists === false) {
	    	$scope.user.orders[0].products.push({product: $scope.product, qty: quantity});    		
    	}

    	$scope.quantity = 1;
    };

    //initiate temporary banner for the cart

  });
