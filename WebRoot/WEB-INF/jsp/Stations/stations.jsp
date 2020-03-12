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
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/Stations/css/stations.css">
	<title>Stations</title>
</head>

<body ng-app='stationsApp' ng-controller='stationsController'>
	<div class='page-wrap' page-wrap>
		<header sw-title data='交调站管理'></header>
		<nav filtrate data='nav'></nav>
		<section sections-wrap class='sections-wrap'>
			<header content-head fn='changeTabs()'></header>
			<section tables data='tables' ng-if='tabs'></section>
			<section charts data='charts' fn='linefn(id, data)' ng-if='!tabs'></section>
		</section>
	</div>
	
<%@include file="../public/publicJs.jsp" %>
<script type="text/javascript">
	var basepath = "${pageContext.request.contextPath}";
	var chatServerAddress = "${collSocketIoAddr}";
	var userId = "${userId}";
</script>
<!-- <script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CommonJS/jsmap.js"></script> -->
<!-- <script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/socket.io/socket.io.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/socket.io/moment.min.js"></script> -->
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/echarts/echarts.min.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Stations/js/app.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Stations/js/controllers.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Stations/js/directives.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Stations/js/services.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Stations/js/filters.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Stations/js/stations.js?ver=${jsVersion}"></script>
</body>
</html>