'use strict';

angular.module('stackStoreApp')
  .factory('Category', function ($resource) {
    var Category = $resource('/api/categories/:id', { id: '@_id'});

    return Category;
  });
