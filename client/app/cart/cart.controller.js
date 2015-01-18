'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, Cart, Auth) {

    var cartCtrlScope = $scope;

    $scope.message = 'Hello';
    $scope.cartTotal;
    $scope.cart;
    $scope.populatedCart;

// Might delete this function (trying to work from cart factory)
    var calculateTotal = function(){
    	var total = 0;
    	
      console.log(cartCtrlScope.populatedCart);
      cartCtrlScope.populatedCart.lineItems.forEach(function(lineItem){
    		total += el.price;
    	})

    	$scope.cartTotal = total;
    };

    Cart.getCart(function() {
      $scope.cart = Cart.currentCart;
      $scope.populatedCart = Cart.populatedCart;
      Cart.addListener(function() {
        $scope.cart = Cart.currentCart;
        $scope.populatedCart = Cart.populatedCart;
      });
    });


	});