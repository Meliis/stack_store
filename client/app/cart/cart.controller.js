'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, Cart, Auth) {

    var cartCtrlScope = $scope;

    $scope.message = 'Hello';
    $scope.cartTotal;
    $scope.cart;
    $scope.populatedCart;
    $scope.cartSize;
    $scope.cartUpdated = false;

    $scope.getData = function() {
      $scope.cart = Cart.currentCart;
      $scope.populatedCart = Cart.populatedCart;
      $scope.populatedCart.calculateTotal();
      $scope.cartTotal = Cart.cartTotal;
      $scope.cartSize = Cart.currentCart.lineItems.length;
    }

    Cart.getCart(function() {
      $scope.getData();
      Cart.addListener(function() {
        $scope.getData();
      });
    });

    $scope.editCart = function(productId, quantity) {
      $scope.cart.editCart(productId, quantity);
      $scope.cartUpdated = true;
      setTimeout(function() {
        $scope.$apply(function() {
          $scope.cartUpdated = false;
        })
      }, 3000);
    };

  });