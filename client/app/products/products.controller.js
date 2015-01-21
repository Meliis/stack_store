'use strict';

angular.module('stackStoreApp')
  .controller('ProductsCtrl', function ($scope, Product) {
    $scope.products = Product.query();

    $scope.checkStock = function(product) {
    	if (product.quantity === undefined) {
    		product.inStock = false;
    	} else product.inStock = true;
    	return product.inStock;
    }
    
  });
