'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function ($scope, $http, productFactory) {
    $scope.products = productFactory.getAll();

    $scope.search = function(query) {
      console.log(productFactory.search(query));
    }

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
