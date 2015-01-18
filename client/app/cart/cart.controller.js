'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, CartFactory, Auth) {

    console.log("WHEN I GET TO CART:");
    console.log("CartFactory.currentCart:", CartFactory.currentCart);

    $scope.message = 'Hello';
    $scope.cartTotal;
    $scope.cart = CartFactory.currentCart;
    $scope.populatedCart = CartFactory.populatedCart;

    $scope.calculateTotal = function(){
    	var total = 0;
    	
    	$scope.cart.forEach(function(el){
    		total += el.price;
    	})

    	$scope.cartTotal = total;
    }

  	});
