'use strict';

angular.module('stackStoreApp')
  .factory('Category', function ($resource) {
    
    var Categories = $resource('/api/category/:_', { id: '@_id'}, {
      search: {
        url: '/api/category/query/:name',
        isArray: true,
        method: 'GET'
      }
    });

    return Categories;
  });
