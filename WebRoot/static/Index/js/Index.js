$(function(){
	sizeIframe();
});
$(window).resize(function(){
	sizeIframe();
})
var sizeIframe = function (){
//	console.log($(window).width());
//	console.log(screen.width);
	var iframeWidth = ($(window).width()-90)+"px";
	var iframeHeight = ($(window).height()-72)+"px";
	$(".iframe").css({"width":iframeWidth,"height":iframeHeight});
	
};
