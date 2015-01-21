'use strict'

angular.module('stackStoreApp')
  .controller('AdminOrderCtrl', function ($scope, $filter, Order) {

  	$scope.orders = Order.query();

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

  	$scope.cancelOrder = function(order){
  		console.log(order);
      if (order.status.indexOf('guest') > -1){
        order.status = 'cancelled_guest';
      }
      else{
        order.status = 'cancelled';
      }
      Order.update(order);
      angular.element("#"+order._id).css({display: 'none'});
    }

    $scope.confirmOrder = function(order){
      if (order.status.indexOf('guest') > -1){
        order.status = 'completed_guest';
      }
      else{
        order.status = 'completed';
      }
      Order.capture(order);
    }

  	});