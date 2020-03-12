(function(angular){

	var controllers = angular.module('app.controllers', []);

	controllers.controller('stationsController', ['$scope', 'https', 'statdata', function($scope, https, statdata){

        $scope.nav = statdata.nav;
        $scope.tables = statdata.tables;
        $scope.charts = statdata.charts;
        $scope.tabs = true;

        $scope.changeTabs = function(){
            $scope.tabs = !$scope.tabs;
        };

        $scope.linefn = function(id, data){
            var _data = data;
            var chartArea = echarts.init(document.getElementById(id)),
                option = getOption();
            window.onresize = chartArea.resize;
            chartArea.setOption(option);
            function getOption(){
                var option = {
                    title: {
                        text: _data.title,
                        textStyle: {
                            color: '#929292',
                            fontSize: 13
                        },
                        left: 16,
                        top: 7
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: '26%',
                        left: '3%',
                        right: '3%',
                        bottom: '4%',
                        containLabel: true,
                        // backgroundColor: 'rgba(0,0,0,0)'
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: _data.xAxis,
                        axisLabel:{
                            interval: 1,
                            rotate: 0
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name :  _data.unit,
                            axisLabel: {
                                formatter: '{value}'
                            },
                            splitLine:{
                                show: false
                            },
                        }
                    ],
                    series : [
                        {
                            name: '车流量',
                            type: 'line',
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {offset: 0, color: 'rgba(24,144,255,.7)'},
                                            {offset: 1, color: 'rgba(24,144,255,0)'}
                                        ]
                                    )
                                }
                            },
                            data: _data.data,
                            itemStyle:{
                                normal:{
                                    color:'#1890ff'
                                }
                            },
                            symbolSize: 0,
                            smooth: true
                        }
                    ]
                };
                return option;
            }
        };
	}])
})(angular);
