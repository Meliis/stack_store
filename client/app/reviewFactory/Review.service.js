'use strict';

angular.module('stackStoreApp')
  .factory('Review', function ($resource) {
      var Review = $resource('/api/reviews/:id', {id: '@_id'});
      return Review;
    });
