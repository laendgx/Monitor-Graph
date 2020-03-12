(function(angular) {

	var services = angular.module('app.services', []);

	services
	.factory('statdata', [ '$http', function($http) {
		var tablesData = [
			{
				title: '气象站',
				type: 1,
				tableHead: [{wid:'2%',name:'序号'},				{wid:'6%',name:'编号'},				{wid:'8%',name:'位置'},
							{wid:'4%',name:'数据更新时间'},		{wid:'3%',name:'大气温度(℃)'},		{wid:'3%',name:'相对湿度'},
							{wid:'3%',name:'风速(m/s)'},			{wid:'3%',name:'降雨量(mm)'},		{wid:'3%',name:'能见度(m)'},
							{wid:'3%',name:'路面温度(℃)'},		{wid:'3%',name:'路面状况'},    		{wid:'2%',name:'操作'}],
				tableLine: []
			}
		];
		for(var i = 0; i < 6; i++){
			var _json = {
				num: '',
				serial: '',
				location: '',
				time: '',
				temperature: '',
				humidity:'',
				windspeed: '',
				rainfall: '',
				visibility: '',
				pavetemperature: '',
				status: '',
				operation: ''
			};

			tablesData[0].tableLine[i] = randomJson(i + 1, _json);
		}

		function randomJson(i, json){
			for(var item in json){
				var _random = parseInt(Math.random() * 90 + 10);
				json[item] = _random;
			}
			json.humidity = parseInt(Math.random() * 40 + 10) + '%';
			json.windspeed = parseInt(Math.random() * 9000 + 1000);
			json.num = i;
			json.serial = 'WD00' + i;
			json.location = '锡张高速  K999+999 红山立交通辽方向出口前';
			json.time = '2018-05-05 17：55';
			json.status = (Math.random() >= 0.5) ? '干燥' : '潮湿';
			json.operation = '<a href="javascript:;">详细</a>';
			return json;
		}

		var chartsData = [];
		var chartJson = {
			name: '',
			chart: {
				title: '过去一小时气温走势',
				xAxis: [],
				data: [],
				unit: '℃'
			},
			position: 'G16 锡张高速  K100+100',
			status: '',
			visibility: '',
			windspeed: '',
			rainfall: '',
			type: '',
			chartid: ''
		};

		for(var i = 0; i < 6; i++){
			var _new_json = randomChart(i, JSON.parse(JSON.stringify(chartJson)));
			chartsData.push(_new_json);
		}

		function randomChart(i, json){
			json.name = 'WD00' + i;
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
			json.visibility = '--';
			json.windspeed = '--';
			json.rainfall = '--';
			if(type >= 0.2){
				json.visibility = parseInt(Math.random() * 90 + 10) + 'm';
				json.windspeed = parseInt(Math.random() * 9000 + 1000) + 'm/s';
				json.rainfall = parseInt(Math.random() * 90 + 10) + 'mm';
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
				}
			],
			tables: tablesData,
			charts: chartsData
		};
	} ])
})(angular);