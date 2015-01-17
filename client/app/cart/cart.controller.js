'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, CartFactory, Auth) {
    $scope.message = 'Hello';
    $scope.cartTotal;

    $scope.cart;

    var getCart = function() {
     if (Auth.isLoggedIn()) {
       // retrieve user's cart
     } else {
       CartFactory.get({id: localStorage.cartId}, function(cart) {
         $scope.cart = cart.lineItems;
         console.log($scope.cart);
         $scope.calculateTotal();
       });
     }
    };

    getCart();

    $scope.calculateTotal = function(){
    	var total = 0;
    	
    	$scope.cart.forEach(function(el){
    		total += el.price;
    	})

    	$scope.cartTotal = total;
    }

  	});
