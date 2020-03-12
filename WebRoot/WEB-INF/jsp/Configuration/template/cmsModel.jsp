<%@ page pageEncoding="UTF-8"%>
<cmsmodel ng-show='modelList' ng-hide='!modelList'>
	<header>
		<span>节目单模板</span>
		<i ng-click='closeModelUse()'>×</i>
	</header>
	<btns>
		<filbtn ng-repeat='type in modelType'>
			<input type='radio' name='model' ng-click='setModelUse(type)'>
			<p>{{type.name}}</p>
		</filbtn>
		<modsearch>
			<input type="text">
			<i></i>
		</modsearch>
	</btns>
	<modellist>
		<header>天气提醒</header>
		<div class="table">
			<table>
				<thead>
					<tr>
						<th width='10%'>序号</th>
						<th width='80%'>节目单内容</th>
						<th width='10%'>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat='model in modelUseList | resetModel:cmsInfo.deviceTypeId'>
						<td>{{($index + 1)}}</td>
						<td ng-mouseover='viewToCms(model.command)' ng-mouseleave='resetToCms()'>{{model.commandName}}</td>
						<td><span ng-click='viewToCms(model.command)'>使用</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</modellist>
</cmsmodel>