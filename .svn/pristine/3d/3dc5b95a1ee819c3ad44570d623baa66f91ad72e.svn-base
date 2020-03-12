<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh-cmn">
<head>
	<base href="<%=basePath%>">
	<meta charset="UTF-8">

	<%@include file="../public/publicCss.jsp" %>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/static/Alert/css/alert.css">
	<title>Configuration</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">

</head>

<body ng-app='configApp' ng-controller='configController'>
	<div class='alertBox'>
		<table class='wrapTable'>
			<thead>
				<tr>
					<th>
						<table class='inHeadTable'>
							<thead>
								<tr>
									<th width='8%'>机构</th>
									<th width='8%'>路线</th>
									<th width='8%'>路段</th>
									<th width='16%'>设备名称</th>
									<th width='6%'>设备类型</th>
									<th width='8%'>桩号</th>
									<th width='6%'>方向</th>
									<th width='6%'>告警等级</th>
									<th width='8%'>告警类型</th>
									<th width='11%'>告警时间</th>
									<th width='11%'>状态</th>
								</tr>
							</thead>
						</table>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat='dev in cmsBasicInf.cms track by $index' ng-if='dev.status.alertTypeArr.length>0'>
					<td>
						<table class='inBodyTable'>
							<thead>
								<tr>
									<th width='8%'>机构</th>
									<th width='8%'>路线</th>
									<th width='8%'>路段</th>
									<th width='16%'>设备名称</th>
									<th width='6%'>设备类型</th>
									<th width='8%'>桩号</th>
									<th width='6%'>方向</th>
									<th width='6%'>告警等级</th>
									<th width='8%'>告警类型</th>
									<th width='11%'>告警时间</th>
									<th width='11%'>状态</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat='sta in dev.status.alertTypeArr track by $index'>
									<td>{{dev.orgName}}</td>
									<td>{{dev.routeLineName}}</td>
									<td>{{dev.roadName}}</td>
									<td>{{dev.deviceName}}</td>
									<td>{{dev.cmsTypeDesc}}</td>
									<td>{{dev.devicePegNo}}</td>
									<td>{{dev.deviceDirectDesc}}</td>
									<td>{{sta.alertLevel}}</td>
									<td>{{sta.alertType}}</td>
									<td>{{sta.alertTime}}</td>
									<td>{{sta.desc}}</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
<%@include file="../public/publicJs.jsp" %>
<script type="text/javascript">
	var basepath = "${pageContext.request.contextPath}";
	var chatServerAddress = "${collSocketIoAddr}";
	var userId = "${sessionScope.admin.userId}";
</script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/CommonJS/jsmap.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/socket.io/socket.io.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/static/CommonJS/socket.io/moment.min.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Alert/js/app.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Alert/js/controllers.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Alert/js/directives.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Alert/js/services.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Alert/js/filters.js?ver=${jsVersion}"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath }/static/Alert/js/alert.js?ver=${jsVersion}"></script>
</body>
</html>