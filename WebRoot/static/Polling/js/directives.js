(function(angular) {

	var directives = angular.module('app.directives', []);

	directives
	.directive('polFrame', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/pollingFrame.from',
			replace: true,
			link: function(scope, element, attrs){
				element.css({
					width: $(window).width() - 40,
					height: $(window).height() - 40
				});
			}
		};
	})

	.directive('polAside', function(){
		return {
			restrict: 'EA', 
			templateUrl: basepath + '/cms/pollingAside.from',
			replace: true,
			link: function(scope, element, attrs){
				element.css({
					height: $(window).height() - 40 - 42
				});
				customFunc();
			}
		};
	})

	.directive('pollist', function($timeout, $interval){
		return {
			link: function(scope, element, attrs){
				element.css('opacity', 0);
				var asideWid = 0;
				var timer = $interval(function(){
					if($('polaside').outerWidth(true) && $('polaside').outerWidth(true) != 0){
						asideWid = $('polaside').outerWidth(true);
						element.css({
							width: $('polling').outerWidth(true) - asideWid - 2 * (parseInt($('polling').css('margin-left')) + 1),
							height: $(window).height() - 40 - 42,
							'opacity': 1
						});
					}
					$interval.cancel(timer);
				},100,50);
			}
		};
	})
	
	.directive('cmslist', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				element.css('opacity', 0);
				$timeout(function(){
					element.css({
						width: $('polling').outerWidth(true) - $('polaside').outerWidth(true) - 2 * (parseInt($('polling').css('margin-left')) + 1),
						height: $(window).height() - 40 - 42 - $('pollist > header').height(),
						'opacity': 1
					});
					customFunc();
				},0);
			}
		};
	})

	.directive('editinputs', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.parent().find('p').css('background-color', '');
				element.css('background-color', 'rgb(0,105,203)');
			}
		};
	})
	
	.directive('listArea', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/polArea.from',
			replace: true
		};
	})
	
	.directive('poDetails', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poDetails.from',
			replace: true
		};
	})
	
	.directive('setstop', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind({
					'mouseover': function(){
						element.attr('stop', 'true');
					},
					'mouseleave': function(){
						element.attr('stop', 'false');
					}
				});
			}
		};
	})
	
	.directive('eventstop', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind({
					'mouseover': function(event){
						event.stopPropagation()
					},
					'mouseleave': function(event){
						event.stopPropagation()
					}
				});
			}
		};
	})
	
	.directive('listheader', function($interval){
		return {
			link: function(scope, element, attrs){
				element.css('opacity', 0);
				var timer = $interval(function(){
					if($('pollist').outerWidth(true) && $('pollist').outerWidth(true) > 200){
						element.css({
							width: $('pollist').outerWidth(true) - 32,
							'opacity': 1
						});
						$interval.cancel(timer);
					}
				},100,20);
			}
		};
	})
	
	.directive('listarea', function($interval){
		return {
			link: function(scope, element, attrs){
				element.css('opacity', 0);
				var timer = $interval(function(){
					if($('pollist').outerWidth(true) && $('pollist').outerWidth(true) > 200){
						element.css({
							width: $('pollist').outerWidth(true) - 16,
							'opacity': 1
						});
						$interval.cancel(timer);
					}
				},1000,10);
			}
		};
	})
	
	.directive('devtpl', function($timeout, $interval){
		return {
			link: function(scope, element, attrs){
				element.css('opacity', 0);
				var timer = $interval(function(){
					if($('listarea').outerWidth(true) && $('listarea').outerWidth(true) > 200){
						var windowWidth = $(window).width(),
							count = 4;
						if(windowWidth <= 1736){
							count = 3;
						}
						element.css({
							width: ($('listarea').outerWidth(true) - 8 * 5) / count - 3,
							'opacity': 1
						});
						customFunc();
						$interval.cancel(timer);
					}
				},700,10);
			}
		};
	})
	
	.directive('poCompile', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poCompile.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('poEdit', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poEdit.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('editTpl', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poEditTpl.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('poTpl', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poTpl.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('poList', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poList.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('poModel', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poModel.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('poManage', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poManage.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('lastSend', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poLastSend.from',
			replace: true,
			link: function(scope, element, attrs){
				
			}
		};
	})
	
	.directive('modelEdit', function(){
		return {
			restrict: 'E', 
			templateUrl: basepath + '/cms/poModelEdit.from',
			replace: true,
			link: function(scope, element, attrs){
				element.css({
					'height': $(window).height() - 40 - 1 + 'px'
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
	
	.directive('compmodel', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				element.bind('click', function(){
					element.parent().find('div[compmodel]').css({
						'opacity': '',
						'z-index': ''
					});
					element.css({
						'opacity': 1,
						'z-index': 4
					});
				});
			}
		};
	})
	
	.directive('modviewcc', function(){
		return {
			restrict: 'A', 
			link: function(scope, element, attrs){
				var _td = element.parent(),
					view = element.parents('.mlistwrap').find('modelview'),
					_top = _td.position().top + 52 + 43;
				element.bind({
					'mouseover': function(){
						view.css({
							top: _top,
							opacity: 1
						})
					},
					'mouseout': function(){
						view.css({
							top: '',
							opacity: ''
						})
					}

				});
			}
		};
	})

})(angular);