'use strict';

angular.module('stackStoreApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, CartFactory) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.cart;
    $scope.cartSize = 0;
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    var setCartSize = function() {
      if (Auth.isLoggedIn()) {
        // retrieve user's cart
      } else {
        CartFactory.get({id: localStorage.cartId}, function(cart) {
          $scope.cart = cart;
          $scope.cartSize = cart.lineItems.length;
        });
      }
    };

    setCartSize();


    $scope.goToCart = function() {

    };

  });