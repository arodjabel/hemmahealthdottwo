'use strict'

angular.module('hemma.navbar', [])
.directive('navbar', ['$rootScope', '$window', '$location', 'nav.menuItems',
	function($rootScope, $window, $location, menuItems){
		return {
			templateUrl: './site/components/navbar/navbar.html',
			controllerAs: 'navbar',
			controller: ['$scope', '$window', '$route', '$templateCache',
				function($scope, $window, $route, $templateCache){
					var navbar = this,
						event_updateSidebarContent;

					$scope.hideFixed = false;
					navbar.sidebarActive = false;

                    navbar.menuItems = menuItems;

                    navbar.navMenuClick = function(whatGotClicked){
						navbar.selectedTab = whatGotClicked;
					};

					navbar.toggleSidebar = function(){
						if(!navbar.sidebarActive){
							navbar.sidebarActive = true; 
						} else{
							navbar.sidebarActive = false; 
						}
					}

					navbar.changePage = function (page){
						$location.path('/' + page);
						if(navbar.sidebarActive){
							navbar.sidebarActive = false;
						} 

						if(page === 'contact-us'){
							// force reload template
							var currentPageTemplate = $route.current.templateUrl;
							$templateCache.remove(currentPageTemplate);
							$route.reload()
						}
					}

					navbar.ngViewClick = function(event, b, c){
						navbar.sidebarActive = false;
					}

					event_updateSidebarContent = function(event, payload) {
						navbar.sidebarContent = {'top': (payload) + 'px'};
					};

					$rootScope.$on('updateSidebarContent', event_updateSidebarContent);

					angular.element($window).bind("scroll", function() {
						$rootScope.$emit('updateSidebarContent', this.pageYOffset);
						if (this.pageYOffset >= 55) {
							$scope.hideFixed = true;
						} else {
							$scope.hideFixed = false;
						}
						$scope.$apply();
					});

                    angular.element($window).bind("resize", function(){
                        if (navbar.sidebarActive){
                            navbar.sidebarActive = false;
                            $scope.$apply();
                        }
                    })
				}
			],
		}
	}
])
.constant('nav.menuItems', [
	// {
	// 	label:'Hemma Health',
	// 	value:'home',
	// 	image: 'fa-home'
	// },
    {
        label:'What We Do',
        value:'services',
        image: 'fa-medkit'
    },{
    	label:'Resources',
		value:'resources',
		image: 'fa-book'
	},{
		label:'Get In Touch',
		value:'contact-us',
		image: 'fa-envelope-o'
	}
])