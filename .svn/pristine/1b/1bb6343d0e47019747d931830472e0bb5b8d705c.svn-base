(function(angular) {

	var directives = angular.module('app.directives', []);

	directives
	.directive('tBrowse', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/tbrowse.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('tEdit', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/tedit.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('cmsTpl', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cmsTpl.from',
			replace: true,
			scope: {
				cplist: '=',
				bcmsstyle: '='
			},
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('cmsEdit', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cmsEdit.from',
			replace: true,
			scope: {
				cmstext: '@',
				cmswidth: '@',
				cmsheight: '@',
				cmsfontfamily: '@',
				cmsfontcolor: '@',
				cmsicons: '=',
				cmsstyle: '='
			},
			link: function(scope, element, attrs){
				
			}
		};
	})

})(angular);