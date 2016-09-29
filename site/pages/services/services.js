'use strict'

angular.module('hemma.services',[])
.directive('services', [
	function (){
		return {
			bindToController: true,
			controllerAs: 'servicesCtrl',
			controller: [function(){
				var servicesCtrl = this;
			}],
			templateUrl: './site/pages/services/services.html'
		}
	}]);