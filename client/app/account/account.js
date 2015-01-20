'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/profile', {
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .when('/profile/reviews', {
        templateUrl: 'app/account/profile/reviews/reviews.html',
        controller: 'ReviewCtrl',
        authenticate: true
      })
  });