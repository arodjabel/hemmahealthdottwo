describe('Users factory', function () {
  it('has a dummy spec to test 2 + 2', function () {
    expect(2 + 2).toEqual(4);
  });
});

describe('Users factory', function () {
  (function () {
    'use strict';
    console.log('hello');


    // Creating the module and factory we referenced in the beforeEach blocks in our test file
    angular.module('api.users', [])
        .factory('Users', function () {
          var Users = {};

          // Users.method = function() {};

          return Users;
        });
  })();
  var Users;

  // Before each test load our api.users module
  beforeEach(angular.mock.module("api.users"));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function (_Users_) {
    Users = _Users_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function () {
    expect(Users).toBeDefined();
  });
});