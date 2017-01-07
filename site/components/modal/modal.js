'use strict'

angular.module('common.modal', [])
.directive('commonModal', [
	function(){
		return {
			bindToController: true,
			controllerAs: 'modalCtrl',
			controller: ['$scope', function($scope){
				var modalCtrl = this;

				function commonModalChange(event, payload){
					if(payload.title){
						modalCtrl.title = payload.title;
					}
					if(payload.body){
						modalCtrl.body = payload.body;
					}
					modalCtrl.showModal = true;
				}

				modalCtrl.showModal = false;

				// $scope.$watch('modalCtrl.commonModal', commonModalChange, true);

				$scope.$on('modalHasBeenUpdated', commonModalChange)

			}],
          templateUrl: 'components/modal/modal.html',
			scope: {
				commonModal: '='
			}
		}

	}
])