<%@ page pageEncoding="UTF-8"%>
<modelmanage ng-show='modelManage' ng-hide='!modelManage'>
	<header>
		<span>模板管理</span>
		<i ng-click='modelManage=false;modelEdit=false;modelTypeList=[]'>×</i>
	</header>
	<btns>
		<filbtn ng-repeat='type in modelType'>
			<input type='radio' name='model' ng-click='setModelFlag(type)'>
			<p>{{type.name}}</p>
		</filbtn>
		<modsearch>
			<input type='text' ng-model='searchKeyWord'>
			<i ng-click='setModelFlag()'></i>
		</modsearch>
	</btns>
	<modellist customAttr='scroll'>
		<div class='mlistwrap' custombody='normal'>
			<div>
				<header>{{modelTypeName}}
					<p ng-click='modelEditFn()'>添加节目单</p>
				</header>
				<div class="table">
					<table>
						<thead>
							<tr>
								<th width='6%'>序号</th>
								<th width='42%'>节目单内容</th>
								<th width='{{(36 / cmsTypeList.length)}}%' ng-repeat='cmstype in cmsTypeList'>{{cmstype.cmsType}}({{cmstype.cmsSize}})</th>
								<th width='16%'>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat='model in modelTypeList'>
								<td>{{($index + 1)}}</td>
								<td>{{model.text}}</td>
								<td ng-repeat='cmstype in cmsTypeList'><span ng-show='modelExist(cmstype.cmsType, cmstype.cmsSize, model.showArr)' ng-hide='!modelExist(cmstype.cmsType, cmstype.cmsSize, model.showArr)'></span></td>
								<td>
									<cc ng-mouseover='editViewList(model)' modviewcc>预览</cc>
									<cc ng-click='editModelList(model)'>修改</cc>
									<cc ng-click='delModelList(model)'>删除</cc>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<modelview ng-show='modview' ng-hide='!modview'>
					<div class='tplwrap tpl-compile-model' ng-repeat='cmsview in cmsViewList'>
						<browse>
							<preview>
								<icwrap ng-style='cmsview.cmsSize | wrapStyle'>
									<cicon id='{{cmsview.viewid}}_icon'></cicon>
							        <cwrap ng-style='cmsview.cmsSize | cmsStyle:cmsview.textalign:cmsview.family:cmsview.size:cmsview.color:cmsview.icon' enterposi=-1 enterrow=1>
						        		<div id='{{cmsview.viewid}}'>{{cmsview.editModel | modelview:cmsview.viewid:cmsview.cmsSize:cmsview.size:cmsview.type:cmsview.time:cmsview.icon:iconsAddr}}</div>
							        </cwrap>
							    </icwrap>
						    </preview>
						</browse>
					</div>
				</modelview>
			</div>
		</div>
	</modellist>
	
</modelmanage>