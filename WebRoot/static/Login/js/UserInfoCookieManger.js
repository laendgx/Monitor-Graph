/**
 * cookie操作方法
 * @param cookieName
 * @param cookieValue
 * @param cookieExpires
 * @param cookiePath
 */
//设置cookie的方法
function setCookie(cookieName, cookieValue, cookieExpires, cookiePath)
{  
    cookieValue = escape(cookieValue);//编码latin-1  
    if(cookieExpires=="")  
    {  
        var nowDate = new Date();  
        nowDate.setMonth(nowDate.getMonth()+1);  
        cookieExpires = nowDate.toGMTString();  
    }  
    if(cookiePath!="")  
    {  
        cookiePath = ";Path="+cookiePath;  
    }  
    document.cookie= cookieName+"="+cookieValue+";expires="+cookieExpires+cookiePath;  
}  


//获取cookie的方法
function getCookieValue(cookieName) {
    var cookieValue = document.cookie;
    var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
    if (cookieStartAt == -1) {
        cookieStartAt = cookieValue.indexOf(cookieName + "=");
    }
    if (cookieStartAt == -1) {
        cookieValue = null;
    }
    else {
        cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
        cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
        if (cookieEndAt == -1) {
            cookieEndAt = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt));//解码latin-1  
    }
    return cookieValue;
}
