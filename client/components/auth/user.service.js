'use strict';

angular.module('stackStoreApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      adminChangePassword: {
        method: 'PUT',
        params: {
          controller: 'adminChangePassword'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      adminUpdate: {
        method: 'PUT',
        params: {
          controller: 'adminUpdate'
        }
      },
      update: {
        method: 'PUT'
      }
	  });
  });
