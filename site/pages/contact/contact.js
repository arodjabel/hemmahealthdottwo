'use strict'

angular.module('hemma.contact', [])
.directive('contactUs', ['$rootScope', '$http',
	function($rootScope, $http){
		return {
			controllerAs: 'contactCtrl',
			templateUrl: './site/pages/contact/contact.html',
			controller: ['$scope', function($scope){
				var contactCtrl = this,
					defaultForm = {};

				$scope.cForm = angular.copy(defaultForm);
				contactCtrl.cForm = defaultForm;
				contactCtrl.modalConfig = {};
				contactCtrl.showForm = true;
				

				function toggleHideSubmitButton(status){
					var elem = document.querySelectorAll('.submit-button');

					if (status === 'show'){
						angular.element(elem).attr('disabled', false);
					}

					if(status === 'hide'){
						angular.element(elem).attr('disabled', true);
					}
				}

				function successCallback(response){
					// say thank you for submission
					// clear form
					// reset recaptcha
					contactCtrl.messageConfig = {
						'title': 'We got your message!',
						'body': 'Thank you so much for contacting us. We will be in touch very soon.'
					};

					contactCtrl.showForm = false;
					grecaptcha.reset();
					contactCtrl.cForm = {};
					$scope.contactForm.$setPristine(true);

				}

				function errorCallback(error){
					// say sorry that there was an issue
					// reset recaptcha
					// offer an email address for issues 
					grecaptcha.reset();
					contactCtrl.messageConfig = {
						'title': 'Sorry, something went wrong.',
						'body': 'Please try again later'
					};
				}

				contactCtrl.sendTheForm = function(){
					contactCtrl.cForm.recaptcha = grecaptcha.getResponse();

					if (!contactCtrl.cForm.recaptcha){
						toggleHideSubmitButton('hide');
						return
					}

					$http.post('./server/contact-us', contactCtrl.cForm).then(successCallback, errorCallback);
				}

				contactCtrl.recaptchaCallback = function(event, payload){
					if (payload === 'load'){
						toggleHideSubmitButton('show');
					}
					if (payload === 'reset'){
						toggleHideSubmitButton('hide');
					}
				}	

				$scope.$on('recaptchaCallback', contactCtrl.recaptchaCallback);

				contactCtrl.initCallback = function(){
					toggleHideSubmitButton('show')
				}

				if(typeof grecaptcha !== 'undefined'){
					grecaptcha.render('contact-recaptcha', {
			          'sitekey' : '6Lc2CBsTAAAAAKwvAUIOuugFmCXYqZg5VLlEDWQ9',
			          'callback' : contactCtrl.initCallback,
			          'theme' : 'dark'
			        });
				}
			}]
		}
	}
])
.factory('recaptcha', ['$rootScope', function($rootScope){
	return{
		callback: function(status){
			$rootScope.$broadcast('recaptchaCallback', status)
		}
	}
}])