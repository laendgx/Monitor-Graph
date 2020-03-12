<%@ page pageEncoding="UTF-8"%>
<cmscompile ng-show='compile' ng-hide='!compile'>
	<header>
		<span>{{cmsInfo.deviceName}}</span>
		<i ng-click='cancelEdit(cmsInfo);compClose()'>×</i>
	</header>
	<cms-tpl></cms-tpl>
	<edit-tpl ng-show='!cmsTpl' ng-hide='cmsTpl'></edit-tpl>
	<info>
		<ul>
			<li>所处位置：{{cmsInfo.routeLineId}}{{cmsInfo.routeLineName}} {{cmsInfo.devicePegNo}}</li>
			<li>运行状态：{{cmsInfo.status.alertText}}</li>
			<li>发布时间：{{cmsInfo.deviceVar[cmsInfo.issuedTypeId].deviceVarDateTime}}</li>
		</ul>
		<btns>
			<p ng-show='cmsTpl' ng-hide='!cmsTpl' ng-click='cmsTpl=false;inputsPosi()'>编辑</p>
			<p ng-show='!cmsTpl' ng-hide='cmsTpl' ng-click='cmsTpl=true;cancelEdit(cmsInfo)'>取消编辑</p>
		</btns>
	</info>
	<footer ng-show='!cmsTpl' ng-hide='cmsTpl'>
		<btns>
			<p ng-click='inputPosition(cmsInfo, viewid)'>添加条目</p>
			<p ng-click='delCms(cmsInfo)'>删除条目</p>
			<p ng-click='issue(cmsInfo, viewid)'>发布</p>
			<p ng-click='modelList=false;cmsList=!cmsList;resetScroll(20)'>追加情报板<span ng-show='addToInfo.length>0' ng-hide='addToInfo.length==0'>({{addToInfo.length}})</span></p>
			<p ng-click='cmsList=false;getModelList()'>使用模板</p>
		</btns>
	</footer>
</cmscompile>
