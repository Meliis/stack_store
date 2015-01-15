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
      function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
      };

      function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1);
              if (c.indexOf(name) == 0) {
                console.log(c.substring(name.length,c.length));
                return c.substring(name.length,c.length);
              }
          }
          return "";
      };

    if (Auth.isLoggedIn()) {
      // do some stuff
    } else if (getCookie("currentCart")) {
      var curCart = getCookie("currentCart");
      console.log("our cart", curCart);
    }

    // else if (getCookie("currentUser")) {
    //   var currentUser = getCookie("currentUser");
    //   // orderFactory.findCart(currentUser);
    //   var cart = orderFactory.get({tempId: currentUser});
    //   console.log("this is the var cart:", cart.tempId);
    //   orderFactory.findCart(cart);
    //   // currentCart = cart;
    // }
    else {

      var newCart = new orderFactory();
      newCart.lineItems = [];

      console.log("this is new cart", newCart);  

      setCookie("currentCart", newCart, .0001);

      // setCookie("currentUser", Math.random(), .0001);
      // var user = getCookie("currentUser");

      // var order = new orderFactory();
      // console.log("this is the order:",order);
      // order.tempId = user;
      // order.$save();
    }
  });
// Check if logged in
  // If logged in, display incomplete order in cart
// If not logged in 
  // Create new user
  // Create new order, using userID
  // Add order to new user's 'orders'



















  ;
