'use strict';

angular.module('stackStoreApp')
  .controller('ProfileCtrl', function ($scope, $http, User, Auth) {
	$scope.user = Auth.getCurrentUser();
	
	// $http.get('/api/users/me').success(function(user) {
	// 	$scope.user = user;
	// });

  });
