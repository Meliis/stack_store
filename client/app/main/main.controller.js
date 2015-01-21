'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function ($scope, $http, Product, Category, Auth, Cart, User) {
    $scope.products = Product.query();
    $scope.categories = Category.query();

    $scope.user = Auth.getCurrentUser();
    if ($scope.user.$promise) {
    	$scope.user.$promise.then(function(user) {
    		if (user.provider == 'google') {
    			if (user.__v == 0) {
    				user.__v++;
    				Cart.startAuthCart(user._id);
    				User.update(user);
    				Cart.mergeCarts();
    			}
    			else {
    				Cart.mergeCarts(user._id);
    			}
    		}
    	});
    }
  });
