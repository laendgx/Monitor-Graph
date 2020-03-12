<%@ page pageEncoding='UTF-8'%>
<polaside customAttr='scroll'>
	<polscroll custombody='normal'>
		<filtrate>
			<header>路线</header>
			<filbtn ng-repeat='line in pandect.routeLinesList'>
				<input type='checkbox' name='line' ng-model='pandectJson.lines[$index]' ng-true-value='"{{line.adminId}}"' ng-false-value='' ng-click='resetFiltrate(30);totalDev()'>
				<span>{{line.adminId}}{{line.adminName | cutname}}</span>
			</filbtn>
		</filtrate>
		<filtrate>
			<header>路段</header>
			<filbtn ng-repeat='road in pandect.roadInfoList'>
				<input type='checkbox' name='road' ng-model='pandectJson.roads[$index]' ng-true-value='"{{road.roadid}}"' ng-false-value='' ng-click='resetFiltrate(30);totalDev()'>
				<span>{{road.roadname}}</span>
			</filbtn>
		</filtrate>
		<filtrate>
			<header>位置</header>
			<filbtn ng-repeat='posi in pandect.devicePositionList'>
				<input type='checkbox' name='posi' ng-model='pandectJson.position[$index]' ng-true-value='"{{posi.dicValue}}"' ng-false-value='' ng-click='resetFiltrate(30);totalDev()'>
				<span>{{posi.dicName}}</span>
			</filbtn>
		</filtrate>
		<filtrate>
			<header>方向</header>
			<filbtn ng-repeat='direct in pandect.deviceDirectList'>
				<input type='checkbox' name='direct' ng-model='pandectJson.direct[$index]' ng-true-value='"{{direct.dicValue}}"' ng-false-value='' ng-click='resetFiltrate(30);totalDev()'>
				<span>{{direct.dicName}}</span>
			</filbtn>
		</filtrate>
		<filtrate>
			<header>类型</header>
			<filbtn ng-repeat='type in pandect.cmsTypeList'>
				<input type='checkbox' name='type' ng-model='pandectJson.types[$index]' ng-true-value='"{{type.dicValue}}"' ng-false-value='' ng-click='resetFiltrate(30);totalDev()'>
				<span>{{type.dicName}}</span>
			</filbtn>
		</filtrate>
		<filtrate class='reset'>
			<filbtn>
				<span ng-click='resetPandect()'>重置</span>
			</filbtn>
		</filtrate>
	</polscroll>
	<maxpol></maxpol>
	<minpol></minpol>
</polaside>