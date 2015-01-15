'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, productFactory, $routeParams, Auth, orderFactory) {

  	$scope.user = Auth.getCurrentUser();
    console.log('user:', $scope.user);

  	$scope.quantity = 1;
  	
    // $scope.order = orderFactory.get({id: $scope.user.orders[0]._id});

    console.log('this is our order', $scope.order);

    productFactory.viewProduct($routeParams.id).then(function(product) {
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
