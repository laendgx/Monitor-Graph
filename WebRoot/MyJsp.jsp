<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'MyJsp.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/CommonJS/AngularJs/AngularJs-1.6.4.min.js"></script>
	<style type="text/css">
		input.ng-invalid{
			background-color : lightblue;
		}
	</style>
  </head>
  
  <body>
    This is my JSP page. Hello${pageContext.request.contextPath }<br>    

    <div ng-app="myApp" ng-controller="myCtrl">
    	姓：<input type="text" ng-model="firstName"/><br>
    	名：<input type="text" ng-model="lastName"/><br>
    	姓名：{{firstName + " " + lastName}}    	
    	<br>
    	
    	<!-- ng-repeat -->
    	<ul>
    		<li ng-repeat="x in names">
    			{{x}}
    		</li>
    	</ul>
    	
    	<!-- directive -->
    	<my-directive></my-directive>
    	<div class="my-directive1"></div>
    	
    	<form name="myForm">
    		姓名：<input name="myName" ng-model="myText" required/>
    		邮箱:<input type="email" name="myAddress" ng-model="text">
    		<span ng-show="myForm.myAddress.$error.email">这不是一个合法的邮箱</span>
    	</form>
    	
    	<script type="text/javascript">
	    	
	    </script>
    	
    	<hr>
    	Name:<input ng-model="name1"/>
    	<h3>{{greeting}}</h3>
    	<button ng-click="sayHello()">点我</button>
    	<script type="text/javascript">
	    	var myApp = angular.module("myApp",[]);
	    	myApp.controller("myCtrl",function($scope, $rootScope){
	    		$scope.firstName="John";
	    		$scope.lastName="Doe";    	
	    		//$scope.names=["Dannels","WashingTon","Rose"];
	    		$rootScope.names=["Dannels","WashingTon","Rose"];
	    		
	    		$scope.greeting = "Hello " + $scope.name1 + "!";
				$scope.sayHello = function(){
					$scope.greeting = "Hello " + $scope.name1 + "!";
				};
	    	});
	    	
	    	myApp.directive("myDirective", function(){
	    		return {
	    			template : "<h2>自定义命令</h2>"
	    		};
	    	});
	    	
	    	myApp.directive("myDirective1", function(){
	    		return {
	    			restrict:"C",
	    			template : "<h2>自定义命令</h2>"
	    		};
	    	});
    		
    	</script>
    </div>
    
  </body>
</html>
