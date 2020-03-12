(function(angular){

	var controllers = angular.module('app.controllers', []);

	controllers.controller('configController', ['$scope', '$interval', '$timeout', '$http', 'socket', function($scope, $interval, $timeout, $http, socket){

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
            
        //发送标志
        socket.on("sendflagEvent", function(data){
            $scope.sendflag(data);
        });
        /* socket.io END */

        $scope.editHeader = false;      // 判断显示标志
        $scope.cmsPosition = false;     // 判断是否进入组态功能
        $scope.io = false;              // 动态数据可以整合的标志
        $scope.getdataJson = {};        // http获取数据时，所需的条件数据
        $scope.cmsBasicInf = {};        // 存储情报板基本信息
        $scope.cmsInfo = {};            // 存储选择的情报板信息
        $scope.deviceMap = new Map();   // 
        $scope.devDictionary = new Map();// 
        $scope.cmsTimer = '';           // 选择的情报板的轮巡定时器
        $scope.cmsProgram = [];         // 用于存放选择的情报板的节目单
        $scope.cmsTabp = [];            // 用于存放选择的情报板的节目单下标
        $scope.editModel = [];          // 存放临时模型

        $scope.pandect = '';            // 存储筛选条件
        $scope.cmsLastInf = [];         // 存储最新发布情报板基本信息
        $scope.cmsCount = 0;            // 情报板数量
        $scope.cmsChecked = [];         // 存储被选择的情报板信息
        $scope.patrolBegin = true;      // 巡检启动标志，防止多次启动 
        $scope.patrolTimer = '';        // 巡检定时器
        $scope.browse = [];             // 巡检定模型盒子
        $scope.alertArr = [100000,100001];// 正常状态码
        $scope.pandectJson = {          // 存储筛选项信息
            lines: [],
            roads: [],
            position: [],
            direct: [],
            types: []
        };

        $scope.addToInfo = [];          // 存储情报板基本信息
        $scope.colors = false;
        $scope.icons = false;
        $scope.viewid = 'cmscompile';
        $scope.compile = false;
        $scope.cmsTpl = true;
        $scope.cmsList = false;
        $scope.modelList = false;
        $scope.inputPosi = true;
        $scope.aeFlag = 'add';
        $scope.msgarr = [];
        $scope.setNewCmsCount = -1;
        $scope.oldCms = '';
        $scope.iconArr = [];

        $scope.iconsArr = [];
        $scope.iconsAddr = '';
        $scope.lastSendTime = 0;
        $scope.oldCmsStr = '';          // 存放旧情报板信息
        $scope.modelUseList = [];       // 存放可使用的模板

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
            $scope.cmsCount = $scope.prevdata.length;
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
                        complete(devicevar[j].deviceVarDateTime, device);
                        break;
                    }
                }
                if(!$scope.patrolBegin){
                    for(var k = 0, kl = deviceX.lineX; k < kl; k++){
                        browseNo = parseInt(browseNo) + $scope.cmsBasicInf[k].length;
                    }
                    browseArr.push(browseNo);
                }
            }

            function complete(time, dev){
                var _time = (new Date(time)).getTime();
                if(_time >= $scope.lastSendTime){
                    if(_time > $scope.lastSendTime){
                        $scope.lastSendTime = _time;
                        $scope.cmsLastInf = [];
                    }
                    var i = 0, l = $scope.cmsLastInf.length;
                    for(; i < l; i++){
                        if($scope.cmsLastInf[i].orgId + '' + $scope.cmsLastInf[i].deviceId == dev.orgId + '' + dev.deviceId){
                            break;
                        }
                    }
                    if(i === l){
                        $scope.cmsLastInf.push(dev);
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
            return $scope.io;
        };

        $scope.issue = function(devinfo, id){
            var sendTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
            $scope.cmsLastInf = [];
            $scope.cmsLastInf.push(devinfo);
            var cjson = $scope.setNewCms(devinfo, id, $scope.setNewCmsCount);
            cjson = $scope.resetDispScrType(cjson, devinfo.cmsColor);
            $scope.setAddToDev(cjson);
            var msgarr = JSON.stringify($scope.msgarr);
            $scope.replaceSendDevice($scope.cmsLastInf);
            $scope.issueTimerFn($scope.cmsLastInf);
            msgarr = $scope.replaceSendTime(msgarr, sendTime);
            socket.emit('controlevent', msgarr);
            $scope.compile = false;
            $interval.cancel($scope.cmsTimer);
            $scope.setNewCmsCount = -1;
            $scope.msgarr = [];
        };

        // 
        $scope.resetDispScrType = function(jsonStr, type){
            var json = JSON.parse(jsonStr);
            for(var i = 0, l = json.length; i < l; i++){
                json[i].dispScrType = parseInt(type);
            }
            return JSON.stringify(json);
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

        $scope.changeCmsInfo = function(attr, val){
            var in_str = 'fontColor fontSize_HH fontSize_WW';
            if($scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue == null){
                $scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue = [];
                $scope.setNewCmsCount = 0;
            }
            var json = $scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue[$scope.setNewCmsCount];
            if(in_str.indexOf(attr) >= 0){
                for(var i = 0, l = json.wordList.length; i < l; i++){
                    json.wordList[i][attr] = val;
                    if(attr.indexOf('Size') >= 0){
                        json.wordList[i].fontSize_HH = val
                    }
                }
            }
        };

        $scope.getIconArr = function(resp){
            $scope.iconsArr = resp.data.iconNameList;
            $scope.iconsAddr = basepath + resp.data.absoluteAddr;
        };

        $scope.setDictionarys = function(data){
            var dic = data.data;
            if(dic.resultCode == '100'){
                for(var i = 0, l = dic.resultData.length; i < l; i++){
                    $scope.devDictionary[dic.resultData[i].alertId] = dic.resultData[i];
                }
            } else {
                console.log(dic.resultCode);
            }
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

            $scope.getdata('/cms/getCmsIcons.from', JSON.stringify($scope.getdataJson), $scope.getIconArr);
        });
	}])
})(angular);

