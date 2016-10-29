'use strict';

angular.module('hemma.services', [])
    .directive('services', [
        function () {
            return {
                bindToController: true,
                controllerAs: 'servicesCtrl',
                controller: ['$location', '$anchorScroll', function ($location, $anchorScroll) {
                    var servicesCtrl = this;

                    servicesCtrl.openSubPage = function (page) {
                        console.log(page);
                        $location.path(page);
                    };

                    servicesCtrl.goToTag = function (hash) {
                        if ($location.hash() !== hash) {
                            // set the $location.hash to `newHash` and
                            // $anchorScroll will automatically scroll to it
                            $anchorScroll(hash);
                            // $location.hash(hash);
                        } else {
                            // call $anchorScroll() explicitly,
                            // since $location.hash hasn't changed
                            $anchorScroll();
                        }
                    };
                }],
                templateUrl: './site/pages/services/services.html'
            };
        }]);