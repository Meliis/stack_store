'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Auth) {
    

  	$scope.user = Auth.getCurrentUser();


  	var currentOrder = function() {
  		angular.forEach($scope.user.orders, function(order) {
  			if(order.status === 'incomplete') {
  				return order;
  			}
  		})
  	};

  	$scope.userOrder = currentOrder();
  	$scope.order;

  	$scope.checkout = function() {
  		if((/^\d{5}(?:[-\s]\d{4})?$/).test($scope.order.shipping.zip)) {
  			console.log('working');
  			return true;
  		} else {
  			return false;
  		}
  	};

  

  });
