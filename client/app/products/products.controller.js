'use strict';

angular.module('stackStoreApp')
  .controller('ProductsCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.products = [
    {name: 'Time Machine', price: 100000, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Watch', price: 10, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Clock', price: 5, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Alarm Clock', price: 3, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Black Hole', price: 50, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Paradox', price: 46, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Time Itself', price: 78, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Wormhole', price: 2, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Tardis', price: 50000, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Time Warp', price:19, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Time Warp', price:19, description: {blurb: "A time machine", full:"More than the last"} },
    {name: 'Time Warp', price:19, description: {blurb: "A time machine", full:"More than the last"} }
    ];
  });
