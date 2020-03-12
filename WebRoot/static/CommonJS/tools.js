/**
 * 用于rem单位自适应浏览器窗口
 * 参数min为缩放最小值
 * 返回浏览器当前的缩放比例值
 * 作者：李云龙
 */
function windowResize(min){
	var winWidth = $(window).width(),
		winsWidth = 1920,
		// winsWidth = window.screen.width,
		nRezise = (winWidth / winsWidth / 16 ) * 10000;
    var min = 423;
	var ratio = window.devicePixelRatio || detectZoom();
    if(min){
        if(nRezise <= min){
            nRezise = min;
            $("html").css("overflow-x", "auto");
        } else {
            $("html").css("overflow-x", "");
        }
    }
	$("html").css("font-size", (nRezise) + "%");
    if($('.forRem').length === 0){
        $("body").length > 0 ? $("<div>", {class: "forRem"}).appendTo($("body")) : $("<div>", {class: "forRem"}).appendTo($("html"));
    }
	return ratio;
}

/**
 * 用于浏览器改变缩放值时，对页面进行调整
 * 作者：李云龙
 */
function windowSubResize(){
	if(!windowRatio || windowRatio == 0){
		return;
	}
	var winWidth = $(window).width(),
        winsWidth = 1920,
		// winHeight = $(window).height(),
		// winsWidth = window.screen.width,
        // winsHeight = window.screen.height,
		// ss = winsWidth / winsHeight,
		// wss = winWidth / winHeight,
		 nRezise;
    // ss > wss ? nRezise = (winWidth / winsWidth / 16 ) * 10000 : nRezise = (winHeight / winsHeight / 16 ) * 10000;
	var subRatio = window.devicePixelRatio || detectZoom();
	subRatio !== windowRatio ? $("html").css("overflow", "auto") : $("html").css("overflow", "");
	$("html").css("font-size", (nRezise * ratio) + "%");
}

/** 
 * 用于浏览器不支持 window.devicePixelRatio 属性时
 * 检查浏览器缩放比例，方法返回值为缩放比例值
 *（大部分非视网膜屏幕缩放比值为1，视网膜屏幕如iphone、mac等缩放比值为2，Android屏幕有1、1.5、2.25等比值）
 * 作者：李云龙
 */
function detectZoom(){ 
	var ratio = 0,
	screen = window.screen,
	ua = navigator.userAgent.toLowerCase();

	if (window.devicePixelRatio !== undefined) 
		ratio = window.devicePixelRatio;
	else if (~ua.indexOf('msie')) 
		if (screen.deviceXDPI && screen.logicalXDPI)
			ratio = screen.deviceXDPI / screen.logicalXDPI;
	else if (window.outerWidth !== undefined && window.innerWidth !== undefined)
		ratio = window.outerWidth / window.innerWidth;

	if (ratio)
		ratio = Math.round(ratio);

	return ratio;
};

/**
 * 系统公共函数
 */

/**
 * 关闭自身窗口
 * @returns {} 
 */
function closeSelfWindow() {
    window.opener = null;
    window.open('', '_self');
    window.close();

}

/**
 * 刷新父窗口,如果父窗口关闭，当前窗口为url窗口
 * @param {} url 
 * isRefreshAfterCloseWindow  是否刷新后关闭原窗口
 * @returns {} 
 */
function refreshParentWindow(url, isRefreshAfterCloseWindow) {
    if (self.opener.closed == false) {
        self.opener.location.reload();
        if (isRefreshAfterCloseWindow) {
            closeSelfWindow();
        }
    } else {
    	alert(url);
        window.location.href = url;
    }
}



/**
 * 表格添加新行以及删除行通用方法
 * 要求：
 * 1.添加按钮需要加自定义属性 addsign ， 其值 <1>为 "prev" 时, 被操作的 table 需要为其的上一个兄弟节点； 
 *                                  <2>为 "自定义值x" 时, 被操作的 table 需要加自定义属性 tablesign ， tablesign 的值要与 addsign 的 "自定义值x" 相同；                                 
 * 2.table 中 tr 需要加自定义属性 trdelsign ， 同一table的首个 tr 的 trdelsign 值需要为 0 ，之后的值依次加 1 。 
 * 3.删除按钮需要加自定义属性 delsign ， 同一 table 的首个删除按钮的 delsign 值需要与自己所在的 tr 的 trdelsign 值相同。
 */
function clickAddForTable(){
	var aDom = $("*");
    var domlen = aDom.length;
    var addsigns = [];
    var delsign = [];
    for (var i = 0; i < domlen; i++) {
        if (aDom.eq(i).attr("addsign")) {
        	addsigns.push(aDom.eq(i));
        }
        if (aDom.eq(i).attr("delsign")) {
        	delsign.push(aDom.eq(i));
        }
    }
    for (var i = 0; i < addsigns.length; i++) {
        (function (i) {
        	addsigns[i].bind("click", function(){
        		addclickforTable(addsigns[i]);
        	});
        })(i);
    }
    for (var i = 0; i < delsign.length; i++) {
        (function (i) {
        	delsign[i].bind("click", function(){
        		delclickforTr(delsign[i]);
        	});
        })(i);
    }
    
    function addclickforTable(btn){
    	var table;
    	var btnMsg = $.trim(btn.attr("addsign"));
    	if(btnMsg == "prev"){
    		table = btn.prev();
    	} else {
    		table = $("table[tablesign = \'"+ btnMsg +"\']").eq(0);
    	}
    	
    	if(table.children("tbody").length > 0){
    		table = table.children("tbody");
    	}
    	
    	var templateTrs = table.children("tr");
    	var templateTr = table.children("tr").eq(templateTrs.length - 1);
    	var trdelsign = parseInt(templateTr.attr("trdelsign")) + 1;
    	var templateTrHtml = templateTr.html();
    	var newtr = $("<tr>").html(templateTrHtml).attr("trdelsign", trdelsign).appendTo(table);
    	var newtd = newtr.find("td");
    	for(var i = 0; i < newtd.length; i++){
    		var tddom = newtd.eq(i).find("*");
			for(var j = 0; j < tddom.length; j++){
				(function(j){
					if(tddom.eq(j).attr("id") && tddom.eq(j).attr("id") != ""){
						tddom.eq(j).attr("id", tddom.eq(j).attr("id").split("_$")[0] + "_$" + trdelsign);
					}
					if(tddom.eq(j).attr("delsign") && tddom.eq(j).attr("delsign") != ""){
						tddom.eq(j).attr("delsign", trdelsign).bind("click", function(){
			        		delclickforTr(tddom.eq(j));
			        	});
					}
					if(tddom.eq(j).is("span")){
						tddom.eq(j).html("");
					}
					if(tddom.eq(j).is("input")){
						tddom.eq(j).val("");
					}
				})(j);
			}
    	}
    }
    
    function delclickforTr(btn){
    	var btnMsg = $.trim(btn.attr("delsign"));
    	var deltr = btn.closest("tr[trdelsign = " + btnMsg + "]");
    	if(btnMsg == 0){
    		deltr.css("display", "none").attr("subDel", "subDel");
    	} else {
        	deltr.remove();
    	}
    }
}

/**
 * 提交前，删除动态生成的表单内容中隐藏的部分
 * 作者：李云龙
 */
function submitDel(){
    var aDom = $("*");
    var domlen = aDom.length;
    for (var i = 0; i < domlen; i++) {
        if (aDom.eq(i).attr("subDel")) {
            aDom.eq(i).remove();
        }
    }
}

/**
 * 判断字符是否数字
 * 作者：张建中
 */
function isNumber(str){
	var reg=/^\d+$/;
	return reg.test(str);
}

/**
 * 判断字符是否是整数
 * 作者：张建中
 */
function isInt(str){
	var reg=/^(-|\+)?\d+$/;
	return reg.test(str);
}

/**
 * 判断字符是否是正整数
 * 作者：张建中
 */
function isPositiveInt(str){
	var reg=/^[1-9]+[0-9]*$/;
	return reg.test(str);
}

/**
 * 判断非负浮点数
 * 作者：张建中
 */
function isFloat(str){
	var reg=/^\d+(\.\d+)?$/;
	return reg.test(str);
}

/**
 * 元素移动方法
 * 第二参数（可选） 存在且为'header' 时，触发移动区域为obj内的【header】部分
 * 作者：李云龙
 */
function objMove(obj, header){
    var _obj = $(obj) || obj;
    var _move = _obj;
    if(header && header == 'header'){
        if(_obj.find('header').length > 0){
           _move = _obj.find('header'); 
        }
    }
    _move.bind('mousedown', moveMousedown);

    function moveMousedown(event){
        var disX = event.clientX - _obj.position().left;
        var disY = event.clientY - _obj.position().top;

        $(document).bind({
            'mousemove': moveMousemove,
            'mouseup': moveMouseup
        });

        function moveMousemove(event){
            var l = event.clientX - disX;
            var t = event.clientY - disY;
            _obj.css({
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
    }
}

/**
 * json转url
 * @param param
 * @param key
 * @returns
 */
function json2url(param, key) {
	var paramStr = "";
	if (param instanceof String || param instanceof Number
			|| param instanceof Boolean) {
		paramStr += "&" + key + "=" + encodeURIComponent(param);
	} else {
		$.each(param, function(i) {
			var k = key == null ? i : key
					+ (param instanceof Array ? "[" + i + "]" : "." + i);
			paramStr += '&' + json2url(this, k);
		});
	}
	return paramStr.substr(1);
}

/**
 * 字符串true、false转换成Boolean类型
 * 作者：李云龙
 */
function strToBoolean(str){
	var b;
	str == "true" ? b = true : b = false;
	return b;
}


/**
 * Boolean类型或字符串true、false转换成整型0或1
 * 作者：李云龙
 */
function booleanToInt(b){
	var n;
	b || b == "true" ? n = 1 : n = 0;
	return n;
}

// 去空格，第二个参数为‘g’，则是去掉所有空格，为其他参数，则是去掉前后空格
function _trim(str,is_global){
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g"){
        result = result.replace(/\s/g,"");
    }
    return result;
}

/**
 * 颜色渐变
 */
function getColor(color){
    var re = RegExp;
    if (/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.test(color)) {
        //#rrggbb
        return [parseInt(re.$1,16),parseInt(re.$2,16),parseInt(re.$3,16)];
    } else if (/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(color)) {
        //#rgb
        return [parseInt(re.$1+re.$1,16),parseInt(re.$2+re.$2,16),parseInt(re.$3+re.$3,16)];
    } else if (/^rgb(.*),(.*),(.*)$/i.test(color)) {
        //rgb(n,n,n) or rgb(n%,n%,n%)
        if(re.$1.indexOf("%")>-1){
            return [parseInt(parseFloat(re.$1, 10) * 2.55),
            parseInt(parseFloat(re.$2, 10) * 2.55),
            parseInt(parseFloat(re.$3, 10) * 2.55)];
        }else{
            return [parseInt(re.$1.split('(')[1]),parseInt(re.$2),parseInt(re.$3)];
        }
    }
}
(function($){$.fn.shade = function(prop,color1,color2,mills){
    var count = mills/10;
    var data1 = color1;
    var data2 = color2;
    var red = data1[0],green = data1[1],blue = data1[2];
    var r = (data2[0]-data1[0])/count,g = (data2[1]-data1[1])/count,b = (data2[2]-data1[2])/count;
    obj_temp = $(this);
    for(var i=1;i<count+1;i++){
    setTimeout("$(obj_temp).css('"+prop+"','rgb("+parseInt(red+r*i+0.5)+","+
        parseInt(green+g*i+0.5)+","+parseInt(blue+b*i+0.5)+")');", i*10);
    }
}})(jQuery);

/**
 * 数组去重
 */
Array.prototype.unique = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

/**
 * 当前时间
 */
function update(){
    var timeTimer = setInterval(function(){
        var _time_1 = (new Date()).format("yyyy-MM-dd"),
            _time_2 = (new Date()).format("hh:mm:ss");
        $("nowtime").html(_time_1 + "&nbsp;&nbsp;" + _time_2);
    }, 1000);
}

/**
 * 去除字符串所有逗号
 */
function cleardh(str){
    var _str = str;
    if((str + '').indexOf(',') >= 0){
        _str = str.replace(/,/g,'');
    }
    if(str = null){
        _str = 0;
    }
    return _str;
}

/*
 * 客户端生成唯一ID
 * */
function NewGuid(){   
	function S4(){
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);   
	}    
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()); 
}


/**
 * 获取字符串长度（汉字算两个字符，字母数字算一个）
 */
function getByteLen(val) {
    var len = 0;
    if(val == null || val == ''){
        return len;
    }
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        // } else if(val[i].match(/[^0-9]/ig) == null){
        //     len += 1;
        // } else {
        //     len += 4/3;
        // }
        } else {
            len += 1;
        }
    }
    return len.toFixed(2);
}

// 数组去重
Array.prototype.unique = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};

// 数组去空
Array.prototype.removeNull = function(){
    var res = [];
    for(var i = 0; i < this.length; i++){
        if(this[i] != "" && typeof(this[i]) != "undefined"){
            res.push(this[i]);  
        }
    }
    return res;
};

// 数组删除指定值元素
Array.prototype.removeByValue = function(val) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

// rgb转16进制值
function rgb216(color){
    if(color.indexOf('rgb') < 0){
        return color;
    }
    color = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);  
    color = '#' + hex(color[1]) + hex(color[2]) + hex(color[3]);
    function hex(x){
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return color;
}