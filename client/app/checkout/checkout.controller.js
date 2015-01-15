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
  	}
  	
  	$scope.order = currentOrder();

  });
