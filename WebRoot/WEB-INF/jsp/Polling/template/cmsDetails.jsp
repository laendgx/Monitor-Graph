<%@ page pageEncoding="UTF-8"%>
<cmsdetails ng-show='details' ng-hide='!details'>
	<header>
		<span>{{cmsInfo.deviceName}}</span>
		<i ng-click='details=false'>×</i>
	</header>
	<po-tpl></po-tpl>
	<info>
		<ul class='type4'>
			<li>
				<p>所在线路：</p>
				<span>{{cmsInfo.routeLineId}}</span>
			</li>
			<li>
				<p>所在路段：</p>
				<span>{{cmsInfo.routeLineName}}</span>
			</li>
			<li>
				<p>位置：</p>
				<span>{{cmsInfo.devicePositionDesc}}</span>
			</li>
			<li>
				<p>桩号：</p>
				<span>{{cmsInfo.devicePegNo}}</span>
			</li>
		</ul>
		<ul class='type4'>
			<li>
				<p>厂家：</p>
				<span></span>
			</li>
			<li>
				<p>类型：</p>
				<span>{{cmsInfo.cmsTypeDesc}}情报板</span>
			</li>
			<li>
				<p>尺寸：</p>
				<span>{{cmsInfo.cmsSizeDesc}}</span>
			</li>
			<li>
				<p>颜色：</p>
				<span>{{cmsInfo.cmsColorDesc}}</span>
			</li>
		</ul>
		<dline></dline>
		<ul class='type1'>
			<li>
				<p>情报板IP：</p>
				<span></span>
			</li>
		</ul>
		<ul class='type2'>
			<li>
				<p>串口服务器：</p>
				<span></span>
			</li>
			<li>
				<p>端口号：</p>
				<span></span>
			</li>
		</ul>
		<dline></dline>
		<ul class='type3'>
			<li>
				<p>当前状态：</p>
				<span ng-style='{color: cmsInfo.status.alertColor}'>{{cmsInfo.status.alertText}}</span>
			</li>
			<li>
				<p>节目单数：</p>
				<span>{{cmsInfo | cmsProgram}}条</span>
			</li>
			<li>
				<p>播放周期：</p>
				<span>{{cmsInfo | cmsCycle}}秒</span>
			</li>
		</ul>
		<ul class='type1'>
			<li>
				<p>发布时间：</p>
				<span>{{cmsInfo.deviceVar[cmsInfo.issuedTypeId].deviceVarDateTime}}</span>
			</li>
		</ul>
		<ul class='type1' ng-show='cmsInfo.status.alertArr.length>0' ng-hide='cmsInfo.status.alertArr.length==0'>
			<li>
				<p>故障描述：</p>
				<span>{{cmsInfo.status.alertArr | cmsFault}}</span>
			</li>
		</ul>
	</info>
	<footer>
		<btns>
			<p ng-click='details=false'>关闭</p>
		</btns>
	</footer>
</cmsdetails>
