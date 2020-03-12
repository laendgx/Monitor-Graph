(function(angular) {

	var directives = angular.module('app.directives', []);

	directives
	.directive('configuration', ['$timeout', function($timeout){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/eagle.from',
			replace: true,
			link: function(scope, element, attrs){
				element.css({
					width: $(window).width() - 40,
					height: $(window).height() - 40
				})
				$timeout(function(){
					scope.moveNeagle(element);
				}, 100);
			}
		};
	}])

	.directive('compile', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cmsCompile.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('list', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cmsList.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('cmsTpl', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cfgCmsTpl.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('multiTxta', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/multiTextarea.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('edit', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cfgCmsEdit.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('editTpl', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cmsEditTpl.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})

	.directive('inputs', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				var inputs = element.find('input');
				for(var i = 0, l = inputs.length; i < l; i++){
					var next = inputs.eq(i).next();
					inputs.eq(i).css({
						'top': next[0].offsetTop,
						'left': next[0].offsetLeft
					});
				}
			}
		};
	})

	.directive('cmstextarea', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind('change', function(){
					var val = element.val().replace(/\n+/g,'\n');
					var l = val.split('\n').length,
						t = val.lastIndexOf('\n');
					element.attr('enterrow', l);
					element.attr('enterposi', t);
				});
			}
		};
	})

	.directive('tablelist', ['$timeout', function($timeout){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				$timeout(function(){
					customFunc();
				}, 1000);
			}
		};
	}])

	.directive('model', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/cmsModel.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('editclick', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind('click', function(){
					element.parent().find('p').css('background-color', '');
					element.css('background-color', 'rgb(0, 105, 203)');
				});
			}
		};
	})

	.directive('cmstextarea', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind('change', function(){
					var val = element.val().replace(/\n+/g,'\n');
					var l = val.split('\n').length,
						t = val.lastIndexOf('\n');
					element.attr('enterrow', l);
					element.attr('enterposi', t);
				});
			}
		};
	})
	
	.directive('tip', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind({
					'mouseover': function(){
						element.parents('*[tips]').prev().attr('stop', 'true');
					},
					'mouseleave': function(){
						element.parents('*[tips]').prev().attr('stop', 'false');
					},
					'click': function(){
						var n = element.attr('tip'),
							nCount = element.parents('*[tips]').prev().attr('count'),
							cpps = element.parents('*[tips]').prev().find('*[cpp]'),
							tips = element.parent().find('*[tip]'),
							pro = cpps.eq(nCount);
						pro.animate({'right': '100%'}, 240, 'swing', function(){
	                        pro.css('right', '');
	                    });
						if(tips.eq(nCount).attr('type') === 'edit'){
							tips.eq(nCount).css('background-color', '');
							tips.eq(n).css('background-color', '#0069cb');
						}
						if(tips.eq(nCount).attr('type') === 'polling'){
							tips.eq(nCount).animate({'width': '8px'}, 200, 'swing');
							tips.eq(n).animate({'width': '16px'}, 200, 'swing');
						}
                    	cpps.eq(n).animate({'right': '0'}, 240, 'swing');
						element.parents('*[tips]').prev().attr('count', n);
					}
				});
			}
		};
	})

	.directive('cmsposi', ['$timeout', function($timeout){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				$timeout(function(){
					element.addClass('composi-animate');
					element.children('img').css({
						'transform': 'matrix(.5,0,0,.5,' + element.width() / -4 + ',' + element.height() / -4 + ')'
					});
					element.css({
						width: element.width() / 2,
						height: element.height() / 2
					});
				}, 300);
				element.bind({
					'mousedown': function(event){
						if(!scope.cmsPosition){
							return;
						}
						event.stopPropagation();
						var disX = event.clientX - element.position().left;
				        var disY = event.clientY - element.position().top;

				        $(document).bind({
				            'mousemove': moveMousemove,
				            'mouseup': moveMouseup
				        });

				        function moveMousemove(event){
				            var l = event.clientX - disX;
				            var t = event.clientY - disY;
				            element.css({
				                'left': l + 'px',
				                'top': t + 'px'
				            });
				        }

				        function moveMouseup(){
				            $(document).unbind({
				                'mousemove': moveMousemove,
				                'mouseup': moveMouseup
				            });
				        }
					},
					'dragstart': function(){
						return false;
					}
				});
			}
		};
	}])

})(angular);