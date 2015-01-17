'use strict';

angular.module('stackStoreApp')
  .factory('orderFactory', function ($resource) {
    // Service logic
    // ...

    var Order = $resource('/api/orders/:id', { id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });


    // Public API here
    return Order;
  });
