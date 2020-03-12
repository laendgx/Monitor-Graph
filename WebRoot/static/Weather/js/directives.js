(function(angular) {

	var directives = angular.module('app.wdirectives', []);

	directives
	.directive('wTables', function(){
		return {
			restrict: 'A',
			templateUrl: basepath + '/static/Weather/template/wTables.html',
			replace: true,
			scope: {
				data: '='
			},
			link: function(scope, element, attrs){
				element.css({
					height: $(window).height() - 42 - $('.sw-header').outerHeight(true) - $('.con-head').outerHeight(true)
				});
				customFunc();
			}
		};
	})

	.directive('wCharts', function($interval, $timeout){
		return {
			restrict: 'A',
			templateUrl: basepath + '/static/Weather/template/wCharts.html',
			replace: true,
			scope: {
				data: '=',
				fn: '&'
			},
			link: function(scope, element, attrs){
				element.css({
					height: $(window).height() - 42 - $('.sw-header').outerHeight(true) - $('.con-head').outerHeight(true)
				});
				$timeout(function(){
					var timer = $interval(function(){
						if(scope.data && !$.isEmptyObject(scope.data)){
							
								var _data = scope.data;
								for(var i = 0, l = _data.length; i < l; i++){
									scope.fn({id:_data[i].chartid, data:_data[i].chart});
								}
								customFunc();
								$interval.cancel(timer);
							
						}
					},100,40);
				},100);
			}
		};
	})

})(angular);