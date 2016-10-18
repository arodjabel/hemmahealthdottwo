'use strict'

angular.module('hemma.services',[])
.directive('services', [
	function (){
		return {
			bindToController: true,
			controllerAs: 'servicesCtrl',
			controller: ['$location', function($location){
				var servicesCtrl = this;

				servicesCtrl.openSubPage = function(page){
					console.log(page);
                    $location.path(page);
				}
			}],
			templateUrl: './site/pages/services/services.html'
		}
	}]);