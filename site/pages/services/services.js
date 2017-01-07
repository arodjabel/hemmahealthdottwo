'use strict';

angular.module('hemma.services', [])
    .directive('services', [
        function () {
            return {
                bindToController: true,
                controllerAs: 'servicesCtrl',
                controller: ['$location', '$anchorScroll', 'servicesHotLinks', function ($location, $anchorScroll, servicesHotLinks) {
                    var servicesCtrl = this;

                    servicesCtrl.hash = undefined;
                    servicesCtrl.openSubPage = function (page) {
                        console.log(page);
                        $location.path(page);
                    };

                    servicesCtrl.goToTag = function (hash) {
                        if (servicesCtrl.hash !== hash) {
                            $anchorScroll(hash);
                        }
                        servicesCtrl.hash = hash;
                    };

                    servicesCtrl.servicesHotLinks = servicesHotLinks;
                }],
              templateUrl: 'pages/services/services.html'
            };
        }])
    .constant('servicesHotLinks', [
        {
            label: 'SuperUser',
            id: 'eCWSuperUser',
            icon: 'fa-user-md'
        }, {
            label: 'Trainer',
            id: 'eCWSuperUser',
            icon: 'fa-users'
        }, {
            label: 'Billing',
            id: 'billing',
            icon: 'fa-money'
        },
        // {
        //     label: 'Statements',
        //     id: 'custom',
        //     icon: 'fa-file-text-o'
        // },
        {
            label: 'Mailers',
            id: 'custom',
            icon: 'fa-envelope-open-o'
        },
        // {
        //     label: 'Letters',
        //     id: 'custom',
        //     icon: 'fa-pencil-square-o'
        // },
        {
            label: 'HIPAA',
            id: 'hipaa',
            icon: 'fa-address-card'
        }, {
            label: 'PCMH',
            id: 'pcmh',
            icon: 'fa-home'
        }, {
            label: 'Dental',
            id: 'dental',
            icon: 'fa-desktop'
        }, {
            label: 'Revenue Cycle',
            id: 'revenue',
            icon: 'fa-usd'
        }, {
            label: "top",
            id: 'top',
            icon: 'fa-arrow-up'
        }
    ]);