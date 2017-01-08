'use strict';

angular.module('hemma.uber', [])
    .directive('uberIntegration', ['$timeout', 'hemma.uber.getMockData', function ($timeout, getMockData) {
      return {
        bindToController: true,
        controllerAs: 'uberCtrl',
        controller: ['$scope', function ($scope) {
          var _this = this,
              uberCtrl = this,
              data;

          data = getMockData;
          $scope.model = {};

          function fillForm() {
            console.log('something is happening', data);
            $scope.model.firstName = data.name[0].given[0];
            $scope.model.lastName = data.name[0].family[0];
            $scope.model.street = data.address[0].line[0];
            $scope.model.city = data.address[0].city;
            $scope.model.state = data.address[0].state;
            $scope.model.zip = data.address[0].postalCode;
          }

          $timeout(fillForm, 3000);

          //    first name, last name, pick up address, arrival time
        }],
        templateUrl: 'uber_integration/uber_integration.html'
      };
    }]).factory('hemma.uber.getMockData', [function () {
  return {
    "resourceType": "Patient",
    "id": "1032702",
    "meta": {
      "versionId": "1",
      "lastUpdated": "2016-03-09T15:29:48.648+00:00"
    },
    "text": {
      "status": "generated",
      "div": "<div>\n        \n            <p>Amy Shaw</p>\n      \n          </div>"
    },
    "identifier": [
      {
        "use": "usual",
        "type": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v2/0203",
              "code": "MR",
              "display": "Medical record number"
            }
          ],
          "text": "Medical record number"
        },
        "system": "http://hospital.smarthealthit.org",
        "value": "1032702"
      }
    ],
    "active": true,
    "name": [
      {
        "use": "official",
        "family": [
          "Shaw"
        ],
        "given": [
          "Amy",
          "V."
        ]
      }
    ],
    "telecom": [
      {
        "system": "phone",
        "value": "800-782-6765",
        "use": "mobile"
      },
      {
        "system": "email",
        "value": "amy.shaw@example.com"
      }
    ],
    "gender": "female",
    "birthDate": "2007-03-20",
    "address": [
      {
        "use": "home",
        "line": [
          "49 Meadow St"
        ],
        "city": "Mounds",
        "state": "OK",
        "postalCode": "74047",
        "country": "USA"
      }
    ]
  }
}]);