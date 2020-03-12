<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
  <head>    
  	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
  	<title>联网收费高速公路综合信息管理系统</title>
  	<!-- 调用公共引用 -->
  	<%@include file="../public/publicCss.jsp"%>
	<%@include file="../public/publicJs.jsp"%>
  	<link href="${pageContext.request.contextPath }/static/Login/css/login.css" rel="stylesheet"/>
  	<script type="text/javascript" src="${pageContext.request.contextPath }/static/Login/js/login.js"></script>
  	<script type="text/javascript" src="${pageContext.request.contextPath }/static/Login/js/UserInfoCookieManger.js"></script>
  	<script type="text/javascript">
  		var baseUrl = "${pageContext.request.contextPath }";
  		$(function(){
  			var parent = window.parent;
  			var href = parent.location.href;
  			if(href.indexOf("login/toLogin") == -1){
  				parent.location.href = baseUrl + "/login/toLogin.from";
  			}
  		});
  	</script>
  </head>  
  <body>    
    <div id="body">
		<div style="width: 100%; margin: 0 auto;">
			<div class="logo"></div>
			<div class="lansekuang"></div>
			<div class="lansekuang2"></div>
			<div class="login_title"></div>
			<div class="login_btns">
				<div class="duihuakuang">
					<div class="login_username">
						<input type="text" id="uid" placeholder="用户名" />
						<div class="lu_div"></div>
					</div>
					<div class="login_password">
						<input type="password" id="pwd" placeholder="密码" />
						<div class="lp_div"></div>
					</div>
					<div class="login_remember">
						<label>
							记住用户名
							<input type="checkbox" id="rember" />
						</label>
					</div>
					<div class="login_tips"></div>
					<div class="login_btn_wrap" onclick="myLogin()">
						登 录
					</div>
				</div>
			</div>
		</div>
  	</div>
  </body>
</html>
