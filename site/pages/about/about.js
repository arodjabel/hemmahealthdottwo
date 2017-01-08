'use strict';

angular.module('hemma.about', [])
.directive('aboutUs', [function(){
    return {
      templateUrl: 'pages/about/about.html'
    }
}])