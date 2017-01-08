'use strict';

angular.module('hemma.home', [])
    .controller('hemmaCtrl', ['$scope', '$location',
      function ($scope, $location) {
        $scope.goToPage = function (page) {
          $location.path(page);
        };
      }
    ]);
