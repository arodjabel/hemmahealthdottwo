'use strict';
angular.module('hemma.footer', [])
    .directive('footer', ['$rootScope',
      function ($rootScope) {
        return {
          controllerAs: 'footerCtrl',
          controller: [function () {
            var footerCtrl = this;

            footerCtrl.togglePage = function (page) {
              $rootScope.$broadcast('togglePage', page);
            };

          }],
          templateUrl: 'components/footer/footer.html'
        };
      }
    ]);
