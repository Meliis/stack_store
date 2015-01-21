'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, Cart, Auth, $sce) {

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
      var alertMessages = ["Your requested amount exceeds the quantity in stock. Any minutes available have been added to your cart.",
                           "Your request could not be processed. Amount in cart is at maximum capacity.",
                           "Your cart has been updated!"];
      $scope.cart.editCart(productId, quantity);
      Cart.addListener(function() {
        console.log(Cart.messageIndex);
        $scope.message = $sce.trustAsHtml(alertMessages[Cart.messageIndex]);
        if (Cart.messageIndex < 2) {
          $scope.successBanner = false;
          $scope.warningBanner = true;
        } else if (Cart.messageIndex === 2) {
          $scope.warningBanner = false;
          $scope.successBanner = true;
        }
      });
      setTimeout(function() {
        $scope.$apply(function() {
          $scope.successBanner = false;
          $scope.warningBanner = false;
          $scope.quantity = 1;
        })
      }, 3000);
    };

  });