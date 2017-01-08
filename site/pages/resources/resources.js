'use strict'

angular.module('hemma.resources', [])
    .directive('resources', ['resources.documents', 'resources.onlineSources', 'resources.videos',
      function (documents, onlineSources, videos) {
        return {
          bindToController: true,
          controllerAs: 'res',
          controller: ['$scope', '$compile',
            function ($scope, $compile) {
              var res = this;
              res.documents = documents;
              res.onlineSources = onlineSources;
              res.videos = videos;
              res.compile = function (string) {
                return $compile(angular.element(string))($scope);
              };

            }
          ],
          templateUrl: 'pages/resources/resources.html'
        };
      }
    ])
    .directive('embeddedVideo', ['$compile', '$timeout',
      function ($compile, $timeout) {
        return {
          link: function (scope, element, attrs) {
            $timeout(function () {
              element.html(scope.embeddedVideo);
              $compile(element.contents())(scope);
            }, 0);
          },
          scope: {
            embeddedVideo: '='
          }
        }
      }
    ])
    .constant('resources.documents', [
      {
        title: 'Dental Merge Tool Help',
        absUrl: 'https://s3-us-west-2.amazonaws.com/hemmahealth-content/content/dentalMergeToolHelp_20161001.pdf'
      }
    ])
    .constant('resources.onlineSources', [
      {
        title: 'eCW Users',
        absUrl: 'http://ecwusers.com/',
        prettyUrl: 'http://ecwusers.com/'
      },
      {
        title: 'The Block & Biggs eClinicalWorks Roadshow',
        absUrl: 'http://blockandnation.com/blockandbiggs/',
        prettyUrl: 'http://blockandnation.com/blockandbiggs/'
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
