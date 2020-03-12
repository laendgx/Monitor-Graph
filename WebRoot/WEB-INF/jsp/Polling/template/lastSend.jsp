<%@ page pageEncoding="UTF-8"%>
<listwrap ng-show='lastSandFn()' ng-hide='!lastSandFn()'>
	<header listheader>
		<!-- <input type='checkbox' id=''> -->
		<label for=''>最新发布</label>
	</header>
	<listarea listarea>
		<browse ng-repeat='device in cmsLastInf track by $index' devtpl ng-show='deviceshow(pandectFlag, device)' ng-hide='!(deviceshow(pandectFlag, device))'>
		    <header>
		        <input type='checkbox' id='{{device.deviceId}}' ng-model='device.inp' ng-true-value=true ng-false-value=false ng-click='ich(device.deviceId, device.orgId, device.inp)'>
		        <label for='{{device.deviceId}}'>{{device.deviceName}}</label>
		        <status ng-style='device.status | setstatuscolor'>{{device.status.alertText}}</status>
		    </header>
			<bpreview setstop stop='false' count=0>
		        <bcwrap ng-style='device.cmsSizeDesc | setbcstyle' eventstop>
		            <bcms>
		            	<pwrap ng-repeat='pols in device.deviceVar[device.issuedTypeId].deviceVarValue track by $index' count='{{$index}}' cpp delay='{{pols.timeDelay}}' ndelay='{{pols.timeDelay}}' ctype='{{pols.transition}}'>
		            		<picon ng-style='pols.graphList | showIcon:device.cmsSizeDesc:iconsAddr'></picon>
		            		<p ng-style='pol | pStyle' ng-repeat='pol in pols.wordList'>{{pol.wordContent}}</p>
		            	</pwrap>
		            </bcms>
		        </bcwrap>
		    </bpreview>
		    <cnav tips>
		    	<p ng-repeat='index in device.deviceVar[device.issuedTypeId].deviceVarValue track by $index' tip='{{$index}}' type='polling'>{{$index + 1}}</p>
		    </cnav>
		    <bottombar>
		    	<span ng-click='showDetails(device)'>详细</span>
		    	<span ng-click='showCmsInfo(device)'>修改节目单</span>
		    </bottombar>
		</browse>
	</listarea>
</listwrap>