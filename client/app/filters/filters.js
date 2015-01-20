angular.module('stackStoreApp')
  .filter('processingOrder', function() {
    return function(orders) {
      var out = [];
      orders.forEach(function(order) {
      	if (order.status.indexOf('processing') > -1) {
      		out.push(order);
      	}
      });
      return out;
    }
  })
  .filter('completedOrder', function() {
  	return function(orders) {
  		var out = [];
  		orders.forEach(function(order) {
  			if (order.status.indexOf('completed') > -1) {
  				out.push(order);
  			}
  		});
  		return out;
  	}
  })
  .filter('cancelledOrder', function() {
  	return function(orders) {
  		var out = [];
  		orders.forEach(function(order) {
  			if (order.status.indexOf('cancelled') > -1) {
  				out.push(order);
  			}
  		});
  		return out;
  	}
  })