'use strict'

angular.module('stackStoreApp')
  .controller('AdminOrderCtrl', function ($scope, $filter, Order) {

  	$scope.orders = Order.query();
    $scope.criterion = "all";
  	$scope.viewAll = function() {
  		$scope.filterOption = null;
  	}

    $scope.match = function(criterion) {
      if(criterion == 'all') return function(){ return true };
      else return function(order) {
        return (order.status.indexOf(criterion) > -1);
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
      Order.update(order);
    }

  	});