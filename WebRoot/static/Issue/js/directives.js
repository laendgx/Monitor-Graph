(function(angular) {

	var directives = angular.module('app.directives', []);

	directives
	.directive('issue', function(){
		return {
			restrict: 'A', 
			templateUrl: basepath + '/cms/issue.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('issue', function(){
		return {
			restrict: 'A', 
			templateUrl: basepath + '/cms/issue.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
})(angular);