'use strict';

describe('Controller: ProductEditCtrl', function () {

  // load the controller's module
  beforeEach(module('stackStoreApp'));

  var ProductEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductEditCtrl = $controller('ProductEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
