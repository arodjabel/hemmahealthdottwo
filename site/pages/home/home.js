'use strict';

angular.module('hemma.home', [])
.controller('hemmaCtrl', ['$rootScope', '$scope', '$location','$anchorScroll', 
	function($rootScope, $scope, $location, $anchorScroll){
		var hemmaCtrl = this, 
			changePage,
			event_updateSidebarContent;

        $scope.goToPage = function(page){
			$location.path(page);
		};
	}
]);