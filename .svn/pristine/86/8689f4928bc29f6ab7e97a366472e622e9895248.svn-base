(function(angular) {

	var directives = angular.module('app.directives', []);

	directives
	.directive('swTitle', function(){
		return {
			restrict: 'A', 
			templateUrl: basepath + '/static/Stations/template/swHeader.html',
			replace: true,
			scope: {
				data: '@'
			}
		};
	})

	.directive('filtrate', function(){
		return {
			restrict: 'A', 
			templateUrl: basepath + '/static/Stations/template/swNav.html',
			replace: true,
			scope: {
				data: '='
			},
			link: function(scope, element, attrs){
				element.css({
					height: $(window).height() - 42 - $('.sw-header').outerHeight(true)
				});
				customFunc();
			}
		};
	})

	.directive('contentHead', function(){
		return {
			restrict: 'A',
			templateUrl: basepath + '/static/Stations/template/contentHead.html',
			replace: true,
			scope: {
				fn: '&'
			}
		};
	})

	.directive('tables', function(){
		return {
			restrict: 'A',
			templateUrl: basepath + '/static/Stations/template/swTables.html',
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

	.directive('charts', function($interval, $timeout){
		return {
			restrict: 'A',
			templateUrl: basepath + '/static/Stations/template/swCharts.html',
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

	.directive('pageWrap', function(){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				element.css({
					width: $(window).width() - 40,
					height: $(window).height() - 40
				});
				customFunc();
			}
		};
	})

	.directive('sectionsWrap', function($interval){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				var timer = $interval(function(){
					if($('.sw-nav').outerWidth(true) && $('.sw-nav').outerWidth(true) > 25 &&
					   $('.sw-header').outerHeight(true) && $('.sw-header').outerHeight(true) > 25){
						element.css({
							width: $(window).width() - 42 - $('.sw-nav').outerWidth(true),
							height: $(window).height() - 42 - $('.sw-header').outerHeight(true)
						});
						customFunc();
						$interval.cancel(timer);
					}
				},100,40);
			}
		};
	})

	.directive('chartsWrap', function($interval){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				var timer = $interval(function(){
					if($('.sw-nav').outerWidth(true) && $('.sw-nav').outerWidth(true) > 25){
						element.css({
							width: ($(window).width() - 42 - $('.sw-nav').outerWidth(true) - 16 * 4) / 3
						});
						customFunc();
						$interval.cancel(timer);
					}
				},100,40);
			}
		};
	})
	
})(angular);