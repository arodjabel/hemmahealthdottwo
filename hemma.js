'use strict'
angular.module('app', [
    'ngRoute',
    'hemma.navbar',
    'hemma.home',
    'hemma.contact',
    'hemma.services',
    'hemma.footer',
    'common.modal',
    'hemma.resources'
])
.config(['$routeProvider',
    function ($routeProvider) {
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
            class: ''
        })
        .when('/resources', {
            template: '<div resources></div>',
            class: 'resources-image'
        })
        .otherwise({
            redirectTo: '/home'
        });
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

