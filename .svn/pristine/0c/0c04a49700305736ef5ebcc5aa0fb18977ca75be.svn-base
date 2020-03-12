(function(angular) {

	var filters = angular.module('app.filters', []);

	filters
	// 过滤器：文字信息特殊字符处理,由于jsp页面中使用了'ng-bind-html'，需要引入 $sce 使Angular相信 用于显示的内容 是安全的
	.filter('textCheck', function ($sce) {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
	    	var _val = val.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\n/g,"<\/br>").replace(/ /g,"&nbsp;");
		  	return $sce.trustAsHtml(_val);
	    };
	})

	.filter('trustHtml', function ($sce) {
	     return function (input) {
	        return $sce.trustAsHtml(input);
	     }
	})
})(angular);