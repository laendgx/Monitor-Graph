<%@ page pageEncoding="UTF-8"%>
<cmwindow>
	<img src='${pageContext.request.contextPath}/static/Configuration/images/map.png' class='cmap'>
	<cmap>
		<div ng-repeat='device in cmsBasicInf.cms' ng-style='device | deviceStyle' ng-click='showCmsInfo(device)' cmsposi ccount={{$index}} title='{{device.deviceName}}'>
			<img ng-src='{{device | devImgSrc}}'>
			<i ng-if='(checkStatus(device.status.alertType))==1' class='communication'></i>
			<i ng-if='(checkStatus(device.status.alertType))==2' class='notcommunication'></i>
		</div>
		
	</cmap>
	<eagle>
		<eawindow></eawindow>
		<bgctrl></bgctrl>
	</eagle>
	<template compile></template>
	<template list></template>
	<template model></template>
	<template manage></template>
	<configbtn ng-class='{"configSave": cmsPosition}' ng-click='cmsPosiFn(device)'><span ng-if='!cmsPosition'>组态</span><span ng-if='cmsPosition'>保存</span></configbtn>
</cmwindow>
