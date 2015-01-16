'use strict';

angular.module('stackStoreApp')
  .factory('categoryService', function ($resource) {
    var Category = $resource('/api/categories/:id', { id: '@_id'});

    return Category;
  });
