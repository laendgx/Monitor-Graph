<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
	String path = request.getContextPath();
	String socPath = "ws://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html class="mainFrameHtml" lang="zh-cmn">
<head>
	<meta charset="utf-8" />
	<title>联网收费综合信息平台</title>
	<!-- 调用公共引用 -->
	<%@include file="../public/publicCss.jsp"%>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/Index/css/IndexHome.css">
</head>

<body ng-app='indexApp' ng-controller='indexController'>
    <!--最上边导航条-->
    <div class="nav">
        <!--导航条里面左侧滚动条部分-->
        <div class="nav_left">
            <a href="#">
                <div class="logo">
                    <img src="${pageContext.request.contextPath }/static/Login/images/logo.png">
                </div>
                <h2>内蒙古自治区联网收费高速公路用综合信息管理系统</h2>
                <p id="s1">Inner Mongolia Autonomous Region Networking Toll Highway Information Management System</p>
            </a>
        </div>
        <!--导航条里面右侧部分-->
        <div class="nav_right" id="nav_right">
            <ul>
                <li>
                    <a href="#" title="修改个人信息">
                        <img src="${pageContext.request.contextPath }/static/Login/images/loginYH.png">
                    </a>
                </li>
                <li class="nav_text">
                    ${orgName } ${userName }
                    <br/>
                    ${curDate }
                </li>
                <li class="nav-right_lastLi">
                    <a href="${pageContext.request.contextPath }/login/loginOut.from" title="注销">
                        <img src="${pageContext.request.contextPath }/static/Login/images/TC.png">
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!--左侧垂直菜单部分-->
    <div class="div1" id="div1" customAttr="scroll">
        <div class="div2" custombody="normal"> 
            <ul id="indexUl">
                <c:forEach var="parent" items="${funcTreeList}">				
                <li>
    	            <c:choose>
			        <c:when test="${fn:length(parent.children)==0}">  
				    <a href="#" onclick="changeFrameUrl('${parent.url }', this)"> 
			        </c:when>
			        <c:otherwise> 
				    <a href="#"> 
			        </c:otherwise>
		            </c:choose>          
                    <i class="${parent.memo }"></i>
                    <p>${parent.title }</p>
                    </a>
                    <c:if test="${fn:length(parent.children)>0 }">
                    <ul>
              	        <c:forEach var="child" items="${parent.children}">
             	        <a href="#"  onclick="changeFrameUrl('${child.url }', this)">
                        <li>${child.title }</li>
                        </a>
              	        </c:forEach>
                    </ul>
                    </c:if>
                </li>
		    </c:forEach>
            </ul>
        </div>
    </div>
  
    <div class="iframe">
        <iframe id="MainFrame" name="MainFrame" style="width: 100%; height:100%; border: none;" scrolling="no"></iframe>
    </div>
    <div class='devAlerts' ng-show='alertsFlag' ng-hide='!alertsFlag'>
        <header>
            <span>告警提示(第{{alertsCount + 1}}条)</span>
            <i class='close' ng-click='closeAlerts()'>×</i>
            <i class='next' ng-click='changeAlerts("next")'>&gt;</i>
            <p>共{{alertsArr.length}}条</p>
            <i class='prev' ng-click='changeAlerts("prev")'>&lt;</i>
        </header>
        <div>
            <ul>
                <li class='clear'>
                    <span>设备名称：</span>
                    <p>{{alertsShow.devName}}</p>
                </li>
                <li class='clear'>
                    <span>设备位置：</span>
                    <p>{{alertsShow.devAddr}}</p>
                </li>
                <li class='clear'>
                    <span>设备桩号：</span>
                    <p>{{alertsShow.devPegNo}}</p>
                </li>
                <li class='clear'>
                    <span>设备类型：</span>
                    <p>{{alertsShow.devType}}</p>
                </li>
                <li class='clear'>
                    <span>告警时间：</span>
                    <p>{{alertsShow.alertTime}}</p>
                </li>
                <li class='clear'>
                    <span>告警状态：</span>
                    <p>{{alertsShow.alertType}}</p>
                </li>
            </ul>
        </div>
    </div>
    <%@include file="../public/publicJs.jsp"%>  
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/CommonJS/jsmap.js"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath}/static/CommonJS/socket.io/socket.io.js"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath}/static/CommonJS/socket.io/moment.min.js"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/Index/js/app.js?ver=${jsVersion}"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/Index/js/controllers.js?ver=${jsVersion}"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/Index/js/directives.js?ver=${jsVersion}"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/Index/js/services.js?ver=${jsVersion}"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/Index/js/filters.js?ver=${jsVersion}"></script>
    <script type="text/javascript" 
        src="${pageContext.request.contextPath }/static/Index/js/Index.js?ver=${jsVersion}"></script>
    <script type="text/javascript">
        var basebath = "${pageContext.request.contextPath}";
        var basepath = "${pageContext.request.contextPath}";
        var chatServerAddress = "${collSocketIoAddr}";
        var userId = "${sessionScope.admin.userId}";
        var defaultUrl = "${defaultUrl}";
        function changeFrameUrl(url, obj) {
            if (!url) 
                return;
            var targetUrl = basebath + url;
            $('#MainFrame').attr('src', targetUrl);
        }
        $(function() {
            var targetUrl = basebath + "/home/HomePage.from";
            //判断是否设置默认首页
            if (defaultUrl != "") {
                targetUrl = basebath + defaultUrl;
                $('#MainFrame').attr('src', targetUrl);
            } else {
                $('#MainFrame').attr('src', targetUrl);
            }
        });
    </script>
</body>
</html>