<%@ page pageEncoding="UTF-8"%>
<cmslist ng-show='cmsList' ng-hide='!cmsList'>
	<header>
		<span>情报板</span>
		<i ng-click='cmsList=false'>×</i>
	</header>
	<div class='table' customAttr='scroll'>
		<table custombody='normal' tablelist>
			<thead>
				<tr>
					<th width='6%'></th>
					<th width='10%'></th>
					<th width='23%'></th>
					<th width='16%'></th>
					<th width='45%'></th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat='dev in cmsBasicInf | cmsInfoList:cmsInfo.cmsSizeDesc'>
					<td><input type='checkbox' ng-model='dev.check' ng-change='listChecked(dev, dev.check)'></td>
					<td>{{dev.routeLineId}}</td>
					<td>{{dev.routeLineName}}</td>
					<td>{{dev.devicePegNo}}</td>
					<td>{{dev.deviceName}}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<footer>
		<p ng-click='cmsList=false'>关闭</p>
	</footer>
</cmslist>
