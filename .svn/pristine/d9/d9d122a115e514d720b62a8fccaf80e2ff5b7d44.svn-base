<%@ page pageEncoding="UTF-8"%>
<div>
	<button ng-click='editWindow=!editWindow'>Add</button>
	<t-edit></t-edit>
	<div type='cmslist' ng-repeat='cmslist in cmsTextList' ng-click='showCms(cmslist.guid)'>{{cmslist.text}}</div>
	<button ng-click='sendCms()'>Send</button>
	<button ng-click='clearCms()' ng-if='cmsTimerClear'>Clear</button>
    <cms-tpl cplist='cpList' bcmsstyle='bcmsStyle'></cms-tpl>
    <status>
    	<p ng-repeat="status in statuslist">{{status.text}}</p>
    </status>
</div>  

