'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, Product, CartFactory, $routeParams, Auth, orderFactory) {

    $scope.cart = CartFactory.currentCart;
  	$scope.user = Auth.getCurrentUser();
  	$scope.quantity = 1;

  	
    Product.get({id: $routeParams.id}, function(product) {
    	$scope.product = product;
    });

    $scope.maxStars = [1,2,3,4,5];

    $scope.addToCart = function(productId, quantity) {
      $scope.cart.addToCart(productId, quantity);
      $scope.quantity = 1;
    }

    // $scope.addToCart = function(productId, quantity) {

    //   var productExists = false;

    //   angular.forEach($scope.cart.lineItems, function(lineItem) {
    //     if (lineItem.item === productId) {
    //       lineItem.quantity += quantity;
    //       $scope.cart.$update();
    //       productExists = true;
    //     }
    //   });

    //   if (productExists === false) {
    //     $scope.cart.lineItems.push({item: productId, quantity: quantity});
    //     $scope.cart.$update();
    //   }

    //   $scope.quantity = 1;
    //   CartFactory.getCart();

    // };

    //initiate temporary banner for the cart

  });
