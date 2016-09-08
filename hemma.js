'use strict'
angular.module('app',[
	'ngRoute',
	'hemma.navbar',
	'hemma.home',
  'hemma.contact',
  'hemma.services',
  'hemma.footer',
  'common.modal'
])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        controller: 'hemmaCtrl',
        templateUrl: './site/pages/home/home.html'
      })
      .when('/contact-us', {
        template: '<div contact-us></div>',
      })
      .when('/services', {
        template: '<div services></div>'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }])
