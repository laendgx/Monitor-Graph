/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt){
    var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : (this.getMilliseconds() / 1000).toString().split('.')[1]        //毫秒保留三位  
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    return fmt;   
}

/**
 * 将'yyyy-MM-dd hh:mm'格式的字符串转换为'yyyy年MM月dd日'
 */
function convertDateFormat(dateStr){
	var array = dateStr.split(' ');
	if (array.length >= 2){
		var dateArr = array[0].trim().split('-');
		var timeArr = array[1].trim().split(':');
		if (dateArr.length < 3 || timeArr.length < 2){
			return dateStr;
		} else {
			return dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日'; 
			//timeArr[0] + '时' + timeArr[1] + '分';
		}
	} else {
		return dateStr;
	}
	
}

/**
 * 将'yyyy-MM-dd hh:mm'格式的字符串转换为'yyyy年MM月dd日h时m分'
 */
function convertDateTimeFormat(dateStr){
	var array = dateStr.split(' ');
	if (array.length >= 2){
		var dateArr = array[0].trim().split('-');
		var timeArr = array[1].trim().split(':');
		if (dateArr.length < 3 || timeArr.length < 2){
			return dateStr;
		} else {
			return dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日' + timeArr[0] + '时' + timeArr[1] + '分';
		}
	} else {
		return dateStr;
	}
	
}

function getWeekOfToday(){
	var a = new Array("日", "一", "二", "三", "四", "五", "六");  
	var week = new Date().getDay();  
	var str = "星期" + a[week];  
	return str;
}
