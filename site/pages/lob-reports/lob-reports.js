'use strict'

angular.module('hemma.lobReports', [])
    .directive('lobReports', [
      function () {
        return {
          bindToController: true,
          controllerAs: 'lobCtrl',
          controller: [function () {
            var lobCtrl = this;

            lobCtrl.openFullExample = function (imgName) {
              lobCtrl.showOverlay = true;
              lobCtrl.image = imgName;
            }

            lobCtrl.closeOverlay = function () {
              lobCtrl.showOverlay = false;
            }

          }],
          templateUrl: 'pages/lob-reports/lob-reports.html'
        }
      }]);