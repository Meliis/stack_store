'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope) {
    $scope.product = {name: 'Time Machine', 
    				  price: 100000, 
    				  description: {blurb: "A time machine", full:"More than the last"},
    				  quantity: 4,
    				  reviews: [{title: "I hate this thing", body: 'Here are the reasons why I hate this thing', stars: 2}, 
    				  			{title: 'I love this thing', body: 'Here are the reasons why I love this thing', stars: 5}] };
    $scope.maxStars = [1,2,3,4,5];

  });
