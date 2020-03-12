<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">

<%@include file="../public/publicCss.jsp" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/Configuration/css/configuration.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/Polling/css/polling.css">
	<title>Polling</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">

</head>

<body ng-app='pollingApp' ng-controller='pollingController'>
	<pol-frame></pol-frame>
<%@include file="../public/publicJs.jsp" %>
<script type="text/javascript">
	var basepath = "${pageContext.request.contextPath}";
	var chatServerAddress = "${collSocketIoAddr}";
	var userId = "${userId}";
</script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CommonJS/jsmap.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/socket.io/socket.io.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/socket.io/moment.min.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Polling/js/app.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Polling/js/controllers.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Polling/js/directives.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Polling/js/services.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Polling/js/filters.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Polling/js/polling.js?ver=${jsVersion}"></script>
</body>
</html>