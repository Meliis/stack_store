'use strict';

angular.module('stackStoreApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })
  
  .run(function ($http, productFactory) {
    $http.get('/api/products')
        .then(function(result) {
          productFactory.setInitial(result.data);
        });
  })

  .run(function (User, orderFactory, Auth) {
    if (Auth.isLoggedIn()) {
      // do some stuff
    }
    else {
      // Look up session ID stuff for browser
      var order = new orderFactory;
      order.$save();
    }
  });


// Check if logged in
  // If logged in, display incomplete order in cart
// If not logged in 
  // Create new user
  // Create new order, using userID
  // Add order to new user's 'orders'





















  ;
