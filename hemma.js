'use strict'
angular.module('app', [
    'ngRoute',
    'hemma.navbar',
    'hemma.home',
    'hemma.contact',
    'hemma.services',
    'hemma.footer',
    'common.modal',
    'hemma.resources',
    'hemma.about',
    'hemma.lobReports'
])
.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            controller: 'hemmaCtrl',
            templateUrl: './site/pages/home/home.html',
            class: 'home-image'
        })
        .when('/contact-us', {
            template: '<div contact-us></div>',
            class: 'contact-form-image'
        })
        .when('/services', {
            template: '<div services></div>',
            class: 'services-background'
        })
        .when('/resources', {
            template: '<div resources></div>',
            class: 'resources-image'
        })
        .when('/about-us', {
            template: '<div about-us></div>',
            class: 'about-us'
        })
        .when('/lob-reports', {
            template: '<div lob-reports></div>',
            class: 'lob-reports'
        })
        .otherwise({
            redirectTo: '/home'
        });
        $locationProvider.html5Mode(true);
    }])
    .directive('classRoute', function($rootScope, $route) {

        return function(scope, elem, attr) {
            var previous = '';
            $rootScope.$on('$routeChangeSuccess', function(event, currentRoute) {
                var route = currentRoute.$$route;
                if(route) {

                    var cls = route['class'];

                    if(previous) {
                        attr.$removeClass(previous);
                    }

                    if(cls) {
                        previous = cls;
                        attr.$addClass(cls);
                    }
                }
            });
        };
    });

