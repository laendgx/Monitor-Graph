(function(angular){

	var controllers = angular.module('app.controllers', []);

	controllers.controller('indexController', ['$scope', '$interval', '$timeout', '$http', 'socket', function($scope, $interval, $timeout, $http, socket){

        /* socket.io */
        socket.on("connect", function(){
            // console.log('Client has connected to the server!');
        });
        
        socket.on("disconnect", function(){
            // console.log('The client has disconnected!');
        });
        
        //数据
        socket.on("uploaddataEvent", function(data){
            var boo = $scope.uploadData(data);
            if(!boo){
                var timer = $interval(function(){
                    if($scope.io){
                        $scope.uploadData(data);
                        $interval.cancel(timer);
                    }
                }, 100);
            }
        });
        
        //告警
        socket.on("alertinfoEvent", function(data){
            var boo = $scope.uploadStatus(data);
            if(!boo){
                var timer = $interval(function(){
                    if($scope.io){
                        $scope.uploadStatus(data);
                        $interval.cancel(timer);
                    }
                }, 100);
            }
        });
        /* socket.io END */

        $scope.io = false;              // 动态数据可以整合的标志
        $scope.getdataJson = {};        // http获取数据时，所需的条件数据
        $scope.cmsBasicInf = {};        // 存储情报板基本信息
        $scope.deviceMap = new Map();   // 
        $scope.devDictionary = new Map();// 

        $scope.alertArr = [100000,100001];// 正常状态码
        $scope.alertCloseTime = '1970-01-01 00:00:00';// 正常状态码

        $scope.alertsArr = [];
        $scope.alertsCount = 0;
        $scope.alertsShow = {
            devName: '',
            devAddr: '',
            devPegNo: '',
            devType: '',
            alertTime: '',
            alertType: ''
        };
        $scope.alertsFlag = false;

        // 获取基本信息
        $scope.cbiThen = function(data){
            // 获取设备的采集变量信息
            $scope.getdata('/cms/getCmsDeviceVarValueInfos.from', JSON.stringify($scope.getdataJson), $scope.cbiLast, data.data);
        };

        // 编辑设备属性，用于显示
        $scope.cbiLast = function(data){
            var _data = data.data;
            $scope.prevdata = data.successData;
            // 基本信息
            $scope.cmsBasicInf.cms = [];
            for(var i = 0, l = $scope.prevdata.length; i < l; i++){
                $scope.prevdata[i].deviceVar = {};
                $scope.prevdata[i].status = {
                    alertType: {},
                    alertTypeArr: [],
                    alertArr: [],
                    alertText: '正常',
                    alertColor: '#029d0c',
                    alertdatetime: ''
                };
                var _prevdata = i;
                $scope.cmsBasicInf.cms.push($scope.prevdata[i]);
                $scope.deviceMap.put($scope.prevdata[i].orgId + '' + $scope.prevdata[i].deviceId, _prevdata);
            }
            for(var i = 0, l = _data.length; i < l; i++){
                var _key = _data[i].orgId + '' + _data[i].deviceId,
                    _deviceX = $scope.deviceMap.get(_key);
                $scope.cmsBasicInf.cms[_deviceX].deviceVar[(_data[i].typeId + '')] = _data[i];
            }
            $scope.io = true;
        };

        $scope.uploadData = function(resp){
            if(!$scope.io){
                return $scope.io;
            }
            var data = (JSON.parse(resp)).datalist,
                browseArr = [];
            for(var i = 0, l = data.length; i < l; i++){
                var key = data[i].orgid + '' + data[i].deviceid,
                    deviceX = $scope.deviceMap.get(key),
                    browseNo = deviceX.devX,
                    device = $scope.cmsBasicInf.cms[deviceX],
                    devicevar = device.deviceVar;
                for(var j in devicevar){
                    if(devicevar[j].deviceVarId == data[i].deivcevarid && typeof(eval(data[i].devicevarvalue)) == 'object'){
                        devicevar[j].deviceVarDateTime = data[i].devicevardatetime;
                        devicevar[j].deviceVarValue = eval(data[i].devicevarvalue);
                        break;
                    }
                }
            }
            return $scope.io;
        };

        $scope.uploadStatus = function(resp){
            if(!$scope.io){
                return $scope.io;
            }
            var data = (JSON.parse(resp)).alertlist;
            for(var i = 0, l = data.length; i < l; i++){
                var key = data[i].orgid + '' + data[i].deviceid,
                    deviceX = $scope.deviceMap.get(key);
                var status = $scope.cmsBasicInf.cms[deviceX].status;
                if(status.alertType[data[i].devicevartype]){
                    if($.inArray(data[i].alertid, $scope.alertArr) >= 0){
                        delete status.alertType[data[i].devicevartype];
                        var _jsonN = $.inArray(data[i].alertDesc, status.alertArr);
                        status.alertArr.splice(_jsonN, 1);
                    } else {
                        status.alertType[data[i].devicevartype].id = data[i].alertid;
                        status.alertType[data[i].devicevartype].desc = data[i].alertDesc;
                        status.alertType[data[i].devicevartype].alertTime = data[i].alertdatetime;
                        status.alertType[data[i].devicevartype].alertLevel = $scope.devDictionary[data[i].alertid].alertLevelDesc;
                        status.alertType[data[i].devicevartype].alertType = $scope.devDictionary[data[i].alertid].alertTypeDesc;
                    }
                } else {
                    if($.inArray(data[i].alertid, $scope.alertArr) < 0){
                        status.alertType[data[i].devicevartype] = {};
                        status.alertType[data[i].devicevartype].id = data[i].alertid;
                        status.alertType[data[i].devicevartype].desc = data[i].alertDesc;
                        status.alertType[data[i].devicevartype].alertTime = data[i].alertdatetime;
                        status.alertType[data[i].devicevartype].alertLevel = $scope.devDictionary[data[i].alertid].alertLevelDesc;
                        status.alertType[data[i].devicevartype].alertType = $scope.devDictionary[data[i].alertid].alertTypeDesc;
                        status.alertArr.push(data[i].alertDesc);
                    }
                }
                status.alertTypeArr = [];
                for(var atn in status.alertType){
                    status.alertTypeArr.push(status.alertType[atn]);
                }
                if($.isEmptyObject(status.alertType)){
                    status.alertText = '正常';
                    status.alertColor = '#029d0c';
                } else {
                    status.alertText = '故障';
                    if(status.alertArr.length === 1){
                        status.alertText = status.alertArr[0];
                    }
                    status.alertColor = '#ff0000';
                }
            }
            $scope.alertsArr = [];
            for(var i = 0, l = $scope.cmsBasicInf.cms.length; i < l; i++){
                if($scope.cmsBasicInf.cms[i].status.alertTypeArr.length > 0){
                    for(var j = 0, jl = $scope.cmsBasicInf.cms[i].status.alertTypeArr.length; j < jl; j++){
                        if(!timeContrast($scope.cmsBasicInf.cms[i].status.alertTypeArr[j].alertTime)){
                            continue;
                        }
                        var asjson = {};
                        asjson.devName = $scope.cmsBasicInf.cms[i].deviceName;
                        asjson.devAddr = $scope.cmsBasicInf.cms[i].orgName + $scope.cmsBasicInf.cms[i].roadName + $scope.cmsBasicInf.cms[i].routeLineName;
                        asjson.devPegNo = $scope.cmsBasicInf.cms[i].devicePegNo;
                        asjson.devType = $scope.cmsBasicInf.cms[i].cmsTypeDesc + $scope.cmsBasicInf.cms[i].cmsSizeDesc;
                        asjson.alertTime = $scope.cmsBasicInf.cms[i].status.alertTypeArr[j].alertTime;
                        asjson.alertType = '';
                        for(var k = 0, kl = $scope.cmsBasicInf.cms[i].status.alertArr.length; k < kl; k++){
                            asjson.alertType += $scope.cmsBasicInf.cms[i].status.alertArr[k];
                            if(k + 1 != kl){
                                asjson.alertType += '、';
                            }
                        }
                        $scope.alertsArr.push(asjson);
                    }
                }
            }
            $scope.alertsCount = 0;
            $scope.alertsShow = $scope.alertsArr[$scope.alertsCount];
            if($scope.alertsArr.length > 0){
                $scope.alertsFlag = true;
                $('.devAlerts').removeClass('alert-back-animate');
                $('.devAlerts').addClass('alert-animate');
            }
            return $scope.io;

            function timeContrast(time){
                var _old = new Date($scope.alertCloseTime).getTime();
                var _new = new Date(time).getTime();
                var _boon = (_new > _old);
                return _boon;
            }
        };

        // 重置滚动条
        $scope.resetScroll = function(time){
            $timeout(function(){
                customFunc();
            }, time);
        };

        $scope.stopProp = function($event){
            $event.stopPropagation();
        };

        $scope.setDictionarys = function(data){
            var dic = data.data;
            if(dic.resultCode == '100'){
                for(var i = 0, l = dic.resultData.length; i < l; i++){
                    $scope.devDictionary[dic.resultData[i].alertId] = dic.resultData[i];
                }
            }
        };

        $scope.changeAlerts = function(flag){
            if(flag === 'next'){
                if($scope.alertsCount === $scope.alertsArr.length - 1){
                    return;
                }
                $scope.alertsCount++;
                $scope.alertsShow = $scope.alertsArr[$scope.alertsCount];
            }
            if(flag === 'prev'){
                if($scope.alertsCount === 0){
                    return;
                }
                $scope.alertsCount--;
                $scope.alertsShow = $scope.alertsArr[$scope.alertsCount];
            }
        };

        $scope.closeAlerts = function(){
            $('.devAlerts').removeClass('alert-animate');
            $('.devAlerts').addClass('alert-back-animate');
            $scope.alertCloseTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
        };

        // http方法（通用）
        $scope.getdata = function(url, data, successFn, successData, errorFn, errorData){
            $http({
                method: 'POST',
                url: basepath + url + '?ran=' + Math.random(),
                data: data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }  
            })
            .then(function(resp){
                if(successFn && successFn != null){
                    resp.successData = successData;
                    successFn(resp);
                }
            }, function(resp){
                if(errorFn && errorFn != null){
                    resp.errorData = errorData;
                    errorFn(resp);
                }
            });
        };

        $(window).ready(function(){
            $scope.getdata('/alert/getAllAlertDictionarys.from', JSON.stringify($scope.getdataJson), $scope.setDictionarys);
            // 获取设备基本信息
            $scope.getdata('/cms/getCmsBasicInfos.from', JSON.stringify($scope.getdataJson), $scope.cbiThen);
        });
	}])
})(angular);

