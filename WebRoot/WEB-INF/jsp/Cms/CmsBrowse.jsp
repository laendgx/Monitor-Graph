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
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/CmsBrowse/css/cmsBrowse.css">
	<title>CmsBrowser</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">

</head>

<body ng-app='cmsApp' ng-controller='cmsController'>
	<t-browse></t-browse>
<%@include file="../public/publicJs.jsp" %>
<script type="text/javascript">
	var basepath = "${pageContext.request.contextPath}";
</script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CmsBrowse/js/app.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CmsBrowse/js/controllers.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CmsBrowse/js/directives.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CmsBrowse/js/services.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CmsBrowse/js/filters.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CmsBrowse/js/CmsBrowse.js"></script>
</body>
</html>