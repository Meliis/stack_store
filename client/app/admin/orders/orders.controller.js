'use strict'

angular.module('stackStoreApp')
  .controller('AdminOrderCtrl', function ($scope, $filter, Order) {

  	$scope.orders = Order.query();

  	// $scope.testFilter = function(order, index, array) {
  	// 	console.log(order)
  	// 	console.log(index);
  	// 	console.log(array);
	  // 	// $scope.processingOrder = function(orders)
  	// }

  	$scope.viewAll = function() {
  		$scope.filterOption = null;
  	}

  	$scope.viewProcessing = function(){
  		$scope.filterOption = function(order) {
	      	if (order.status.indexOf('processing') > -1) {
	      		return order;
	      	}
	    }
  	}

  	$scope.viewCompleted = function(){
  		$scope.filterOption = function(order) {
  			if (order.status.indexOf('completed') > -1) {
	      		return order;
	      	}
  		}
  	}

  	$scope.viewCancelled = function(){
  		$scope.filterOption = function(order) {
  			if (order.status.indexOf('cancelled') > -1) {
	      		return order;
	      	}
  		}
  	}

  	});