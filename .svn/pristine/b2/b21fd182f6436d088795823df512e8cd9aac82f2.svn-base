function myLogin() {
    localStorage.setItem("menu_li_id", "sys0001");
    var uid = $("#uid").val();
    var pwd = $("#pwd").val();

    var loginbtn = document.getElementsByClassName("login_btn_wrap")[0];
    var _login_part = "登录中";
    var _login_timeout = setTimeout(function () {
        loginbtn.innerHTML = _login_part;
    }, 400);
    _login_timer = setInterval(function () {
        _login_part = _login_part + ".";
        if (_login_part.length > 6) _login_part = "登录中";
        loginbtn.innerHTML = _login_part;
    }, 700);

    var jsondata = { loginId: uid, pwd: pwd };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseUrl + "/login/login.from?ran=" + Math.random(),
        dataType: "json",
        data: JSON.stringify(jsondata),
        success: function (response) {
            clearInterval(_login_timeout);
            var result = response;//eval("(" + response + ")");
            if (result.resultCode == "100") {                
                loginCookie();
                
                localStorage.setItem("UserId", response);
                location.href = baseUrl + "/login/toIndex.from";
            }
            else {
                loginbtn.innerHTML = "登    录";
                clearInterval(_login_timer);
                if (result.resultMsg != undefined) {
                    $(".login_tips").html(result.resultMsg);
                    if (result.resultMsg.indexOf("用户") >= 0 && result.resultMsg.indexOf("密码") < 0) {
                        setCookie("currRemName", 'false', "", "");
                        document.getElementById("rember").checked = false;
                    }
                } else {
                    $(".login_tips").html("Login failed");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('发生错误：' + XMLHttpRequest.error);
        }
    });
}

function loginbtnkeydown(event) {
    document.onkeydown = function (event) {
        var currKey = event.keyCode || event.which || event.charCode;
        if (currKey == 13) {
            document.onkeyup = function () {
                myLogin();
                document.onkeyup = "";
            }
        }
    }
}

function loginCookie(){
	var rem_name = document.getElementById("rember");
    setCookie("currUserName", $("#uid").val(), "", "");
    if (rem_name.checked == true) {
    	setCookie("currRemName", 'true', "", "");
    } else {
        setCookie("currRemName", 'false', "", "");
    }

}

function loginInput(){
	if($("#uid").val() === ""){
		$("#uid").focus();
	} else {
		$("#pwd").focus();
	}
	
	$("#uid").bind("focus", function(){
		$(this).select();
	});
	
	$("#pwd").bind("focus", function(){
		$(this).select();
	});
}

$(window).ready(function(){
	loginbtnkeydown();
	//loginCookie();
	
	//$("#uid").val("14120101");
	var currUserName = getCookieValue("currUserName");
    var currRemName = getCookieValue("currRemName");
    if (currRemName != null) {
        if (currRemName == 'true') {
            document.getElementById("rember").checked = true;
            $("#pwd").focus();
        }
    }

    if (currUserName != null && currRemName == 'true')
    {
        document.getElementById("uid").value = currUserName;
    }  
	loginInput();
});