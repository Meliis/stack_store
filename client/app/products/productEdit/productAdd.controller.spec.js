'use strict';

describe('Controller: ProductAddCtrl', function () {

  // load the controller's module
  beforeEach(module('stackStoreApp'));

  var ProductAddCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductAddCtrl = $controller('ProductAddCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
