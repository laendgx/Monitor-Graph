<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'MyTestJsp.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/CommonJS/jquery/jquery-1.9.1.min.js"></script>
	
	<script type="text/javascript">
		var basePath = "${pageContext.request.contextPath}";
		function getSearchCondition(){
			var url = basePath + "/cms/getSearchCondition.from?ran=" + Math.random();
			var json = {};
			$.ajax( {
				type : "POST",
				contentType : "application/json; charset=utf-8",//"application/x-www-form-urlencoded; charset=utf-8",
				url : url,
				dataType : "json",
				data : JSON.stringify(json),
				success : function(data) {
					console.log(data);					
				}
			});
		}
		
		function getCmsBasicInfos(){
			var url = basePath + "/cms/getCmsBasicInfos.from?ran=" + Math.random();
			var json = {};
			$.ajax( {
				type : "POST",
				contentType : "application/json; charset=utf-8",//"application/x-www-form-urlencoded; charset=utf-8",
				url : url,
				dataType : "json",
				data : JSON.stringify(json),
				success : function(data) {
					console.log(data);					
				}
			});
		}
	</script>

  </head>
  
  <body>
    This is my JSP page. <br>
    <button onclick="getSearchCondition()" style="margin:10px">检索条件</button>
    <br/>
    <button onclick="getCmsBasicInfos()" style="margin:10px">情报基础信息</button>
    <br/>
  </body>
</html>
