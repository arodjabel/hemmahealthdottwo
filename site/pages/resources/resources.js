'use strict'

angular.module('hemma.resources', [])
.directive('resources', ['resources.onlineSources', 'resources.videos',
    function(onlineSources, videos){
        return {
            bindToController: true,
            controllerAs: 'res',
            controller: [function(){
                var res = this;
                res.onlineSources = onlineSources;
                res.videos = videos;
            }],
            templateUrl: './site/pages/resources/resources.html'
        }
    }
])
.constant('resources.onlineSources', [
    {
        title: 'google',
        absUrl: 'http://google.com',
        prettyUrl: 'google.com'
    },
    {
        title: 'link 2',
        absUrl: 'http://cnn.com',
        prettyUrl: 'cnn.com'
    }
])
.constant('resources.videos', [
    {
        title: 'youtube',
        absUrl: 'http://youtube.com',
        prettyUrl: 'youtube.com'
    }
])