<%@ page pageEncoding="UTF-8"%>
<div class='cmsEditWrap' customAttr='scroll' ng-show='modelEdit' ng-hide='!modelEdit'>
	<cmsedit custombody='normal'>
		<header>
			<span>模板编辑</span>
			<i ng-click='cancelEditModel()'>×</i>
		</header>
		<div class='guide'>
			<input type='text' ng-model='compileModelTxt'>
		</div>
		<div class='tplwrap'>
			<div class='tplwrap tpl-compile-model' ng-repeat='cmstype in cmsTypeList' ng-click='compileModel(cmstype)' compmodel>
				<edittpl>
					<header>
						<p>{{cmstype.cmsType}}情报板({{cmstype.cmsSize}})</p>
						<!-- <p>已选数量：<span>55</span>块</p>
						<div>查看明细</div> -->
					</header>
					<browse>
						<preview>
							<icwrap ng-style='cmstype.cmsSize | wrapStyle'>
								<cicon id='{{cmstype.viewid}}_icon'></cicon>
						        <cwrap ng-style='cmstype.cmsSize | cmsStyle:cmstype.textalign:cmstype.family:cmstype.size:cmstype.color:cmstype.icon' enterposi=-1 enterrow=1>
					        		<div id='{{cmstype.viewid}}'>{{cmstype.editModel | modelview:cmstype.viewid:cmstype.cmsSize:cmstype.size:cmstype.type:cmstype.time:cmstype.icon:iconsAddr}}</div>
						        </cwrap>
						    </icwrap>
					    </preview>
					</browse>
				</edittpl>
				<multitxta>
				    <btns inputs>
				        <select ng-model='cmstype.family' class='type3'>
				        	<option value=''>-字体-</option>
					        <option value='SimHei' ng-selected='SimHei'>黑体</option>
				        	<option value='SimSun'>宋体</option>
					        <option value='KaiTi'>楷体</option>
				        </select>
				        <select ng-model='cmstype.size' class='type3'>
				        	<option value='' ng-selected='selected'>-字号-</option>
				        	<option value='16'>16</option>
				        	<option value='24'>24</option>
				        	<option value='32'>32</option>
				        	<option value='48'>48</option>
				        	<option value='64'>64</option>
				        </select>
				        <input type='radio' name='textalign_{{$index}}' ng-click='cmstype.textalign="left"'>
				        <i class='textleft'></i>
				        <input type='radio' name='textalign_{{$index}}' ng-click='cmstype.textalign="center"' checked>
				        <i class='textcenter'></i>
				        <input type='radio' name='textalign_{{$index}}' ng-click='cmstype.textalign="right"'>
				        <i class='textright'></i>
				        <i class='textcolor' ng-style='cmstype.color | iColor' ng-click='colors=!colors'>
					        <colors ng-show='colors' ng-hide='!colors'>
					        	<i class='yellow' ng-click='cmstype.color="#FFFF00";stopProp($event);colors=false'></i>
					        	<i class='red' ng-click='cmstype.color="#FF0000";stopProp($event);colors=false'></i>
					        	<i class='blue' ng-click='cmstype.color="#00FF00";stopProp($event);colors=false'></i>
					        </colors>
					    </i>
				        <select ng-model='cmstype.type' class='type1'>
				        	<option value=''>-出字方式-</option>
				        	<option value='1' ng-selected='1'>立即显示</option>
				        	<!-- <option value='2'>从右到左</option> -->
				        	<!-- <option value='3'>自下而上</option> -->
				        </select>
				        <select ng-model='cmstype.time' class='type2'>
				        	<option value=''>-停留时间-</option>
				        	<option value='3' ng-selected='selected'>3"</option>
				        	<option value='4'>4"</option>
				        	<option value='5'>5"</option>
				        	<option value='6'>6"</option>
				        	<option value='8'>8"</option>
				        	<option value='10'>10"</option>
				        	<option value='12'>12"</option>
				        	<option value='15'>15"</option>
				        </select>
				        <i class='icon' ng-click='icons=!icons'>
					        <icons ng-show='icons' ng-hide='!icons'>
					        	<i ng-click='cmstype.icon=icon;stopProp($event);' ng-repeat='icon in iconsArr' title={{icon}} ng-style='icon | setIcon:iconsAddr'></i>
					        	<i ng-click='cmstype.icon="";stopProp($event);' title='取消图片' class='delIcon'></i>
					        </icons>
					    </i>
				    </btns>
				    <textarea ng-model='cmstype.editModel' cmstextarea enterposi enterrow></textarea>
				</multitxta>
			</div>
		</div>
		<footer>
			<btns>
				<p ng-click='modelUpdate(modelTypeUpdate);cancelEditModel()'>保存</p>
				<p ng-click='cancelEditModel()'>取消</p>
			</btns>
		</footer>
	</cmsedit>
</div>