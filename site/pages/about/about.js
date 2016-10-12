'use strict';

angular.module('hemma.about', [])
.directive('aboutUs', [function(){
    return {
        templateUrl: './site/pages/about/about.html'
    }
}])