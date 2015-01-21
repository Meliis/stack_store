'use strict';

angular.module('stackStoreApp')
  .factory('Order', function ($resource) {
    // Service logic
    // ...
    var currentCart = 1;

    var Order = $resource('/api/orders/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });

    Order.latestOrder;

    Order.findCart = function(myCart) {
      currentCart = myCart;
      console.log("myCart equals:", myCart);
    }

    Order.getCart = function() {
      console.log('getting cart..', currentCart);
      return currentCart;
    };

    Order.setLatestOrder = function(order) {
      Order.latestOrder = order;
    };

    // Public API here
    return Order;
  });
