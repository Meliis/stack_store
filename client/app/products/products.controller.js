'use strict';

angular.module('stackStoreApp')
  .controller('ProductsCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.products = [
    {name: 'Time Machine', price: 100000},
    {name: 'Watch', price: 10},
    {name: 'Clock', price: 5},
    {name: 'Alarm Clock', price: 3},
    {name: 'Black Hole', price: 50},
    {name: 'Paradox', price: 46},
    {name: 'Time Itself', price: 78},
    {name: 'Wormhole', price: 2},
    {name: 'Tardis', price: 50000},
    {name: 'Time Warp', price:19}
    ];
  });
