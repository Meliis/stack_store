'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, Product, Cart, $routeParams, Auth, Order) {

    $scope.cart;
  	$scope.user = Auth.getCurrentUser();
  	$scope.quantity = 1;
    $scope.isAdmin = Auth.isAdmin;
  	
    Product.get({id: $routeParams.id}, function(product) {
    	$scope.product = product;
    });

    $scope.maxStars = [1,2,3,4,5];

    Cart.getCart(function() {
      $scope.cart = Cart.currentCart;
      Cart.addListener(function() {
        $scope.cart = Cart.currentCart;
      });
    });

    $scope.addToCart = function(productId, quantity) {
      $scope.cart.addToCart(productId, quantity);
      $scope.added = true;
      setTimeout(function() {
        $scope.$apply(function() {
          $scope.added = false
          $scope.quantity = 1;
        })
      }, 3000);
    }

  });
