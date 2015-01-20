'use strict';

angular.module('stackStoreApp')
  .controller('ReviewCtrl', function ($scope, Auth, User) {
  	Auth.getPopulatedUser().$promise.then(function(user) {
        $scope.reviews = user.reviews;
    }); // sometimes async problems.  works 95% of the time

    $scope.maxStars = [1,2,3,4,5];
  });
