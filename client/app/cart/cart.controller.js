'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.cartItem = [
    {name: 'Time Machine', price: 100000, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Watch', price: 10, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Clock', price: 5, description: {blurb: "A time machine", full:"More than the last"} },
    ];
  });
