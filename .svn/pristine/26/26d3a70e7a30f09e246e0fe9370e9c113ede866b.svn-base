(function(angular) {

	var services = angular.module('app.services', []);

	services
	.factory('statdata', [ '$http', function($http) {
		var tablesData = [
			{
				title: '一类交调站',
				type: 1,
				tableHead: [{wid:'2%',name:'序号'},				{wid:'6%',name:'编号'},				{wid:'8%',name:'位置'},
							{wid:'4%',name:'数据更新时间'},		{wid:'3%',name:'车道'},				{wid:'3%',name:'跟车百分比'},
							{wid:'3%',name:'时间占有率'},		{wid:'3%',name:'平均车头间距(米)'},	{wid:'3%',name:'小客车流量'},
							{wid:'3%',name:'小客车平均速度'},		{wid:'3%',name:'大客车流量'},    	{wid:'3%',name:'大客车平均速度'},
							{wid:'3%',name:'小型货车流量'},		{wid:'3%',name:'小型货车平均速度'},	{wid:'3%',name:'中型货车流量'},
							{wid:'3%',name:'中型货车平均速度'},	{wid:'3%',name:'大型货车流量'},		{wid:'3%',name:'大型货车平均速度'},
							{wid:'3%',name:'其他车型车流量'},		{wid:'3%',name:'其他车型平均速度'}, 	{wid:'2%',name:'操作'}],
				tableLine: []
			},
			{
				title: '二类交调站',
				type: 2,
				tableHead: [{wid:'2%',name:'序号'},				{wid:'5%',name:'编号'},				{wid:'8%',name:'位置'},
							{wid:'4%',name:'数据更新时间'},		{wid:'3%',name:'车道'},				{wid:'3%',name:'跟车百分比'},
							{wid:'3%',name:'时间占有率'},		{wid:'3%',name:'平均车头间距(米)'},	{wid:'3%',name:'小型车流量'},
							{wid:'3%',name:'小型车平均速度'},		{wid:'3%',name:'中型车流量'},		{wid:'3%',name:'中型车平均速度'},
							{wid:'3%',name:'大型车流量'},		{wid:'3%',name:'大型车平均速度'},		{wid:'3%',name:'其他车型车流量'},
							{wid:'3%',name:'其他车型平均速度'}, 	{wid:'2%',name:'操作'}],
				tableLine: []
			}
		];
		for(var i = 0, l = 3; i < l; i++){
			var _json1_in = {
				line: '',
				fperc:'',
				tperc: '',
				gap: '',
				scflow: '',
				scspeed: '',
				lcflow: '',
				lcspeed: '',
				stflow: '',
				stspeed: '',
				mtflow: '',
				mtspeed: '',
				ltflow: '',
				ltspeed: '',
				otherflow: '',
				otherspeed: '',
			};
			var _json2_in = {
				line: '',
				fperc:'',
				tperc: '',
				gap: '',
				stflow: '',
				stspeed: '',
				mtflow: '',
				mtspeed: '',
				ltflow: '',
				ltspeed: '',
				otherflow: '',
				otherspeed: '',
			};
			var _json1 = {
				num: '',
				serial: 'G010L10021010',
				location: '锡张高速  K999+999 红山立交通辽方向出口前',
				time: '2018-05-05 17：55',
				lines: [JSON.parse(JSON.stringify(_json1_in)), JSON.parse(JSON.stringify(_json1_in))],
				operation: '<a href="javascript:;">详细</a>'
			};
			var _json2 = {
				num: '',
				serial: 'G010L10021010',
				location: '锡张高速  K999+999 红山立交通辽方向出口前',
				time: '2018-05-05 17：55',
				lines: [JSON.parse(JSON.stringify(_json2_in)), JSON.parse(JSON.stringify(_json2_in))],
				operation: '<a href="javascript:;">详细</a>'
			};

			tablesData[0].tableLine[i] = randomJson(i + 1, _json1);
			tablesData[1].tableLine[i] = randomJson(i + 1, _json2);
		}

		function randomJson(i, json){
			json.num = i;
			json.serial += i;
			for(var j = 0, l = json.lines.length; j < l; j++){
				for(var item in json.lines[j]){
					var _random = parseInt(Math.random() * 2000 + 200);
					json.lines[j][item] = _random;
				}
				json.lines[j].fperc = parseInt(Math.random() * 99 + 1) + '%';
				json.lines[j].tperc = parseInt(Math.random() * 99 + 1) + '%';
			}
			return json;
		}

		var chartsData = [];
		var chartJson = {
			name: '',
			chart: {
				title: '过去一小时车流量走势',
				xAxis: [],
				data: [],
				unit: '辆'
			},
			position: 'G16 锡张高速  K100+100',
			status: '',
			flow: '',
			perc: '',
			speed: '',
			type: '',
			chartid: ''
		};

		for(var i = 0; i < 6; i++){
			var _new_json = randomChart(i, JSON.parse(JSON.stringify(chartJson)));
			chartsData.push(_new_json);
		}

		function randomChart(i, json){
			json.name = 'G010L10021010' + i;
			json.chartid = 'chart_' + i;
			var _time = (new Date()).format('yyyy-MM-dd hh') + ':00:00';
			var _hour = 60 * 60 * 1000;
			var _minute_5 = 5 * 60 * 1000;
			var _millisecond = (new Date(_time)).getTime() - _hour;
			for(var i = 0; i < 12; i++){
				var _xTime = (new Date(_millisecond + _minute_5 * i)).format('hh:mm');
				json.chart.xAxis.push(_xTime);
				var _yVal = parseInt(Math.random() * 54 + 5);
				json.chart.data.push(_yVal);
			}
			var type = Math.random();
			json.status = (type >= 0.2) ? '正常' : '通讯中断';
			json.type = type.toFixed(0);
			json.flow = '--';
			json.perc = '--';
			json.speed = '--';
			if(type >= 0.2){
				json.flow = parseInt(Math.random() * 24 + 5) + '辆';
				json.perc = parseInt(Math.random() * 49 + 1) + '%';
				json.speed = parseInt(Math.random() * 10 + 40) + 'Km/H';
			}
			return json;
		}

		return {
			nav : [
				{
					title: '路线',
					val: ['G16丹锡高速', 'G306赤凌一级', 'G45大广高速']
				},
				{
					title: '路段',
					val: ['G45赤通线', 'G16赤大线', 'G306赤凌一级公路（赤峰段）', 'G16赤朝线', 'G45赤承线']
				},
				{
					title: '方向',
					val: ['上行', '下行']
				},
				{
					title: '类型',
					val: ['一类', '二类']
				}
			],
			tables: tablesData,
			charts: chartsData
		};
	} ])
})(angular);