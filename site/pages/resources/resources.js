'use strict'

angular.module('hemma.resources', [])
.directive('resources', ['resources.onlineSources', 'resources.videos',
    function(onlineSources, videos){
        return {
            bindToController: true,
            controllerAs: 'res',
            controller: ['$scope', '$compile',
                function($scope, $compile){
                    var res = this;
                    res.onlineSources = onlineSources;
                    res.videos = videos;
                    res.compile = function(string){
                        return $compile(angular.element(string))($scope);
                    }
                }
            ],
            templateUrl: './site/pages/resources/resources.html'
        }
    }
])
.directive('embeddedVideo', ['$compile', '$timeout',
    function($compile, $timeout){
        return{
            link: function (scope, element, attrs) {
                $timeout(function(){
                    element.html(scope.embeddedVideo);
                    $compile(element.contents())(scope);
                }, 0);
            },
            scope:{
                embeddedVideo:'='
            }
        }
    }
])
.constant('resources.onlineSources', [
    {
        title: 'eCW Users',
        absUrl: 'ecwusers.com',
        prettyUrl: 'ecwusers.com'
    }
])
.constant('resources.videos', [
    {
        title: 'How to use Case Manager in eClinicalWorks',
        absUrl: 'https://www.youtube.com/watch?v=EfYjtntvD_o',
        prettyUrl: 'youtube.com',
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EfYjtntvD_o" frameborder="0" allowfullscreen></iframe>'
    }
]);