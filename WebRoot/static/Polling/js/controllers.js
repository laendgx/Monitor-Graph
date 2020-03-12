(function(angular){

	var controllers = angular.module('app.controllers', []);

	controllers.controller('pollingController', ['$scope', '$http', '$interval', '$timeout', 'socket', function($scope, $http, $interval, $timeout, socket){

        /* socket.io */
        socket.on("connect", function(){
            // console.log('<span class="connect-msg">Client has connected to the server!</span>');
        });
        
        socket.on("disconnect", function(){
            // console.log('<span class="disconnect-msg">The client has disconnected!</span>');
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

        // 
        $scope.getdataJson = {};        // http获取数据时，所需的条件数据
        $scope.pandect = '';            // 存储筛选条件
        $scope.cmsBasicInf = [];        // 存储情报板基本信息
        $scope.cmsLastInf = [];         // 存储最新发布情报板基本信息
        $scope.cmsCount = 0;            // 情报板数量
        $scope.cmsChecked = [];         // 存储被选择的情报板信息
        $scope.io = false;              // 动态数据可以整合的标志
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
        $scope.pandectFlag = {          // 用来判断情报板是否显示的标志，需配合筛选项
            lines: true,
            roads: true,
            position: true,
            direct: true,
            types: true
        };

        $scope.editHeader = false;      // 判断显示标志
        $scope.io = false;              // 动态数据可以整合的标志
        $scope.getdataJson = {};        // http获取数据时，所需的条件数据
        $scope.addToInfo = [];          // 存储情报板基本信息
        $scope.cmsInfo = {};            // 存储选择的情报板信息
        $scope.deviceMap = new Map();   // 
        $scope.cmsTimer = '';           // 选择的情报板的轮巡定时器
        $scope.cmsProgram = [];         // 用于存放选择的情报板的节目单
        $scope.cmsTabp = [];            // 用于存放选择的情报板的节目单下标
        $scope.editModel = [];          // 存放临时模型
        $scope.cmsModel = {
            color: '#FFFF00',
            textalign: 'center',
            family: 'SimHei',
            size: '',
            type: '1',
            time: '3',
            icon: ''
        };           // 
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
        $scope.lastSendTime = 0;        // 记录最新发布时间
        $scope.compileModelTxt = '';    // 记录最新发布时间
        $scope.cmsTypeList = [];        // 存放所有的情报板类型
        $scope.cmsViewList = [];        // 存放所有的情报板类型
        $scope.modelEdit = false;       // 模板编辑部分判断标记
        $scope.modelType = [
            {
                name: '天气提醒',
                type: 1,
            },
            {
                name: '宣传信息',
                type: 2,
            },
            {
                name: '道路信息',
                type: 3,
            },
            {
                name: '管制信息',
                type: 4,
            }
        ];
        $scope.modelTypeId = '';
        $scope.modelTypeName = '';
        $scope.modelTypeList = [];
        $scope.modelBasicList = [];     // 存放所有模板
        $scope.modelUseList = [];       // 存放可使用的模板
        $scope.modelTypeUpdate = true;  // 模板编辑添加修改标志
        $scope.searchKeyWord = '';      // 模板查询关键字
        $scope.modview = false;         // 模板预览框显示标志
        $scope.oldCmsStr = '';          // 存放旧情报板信息
        $scope.details = false;         // 详细信息显示标志
        // $scope.modelColor = '#FFFF00';  // 使用的模板的颜色

        // Fn
        // 选择或取消选择情报板
        $scope.ich = function(dev, org, val){
            if(val){
                $scope.cmsChecked.push(org + '' + dev);
                return;
            }
            if(!val){
                while($.inArray((org + '' + dev), $scope.cmsChecked) >= 0){
                    $scope.cmsChecked.splice($.inArray((org + '' + dev), $scope.cmsChecked), 1);
                }
            }
        };
        
        // 存储筛选条件
        $scope.pandectThen = function(data){
            $scope.pandect = data.data;
        };

        // 设备筛选
        $scope.deviceshow = function(pandect, device){
            var road = pandect.roads, position = pandect.position, direct = pandect.direct, types = pandect.types,
                droad = device.roads, dposition = device.position, ddirect = device.direct, dtypes = device.types;
            if(road && position && direct && types){
                return true;
            } else {
                var _arr = [road, position, direct, types],
                    _arr_dev = [droad, dposition, ddirect, dtypes];
                for(var i = 0, l = _arr.length; i < l; i++){
                    if(_arr[i]){
                        _arr_dev[i] = '';
                    }
                }
                var _boo = true;
                for(var i = 0, l = _arr_dev.length; i < l; i++){
                    if(_arr_dev[i] === ''){
                        continue;
                    }
                    _boo = _boo && _arr_dev[i];
                }
                return _boo;
            }
        };

        // 筛选及重置滚动条
        $scope.resetFiltrate = function(time){
            for(var i = 0, l = $scope.cmsBasicInf.length; i < l; i++){
                var val = filtrate($scope.cmsBasicInf[i], $scope.pandectJson);
            }
            filtrateFlag($scope.pandectFlag, $scope.pandectJson);

            function filtrateFlag(val, condition){
                if(condition.lines.length > 0){
                    for(var i = 0, l = condition.lines.length; i < l; i++){
                        if(condition.lines[i] != '' && typeof(condition.lines[i]) != "undefined"){
                            val.lines = false;
                            break;
                        }
                        val.lines = true;
                    }
                }
                if(condition.roads.length > 0){
                    for(var i = 0, l = condition.roads.length; i < l; i++){
                        if(condition.roads[i] != '' && typeof(condition.roads[i]) != "undefined"){
                            val.roads = false;
                            break;
                        }
                        val.roads = true;
                    }
                }
                if(condition.position.length > 0){
                    for(var i = 0, l = condition.position.length; i < l; i++){
                        if(condition.position[i] != '' && typeof(condition.position[i]) != "undefined"){
                            val.position = false;
                            break;
                        }
                        val.position = true;
                    }
                }
                if(condition.direct.length > 0){
                    for(var i = 0, l = condition.direct.length; i < l; i++){
                        if(condition.direct[i] != '' && typeof(condition.direct[i]) != "undefined"){
                            val.direct = false;
                            break;
                        }
                        val.direct = true;
                    }
                }
                if(condition.types.length > 0){
                    for(var i = 0, l = condition.types.length; i < l; i++){
                        if(condition.types[i] != '' && typeof(condition.types[i]) != "undefined"){
                            val.types = false;
                            break;
                        }
                        val.types = true;
                    }
                }
                return val;
            }

            function filtrate(val, condition){
                var _lines = condition.lines.removeNull();
                if(_lines.length > 0){
                    if($.inArray(val.id, _lines) >= 0){
                        val.lines = true;
                    } else {
                        val.lines = false;
                    }
                } else {
                    val.lines = true;
                }

                var _roads = condition.roads.removeNull();
                if(_roads.length > 0){
                    for(var i = 0, l = _roads.length; i < l; i++){
                        if($.inArray(_roads[i], val.roadArr) >= 0){
                            val.roads = true;
                            break;
                        } else {
                            val.roads = false;
                        }
                    }
                    if(val.roads){
                        for(var i = 0, l = val.devices.length; i < l; i++){
                            if($.inArray(val.devices[i].roadId, _roads) >= 0){
                                val.devices[i].roads = true;
                            } else {
                                val.devices[i].roads = false;
                            }
                        }
                    }
                } else {
                    val.roads = true;
                }

                var _position = condition.position.removeNull();
                if(_position.length > 0){
                    val.position = false;
                    for(var i = 0, l = val.devices.length; i < l; i++){
                        if($.inArray(val.devices[i].devicePosition, _position) >= 0){
                            val.devices[i].position = true;
                        } else {
                            val.devices[i].position = false;
                        }
                    }
                } else {
                    val.position = true;
                }

                var _direct = condition.direct.removeNull();
                if(_direct.length > 0){
                    val.direct = false;
                    for(var i = 0, l = val.devices.length; i < l; i++){
                        if($.inArray(val.devices[i].deviceDirect, _direct) >= 0){
                            val.devices[i].direct = true;
                        } else {
                            val.devices[i].direct = false;
                        }
                    }
                } else {
                    val.direct = true;
                }

                var _types = condition.types.removeNull();
                if(_types.length > 0){
                    val.types = false;
                    for(var i = 0, l = val.devices.length; i < l; i++){
                        if($.inArray(val.devices[i].cmsType, _types) >= 0){
                            val.devices[i].types = true;
                        } else {
                            val.devices[i].types = false;
                        }
                    }
                } else {
                    val.types = true;
                }
                return val;
            }

            $timeout(function(){
                customFunc();
            }, time);
        };

        // 
        $scope.totalDev = function(){
            $timeout(function(){
                var n = 0;
                var lists = $('listwrap[normal]');
                for(var j = 0, jl = lists.length; j < jl; j++){
                    if(lists.eq(j).css('display') != 'none'){
                        var browses = lists.eq(j).find('browse');
                        for(var i = 0, l = browses.length; i < l; i++){
                            if(browses.eq(i).css('display') != 'none'){
                                n++;
                            }
                        }
                    }
                }
                $scope.cmsCount = n;
            }, 10);
        };

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
            for(var i = 0, l = $scope.prevdata.length; i < l; i++){
                $scope.prevdata[i].roads = true;
                $scope.prevdata[i].position = true;
                $scope.prevdata[i].direct = true;
                $scope.prevdata[i].types = true;
                $scope.prevdata[i].deviceVar = {};
                $scope.prevdata[i].status = {
                    alertType: {},
                    alertArr: [],
                    alertText: '正常',
                    alertColor: '#029d0c'
                };
                var _prevdata = {};
                var j = 0, jl = $scope.cmsBasicInf.length;
                for(; j < jl; j++){
                    if($scope.cmsBasicInf[j].id == $scope.prevdata[i].routeLineId){
                        if($.inArray($scope.prevdata[i].roadId, $scope.cmsBasicInf[j].roadArr) < 0){
                            $scope.cmsBasicInf[j].roadArr.push($scope.prevdata[i].roadId);
                        }
                        $scope.cmsBasicInf[j].devices.push($scope.prevdata[i]);
                        break;
                    }
                }
                if(j === jl){
                    $scope.cmsBasicInf[jl] = {};
                    $scope.cmsBasicInf[jl].id = $scope.prevdata[i].routeLineId;
                    $scope.cmsBasicInf[jl].name = $scope.prevdata[i].routeLineName;
                    $scope.cmsBasicInf[jl].roadArr = [];
                    $scope.cmsBasicInf[jl].roadArr.push($scope.prevdata[i].roadId);
                    $scope.cmsBasicInf[jl].devices = [];
                    $scope.cmsBasicInf[jl].devices.push($scope.prevdata[i]);
                    $scope.cmsBasicInf[jl].lines = true;
                    $scope.cmsBasicInf[jl].roads = true;
                }
                _prevdata.lineX = j;
                _prevdata.devX = $scope.cmsBasicInf[j].devices.length - 1;
                $scope.deviceMap.put($scope.prevdata[i].orgId + '' + $scope.prevdata[i].deviceId, _prevdata);
            }
            for(var i = 0, l = _data.length; i < l; i++){
                var _key = _data[i].orgId + '' + _data[i].deviceId,
                    _deviceX = $scope.deviceMap.get(_key);
                if(_deviceX){
                    $scope.cmsBasicInf[_deviceX.lineX].devices[_deviceX.devX].deviceVar[(_data[i].typeId + '')] = _data[i];
                }
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
                    device = $scope.cmsBasicInf[deviceX.lineX].devices[deviceX.devX],
                    devicevar = device.deviceVar;
                    setCmsType(device.cmsTypeDesc, device.cmsSizeDesc, device.deviceTypeId);
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

            function setCmsType(type, size, deviceTypeId){
                for(var i = 0, l = $scope.cmsTypeList.length; i < l; i++){
                    if(type == $scope.cmsTypeList[i].cmsType && size == $scope.cmsTypeList[i].cmsSize){
                        return;
                    }
                }
                var json = {};
                json.cmsType = type;
                json.cmsSize = size;
                json.deviceTypeId = deviceTypeId;
                json.modelId = 0;
                json.color = '#FFFF00';
                json.textalign = 'center';
                json.family = 'SimHei';
                json.size = '';
                json.type = '1';
                json.time = '3';
                json.icon = '';
                json.editModel = '';
                json.viewid = 'cmsType_' + ($scope.cmsTypeList.length + 1);
                var json_view = {};
                json_view.cmsType = type;
                json_view.cmsSize = size;
                json_view.deviceTypeId = deviceTypeId;
                json_view.modelId = 0;
                json_view.color = '#FFFF00';
                json_view.textalign = 'center';
                json_view.family = 'SimHei';
                json_view.size = '';
                json_view.type = '1';
                json_view.time = '3';
                json_view.icon = '';
                json_view.editModel = '';
                json_view.viewid = 'cmsType_model_' + ($scope.cmsTypeList.length + 1);
                $scope.cmsTypeList.push(json);
                $scope.cmsViewList.push(json_view);
            }
            $timeout(function(){
                $scope.patrol();
            }, 70);
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
                var status = $scope.cmsBasicInf[deviceX.lineX].devices[deviceX.devX].status;
                if(status.alertType[data[i].devicevartype]){
                    if($.inArray(data[i].alertid, $scope.alertArr) >= 0){
                        delete status.alertType[data[i].devicevartype];
                        var _jsonN = $.inArray(data[i].alertDesc, status.alertArr);
                        status.alertArr.splice(_jsonN, 1);
                    } else {
                        status.alertType[data[i].devicevartype].id = data[i].alertid;
                        status.alertType[data[i].devicevartype].desc = data[i].alertDesc;
                    }
                } else {
                    if($.inArray(data[i].alertid, $scope.alertArr) < 0){
                        status.alertType[data[i].devicevartype] = {};
                        status.alertType[data[i].devicevartype].id = data[i].alertid;
                        status.alertType[data[i].devicevartype].desc = data[i].alertDesc;
                        status.alertArr.push(data[i].alertDesc);
                    }
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

        // 巡检
        $scope.patrol = function(){
            $scope.browse = [];
            var browse = $('cmsscroll').find('browse');
            for(var i = 0, l = browse.length; i < l; i++){
                var _bcms = browse.eq(i).find('bcms');
                var _browse = {};
                _browse.screens = [];
                _browse.tips = [];
                _browse.count = browse.eq(i).find('*[setstop]').attr('count');
                _browse.length = 0;
                _browse.width = _bcms.width();
                _browse.height = _bcms.height();
                if(browse.eq(i).find('pwrap').length > 0){
                    var _pwrap = browse.eq(i).find('pwrap'),
                        _cnav = browse.eq(i).find('cnav').find('p');
                    _browse.length = _pwrap.length;
                    _pwrap.eq(_browse.count).css('right', 0);
                    _cnav.eq(_browse.count).css('width', '16px');
                    for(var j = 0, jl = _pwrap.length; j < jl; j++){
                        _browse.screens.push(_pwrap.eq(j));
                        _browse.tips.push(_cnav.eq(j));
                    }
                }
                $scope.browse.push(_browse);
            }
            if($scope.patrolBegin){
                $scope.patrolBegin = false;
                $scope.patrolTimer = $interval(function(){
                    for(var i = 0, l = $scope.browse.length; i < l; i++){
                        if($scope.browse[i].screens.length > 0){
                            if($scope.browse[i].screens[0].parents('bpreview').attr('stop') == 'true'){
                                continue;
                            }
                            var screen = $scope.browse[i].screens,
                                count = $scope.browse[i].screens[0].parents('bpreview').attr('count'),
                                _screen = screen[count];
                            if(_screen == null){
                                continue;
                            }
                            if(parseInt(_screen.attr('delay')) != 1){
                                _screen.attr('delay', parseInt(_screen.attr('delay')) - 1);
                                continue;
                            }
                            (function(i){
                                var screen = $scope.browse[i].screens,
                                    tips = $scope.browse[i].tips,
                                    count = $scope.browse[i].screens[0].parents('bpreview').attr('count'),
                                    length = $scope.browse[i].length,
                                    width = $scope.browse[i].width,
                                    height = $scope.browse[i].height,
                                    _screen = screen[count],
                                    ctype = _screen.attr('ctype');
                                _screen.attr('delay', _screen.attr('ndelay'));
                                tips[count].animate({'width': '8px'}, 200, 'swing');
                                count++;
                                if(count > length - 1){
                                    count = 0;
                                }
                                immediately(ctype, _screen, screen[count])
                                tips[count].animate({'width': '16px'}, 200, 'swing');
                                $scope.browse[i].count = count;
                                $scope.browse[i].screens[0].parents('bpreview').attr('count', count);
                            })(i);
                        }
                    }
                }, 1000);
            }
        };

        // 重置筛选项
        $scope.resetPandect = function(){
            for(var i in $scope.pandectJson){
                $scope.pandectJson[i] = [];
            }
            for(var i in $scope.pandectFlag){
                $scope.pandectFlag[i] = true;
            }
            $scope.resetScroll(50);
        };

        // 修改节目单
        $scope.showCmsInfo = function(device){
            $scope.compile = true;
            $scope.cmsTpl = true;
            $scope.editModel = '';
            $scope.cmsInfo = device;
            $scope.oldCms = '[]';
            if(device.deviceVar[device.issuedTypeId] && device.deviceVar[device.issuedTypeId] != null){
                $scope.oldCms = JSON.stringify(device.deviceVar[device.issuedTypeId].deviceVarValue);
            }
            $timeout(function(){
                if($scope.cmsTimer != ''){
                    $interval.cancel($scope.cmsTimer);
                }
                $scope.cmsProgram = [];
                $scope.cmsTabp = [];
                var programs = $('cmscompile cms').find('pwrap');
                var props = $('cmscompile cnav').find('p');
                var programl = programs.length;
                if(programl === 0){
                    return;
                }
                for(var i = 0; i < programl; i++){
                    $scope.cmsProgram.push(programs.eq(i));
                    $scope.cmsTabp.push(props.eq(i));
                }
                var oldCount = $('cmscompile preview[count]').attr('count');
                if(!oldCount || oldCount === ''){
                    oldCount = 0;
                }
                $('cmscompile preview[count]').attr('count', 0);
                $scope.cmsProgram[oldCount].css('right', '');
                $scope.cmsTabp[oldCount].css('background-color', '');
                $scope.cmsProgram[0].css('right', 0);
                $scope.cmsTabp[0].css('background-color', '#0069cb');
                $scope.cmsTimer = $interval(function(){
                    var programNow = $('cmscompile preview[count]').attr('count');
                    var pro = $scope.cmsProgram[programNow];
                    if(pro.parents('*[setstop]').attr('stop') === 'true'){
                        return;
                    }
                    pro.animate({'right': '100%'}, 240, 'swing', function(){
                        pro.css('right', '');
                    });
                    $scope.cmsTabp[programNow].css('background-color', '');
                    programNow++;
                    if(programNow > programl - 1){
                        programNow = 0;
                    }
                    $scope.cmsTabp[programNow].css('background-color', '#0069cb');
                    $scope.cmsProgram[programNow].animate({'right': '0'}, 240, 'swing');
                    $('cmscompile preview[count]').attr('count', programNow);
                }, 3000);
            },30);
        };

        // 下发节目单
        $scope.issue = function(devinfo, id){
            var sendTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
            $scope.cmsLastInf = [];
            $scope.cmsLastInf.push(devinfo);
            var cjson = $scope.setNewCms(devinfo, id, $scope.setNewCmsCount);
            cjson = $scope.resetDispScrType(cjson, devinfo.cmsColor);
            $scope.setAddToDev(cjson);
            var msgarr = [], sandarr = [];
            for(var i = 0, l = $scope.msgarr.length; i < l; i++){
                msgarr.push($scope.msgarr[i]);
                if(msgarr.length === 2 || (i + 1) == l){
                    var msgarrStr = JSON.stringify(msgarr);
                    msgarrStr = $scope.replaceSendTime(msgarrStr, sendTime);
                    sandarr.push(msgarrStr);
                    msgarr = [];
                }
            }
            

            $scope.replaceSendDevice($scope.cmsLastInf);
            $scope.issueTimerFn($scope.cmsLastInf);
            for(var i = 0, l = sandarr.length; i < l; i++){
                socket.emit('controlevent', sandarr[i]);
            }
            $scope.compile = false;
            $interval.cancel($scope.cmsTimer);
            $scope.setNewCmsCount = -1;
            $scope.msgarr = [];
        };

        // 还原下发的情报板
        $scope.replaceSendDevice = function(arr){
            for(var i = 0, l = arr.length; i < l; i++){
                $scope.cancelEdit(arr[i]);
            }
        };

        // 下发替换时间
        $scope.replaceSendTime = function(str, time){
            var _str = str.replace(/SendTimeReplaceStr+/g, time);
            return _str;
        };

        // 下发计时
        $scope.issueTimerFn = function(devs){
            for(var i = 0, l = devs.length; i < l; i++){
                devs[i].status.alertText = '发送中';
                devs[i].status.alertColor = '#1098a4';
            }
        };

        // 
        $scope.resetDispScrType = function(jsonStr, type){
            var json = JSON.parse(jsonStr);
            for(var i = 0, l = json.length; i < l; i++){
                json[i].dispScrType = parseInt(type);
            }
            return JSON.stringify(json);
        };

        $scope.setNewCms = function(devinfo, id, ae){
            var cmsdiv = $('#' + id).parent(),
                cmsIcon = $('#' + id + '_icon'),
                cmsList = cmsdiv.find('p'),
                cmsListLast = cmsdiv.find('div').eq(0),
                oldList = devinfo.deviceVar[devinfo.issuedTypeId].deviceVarValue,
                json = {};
            json.displayWidth = parseInt(devinfo.cmsSizeDesc.split('×')[0]);
            json.displayHeight = parseInt(devinfo.cmsSizeDesc.split('×')[1]);
            json.dispScrType = parseInt(devinfo.cmsColor);
            json.timeDelay = parseInt($scope.cmsModel.time);
            json.transition = parseInt($scope.cmsModel.type);
            json.param = 23;
            json.graphList = [];
            json.wordList = [];

            var ijson = {},
                iname = cmsIcon.attr('iname'),
                icount = 0;
            if(iname != ''){
                icount = 1;
                ijson.graphXXX = 0;
                ijson.graphYYY = 0;
                ijson.graphId = iname.split('.')[0];
                json.graphList.push(ijson);
            }

            for(var i = 0, l = cmsList.length + 1; i < l; i++){
                var con;
                if(i + 1 === l){
                    con = cmsListLast;
                } else {
                    con = cmsList.eq(i);
                }
                var cjson = {},
                    ctext = con.html(),
                    ctextLength = getByteLen(ctext),
                    csize = parseInt(con.css('font-size')),
                    cspace = parseInt(con.css('letter-spacing'));
                cjson.wordXXX = (json.displayWidth - json.displayHeight * icount - ctextLength / 2 * csize - (ctext.length - 1) * cspace) / 2 + json.displayHeight * icount;
                cjson.wordYYY = parseInt(con.position().top) - parseInt(cmsdiv.css('padding')) + parseInt(con.css('margin-top'));
                cjson.fontColor = rgb216(cmsdiv.css('color')).replace(/#/g,'');
                cjson.fontBackColor = '00FF00';
                cjson.fontShadowColor = '000000';
                cjson.wordSpace = cspace;
                cjson.fontSize_HH = csize;
                cjson.fontSize_WW = csize;
                cjson.wordContent = ctext;
                cjson.fontName = $scope.returnFamilyType(cmsdiv.css('font-family'));
                json.wordList.push(cjson);
            }
            if(oldList == null){
                oldList = [];
                ae = 0;
            }
            oldList[ae] = json;
            var json_str = JSON.stringify(oldList);

            var msgcontentArr = [];
            var msgcontentjson = {};
            msgcontentjson.collnode = 1;
            msgcontentjson.orgid = devinfo.orgId;
            msgcontentjson.deviceid = devinfo.deviceId;
            msgcontentjson.devicevarid = devinfo.deviceVar[devinfo.issuedTypeId].deviceVarId;
            msgcontentjson.devicetypeid = devinfo.deviceVar[devinfo.issuedTypeId].typeId;
            msgcontentjson.sendcontents = json_str;
            msgcontentjson.senddatetime = "SendTimeReplaceStr";
            msgcontentjson.userid = userId;
            msgcontentArr.push(msgcontentjson);

            var msgjson = {};
            msgjson.msgtype = 'devicectl';
            msgjson.msgcontent = JSON.stringify(msgcontentArr);
            $scope.msgarr = [];
            $scope.msgarr.push(msgjson);
            return json_str;
        };

        // 
        $scope.delCms = function(devinfo){
            var oldList = devinfo.deviceVar[devinfo.issuedTypeId].deviceVarValue,
                count = $scope.setNewCmsCount;
            $scope.setNewCmsCount = -1;
            $scope.editModel = '';
            oldList.splice(count, 1);
            var json_str = JSON.stringify(oldList);
            var msgcontentArr = [];
            var msgcontentjson = {};
            msgcontentjson.collnode = 1;
            msgcontentjson.orgid = devinfo.orgId;
            msgcontentjson.deviceid = devinfo.deviceId;
            msgcontentjson.devicevarid = devinfo.deviceVar[devinfo.issuedTypeId].deviceVarId;
            msgcontentjson.devicetypeid = devinfo.deviceVar[devinfo.issuedTypeId].typeId;
            msgcontentjson.sendcontents = json_str;
            msgcontentjson.senddatetime = "SendTimeReplaceStr";
            msgcontentjson.userid = userId;
            msgcontentArr.push(msgcontentjson);

            var msgjson = {};
            msgjson.msgtype = 'devicectl';
            msgjson.msgcontent = JSON.stringify(msgcontentArr);
            $scope.msgarr = [];
            $scope.msgarr.push(msgjson); 
            $timeout(function(){
                if($('cmscompile edittpl cnav').find('p').length > 0){
                    $('cmscompile edittpl cnav').find('p').eq(0).click();
                }
            }, 10);
            
        };

        // 
        $scope.cancelEdit = function(device){
            if($scope.oldCms == null || $scope.oldCms == '[]'){
                if($scope.oldCms == '[]'){
                    device.deviceVar[device.issuedTypeId] = {};
                }
                device.deviceVar[device.issuedTypeId].deviceVarValue = '';
            } else {
                device.deviceVar[device.issuedTypeId].deviceVarValue = JSON.parse($scope.oldCms);
            }
            for(var i = 0, l = $scope.addToInfo.length; i < l; i++){
                $scope.addToInfo[i].check = false;
            }
            $scope.addToInfo = [];
            $scope.cmsList = false;
            $scope.modelList = false;
            $scope.icons = false;
        };

        $scope.setAddToDev = function(cjson){
            for(var i = 0, l = $scope.addToInfo.length; i < l; i++){
                var _playlist = $scope.rePlayListColor($scope.addToInfo[i], cjson);
                $scope.cmsLastInf.push($scope.addToInfo[i])
                var msgcontentArr = [];
                var msgcontentjson = {};
                msgcontentjson.collnode = 1;
                msgcontentjson.orgid = $scope.addToInfo[i].orgId;
                msgcontentjson.deviceid = $scope.addToInfo[i].deviceId;
                msgcontentjson.devicevarid = $scope.addToInfo[i].deviceVar[$scope.addToInfo[i].issuedTypeId].deviceVarId;
                msgcontentjson.devicetypeid = $scope.addToInfo[i].deviceVar[$scope.addToInfo[i].issuedTypeId].typeId;
                msgcontentjson.sendcontents = _playlist;
                msgcontentjson.senddatetime = "SendTimeReplaceStr";
                msgcontentjson.userid = userId;
                msgcontentArr.push(msgcontentjson);

                var msgjson = {};
                msgjson.msgtype = 'devicectl';
                msgjson.msgcontent = JSON.stringify(msgcontentArr);
                $scope.msgarr.push(msgjson);
            }
        };

        $scope.rePlayListColor = function(dev, playlist){
            var colorType = dev.cmsColor;
            if(colorType === '1' || colorType === '2'){
                var _playlist = JSON.parse(playlist);
                for(var i = 0, l = _playlist.length; i < l; i++){
                    var _wordlist = _playlist[i].wordList;
                    for(var j = 0, jl = _wordlist.length; j < jl; j++){
                        _wordlist[j].fontColor = 'FFFF00';
                    }
                }
                var _new_playlist = JSON.stringify(_playlist);
                return _new_playlist;
            }
            return playlist;
        };

        // 重置滚动条
        $scope.resetScroll = function(time){
            $timeout(function(){
                customFunc();
            }, time);
        };

        $scope.compClose = function(){
            $scope.compile = false;
            $interval.cancel($scope.cmsTimer);
        }

        $scope.inputPosition = function(dev, id){ 
            $scope.setNewCms(dev, id, $scope.setNewCmsCount);
            var cmsJson = {};
            cmsJson.displayWidth = $scope.cmsInfo.cmsSizeDesc.split('×')[0];
            cmsJson.displayHeight = $scope.cmsInfo.cmsSizeDesc.split('×')[1];
            cmsJson.dispScrType = $scope.cmsInfo.cmsColor;
            cmsJson.param = 23;
            cmsJson.timeDelay = 3;
            cmsJson.transition = 1;
            cmsJson.wordList = [];
            cmsJson.graphList = [];
            if($scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue == null 
                || $scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue == ''){
                $scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue = [];
            }
            $scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue.push(cmsJson);
            $scope.setNewCmsCount = $('cmscompile edittpl cnav').find('p').length;
            $scope.editModel = '';
            $scope.cmsModel = {
                color: '#FFFF00',
                textalign: 'center',
                family: 'SimHei',
                size: '',
                type: '1',
                time: '3',
                icon: ''
            };
            $timeout(function(){
                $('cmscompile edittpl cnav').find('p').css('background-color', '');
                $('cmscompile edittpl cnav').find('p').eq($scope.setNewCmsCount).css('background-color', 'rgb(0,105,203)');
            },30);
        };

        $scope.inputsPosi = function(){
            $timeout(function(){
                var inputs = $('cmscompile btns, cmsedit btns').find('input');
                for(var i = 0, l = inputs.length; i < l; i++){
                    var next = inputs.eq(i).next();
                    inputs.eq(i).css({
                        'top': next[0].offsetTop,
                        'left': next[0].offsetLeft
                    });
                }
                if($('cmscompile edittpl cnav').find('p').length > 0){
                    $('cmscompile edittpl cnav').find('p').eq(0).click();
                } else {
                    $('cmscompile footer btns').find('p').eq(0).click();
                }
                
            },20);
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

        $scope.returnFamilyType = function(familyName){
            var familyJson = {
                'SimHei': 'h',
                'SimSun': 's',
                'KaiTi': 'k',
                'h': 'SimHei',
                's': 'SimSun',
                'k': 'KaiTi'
            };
            return familyJson[familyName];
        };

        $scope.cmscompile = function(cms, cmsInfo, viewid, ae){
            if($scope.setNewCmsCount >= 0){
                $scope.setNewCms(cmsInfo, viewid, $scope.setNewCmsCount);
            }
            $('#' + viewid).parent().attr('enternew', 'true');
            $scope.setNewCmsCount = ae;
            var cmsColor = 'yellow',
                family = 'SimHei',
                size = '',
                iconArr = '',
                type = '';
            if(cms.wordList != null && cms.wordList.length > 0){
                cmsColor = cms.wordList[0].fontColor;
                if(cms.wordList[0].fontName != null){
                    family = $scope.returnFamilyType(cms.wordList[0].fontName);
                }
                if(cms.wordList[0].fontSize_HH != null){
                    size = cms.wordList[0].fontSize_HH;
                    for(var i = 1, l = cms.wordList.length; i < l; i++){
                        if(cms.wordList[i].fontSize_HH != size){
                            size = '';
                            break;
                        }
                    }
                }
            }
            if(cms.graphList != null && cms.graphList.length > 0){
                iconArr = cms.graphList[0].graphId + '.PNG';
            }
            type = cms.transition;
            if(cms.transition == 3){
                type = 1;
            }
            $scope.cmsModel = {
                color: cmsColor,
                textalign: 'center',
                family: family,
                size: size + '',
                type: type + '',
                time: cms.timeDelay + '',
                icon: iconArr
            };
            var _html = '';
            for(var i = 0, l = cms.wordList.length; i < l; i++){
                _html = _html + cms.wordList[i].wordContent + '\n';
            }
            $scope.editModel = _html;
        };

        $scope.listChecked = function(dev, check){
            if(check){
                $scope.addToInfo.push(dev);
            } else {
                $scope.addToInfo.splice($.inArray(dev ,$scope.addToInfo), 1);
            }
        };

        $scope.getIconArr = function(resp){
            $scope.iconsArr = resp.data.iconNameList;
            $scope.iconsAddr = basepath + resp.data.absoluteAddr;
        };

        $scope.sendflag = function(str){
            var data = (JSON.parse(str)).sendflaglist;
            for(var i = 0, l = data.length; i < l; i++){
                var key = data[i].orgid + '' + data[i].deviceid,
                    deviceX = $scope.deviceMap.get(key),
                    browseNo = deviceX.devX,
                    device = $scope.cmsBasicInf[deviceX.lineX].devices[deviceX.devX],
                    devStat = device.status;
                devStat.alertText = data[i].sendsucessflagdesc;
                if(data[i].sendsucessflagdesc.indexOf('成功') >= 0){
                    devStat.alertColor = '#029d0c';
                } else if(data[i].sendsucessflagdesc.indexOf('失败') >= 0){
                    devStat.alertColor = '#ff0000';
                }
            }
        };

        // 模板编辑
        $scope.modelEditFn = function(type){
            $scope.modelTypeUpdate = true;
            $scope.modelEdit = !$scope.modelEdit;
            var timer = $interval(function(){
                if($('cmsedit').height() && $('cmsedit').height() > 10){
                    customFunc();
                    $interval.cancel(timer);
                }
            },20,100);
        };

        // 模板选中
        $scope.compileModel = function(type){
            if(type.editModel == ''){
                type.editModel = $scope.compileModelTxt;
            }
        };

        // 模板储存 和 修改
        $scope.modelUpdate = function(update){
            var guid = NewGuid(),
                url = "/cms/insertCmsFixedCommand.from?ran=",
                urlInUp = "/cms/insertCmsFixedCommand.from?ran=",
                urlDel = "/cms/deleteCmsFixedCommands.from?ran=",
                modelArr = [],
                modelInUp = [],
                modelDel = [];
            if(!update){
                url = "/cms/updateCmsFixedCommands.from?ran=";
            }
            for(var i = 0, l = $scope.cmsTypeList.length; i < l; i++){
                var _json = {};
                _json.commandId = $scope.cmsTypeList[i].modelId;
                _json.commandName = $scope.compileModelTxt;
                _json.commandType = $scope.cmsTypeList[i].deviceTypeId;
                _json.groupId =  $scope.modelTypeId + '';
                _json.groupName = '';
                _json.fixValue = 0;
                _json.command = setModel($scope.cmsTypeList[i]);
                _json.guid = guid;
                if(!update){
                    _json.guid = $scope.cmsTypeList[i].guid;
                }
                if(_json.command == false){
                    modelDel.push($scope.cmsTypeList[i].modelId);
                    continue;
                }
                if(!update && _json.commandId == 0){
                    for(var j = 0, jl = $scope.cmsTypeList.length; j < jl; j++){
                        if($scope.cmsTypeList[j].guid && $scope.cmsTypeList[j].guid != ''){
                            _json.guid = $scope.cmsTypeList[j].guid;
                            break;
                        }
                    }
                    modelInUp.push(_json);
                } else {
                    modelArr.push(_json);
                }
                
            }
            if(modelArr.length === 0){
                return;
            }
            $scope.getdata(url, JSON.stringify(modelArr), $scope.resetModelList);
            if(!update && modelInUp.length > 0){
                $scope.getdata(urlInUp, JSON.stringify(modelInUp), $scope.resetModelList);
            }
            if(!update && modelDel.length > 0){
                $scope.getdata(urlDel, JSON.stringify(modelDel), $scope.resetModelList);
            }
            function setModel(cmsType){
                var ctid = cmsType.viewid,
                    cmsdiv = $('#' + ctid).parent(),
                    cmsIcon = $('#' + ctid + '_icon'),
                    cmsList = cmsdiv.find('p'),
                    cmsListLast = cmsdiv.find('div').eq(0),
                    json = {};
                if(cmsdiv[0].innerText == ''){
                    return false;
                }
                json.displayWidth = parseInt(cmsType.cmsSize.split('×')[0]);
                json.displayHeight = parseInt(cmsType.cmsSize.split('×')[1]);
                json.dispScrType = 0;
                json.timeDelay = parseInt(cmsType.time);
                json.transition = parseInt(cmsType.type);
                json.param = 23;
                json.graphList = [];
                json.wordList = [];
                var ijson = {},
                    iname = cmsIcon.attr('iname'),
                    icount = 0;
                if(iname != ''){
                    icount = 1;
                    ijson.graphXXX = 0;
                    ijson.graphYYY = 0;
                    ijson.graphId = iname.split('.')[0];
                    json.graphList.push(ijson);
                }
                for(var i = 0, l = cmsList.length + 1; i < l; i++){
                    var con;
                    if(i + 1 === l){
                        con = cmsListLast;
                    } else {
                        con = cmsList.eq(i);
                    }
                    var cjson = {},
                        ctext = con.html(),
                        ctextLength = getByteLen(ctext),
                        csize = parseInt(con.css('font-size')),
                        cspace = parseInt(con.css('letter-spacing'));
                    cjson.wordXXX = (json.displayWidth - json.displayHeight * icount - ctextLength / 2 * csize - (ctext.length - 1) * cspace) / 2 + json.displayHeight * icount;
                    cjson.wordYYY = parseInt(con.position().top) - parseInt(cmsdiv.css('padding')) + parseInt(con.css('margin-top'));
                    cjson.fontColor = rgb216(cmsdiv.css('color')).replace(/#/g,'');
                    cjson.fontBackColor = '00FF00';
                    cjson.fontShadowColor = '000000';
                    cjson.wordSpace = cspace;
                    cjson.fontSize_HH = csize;
                    cjson.fontSize_WW = csize;
                    cjson.wordContent = ctext;
                    cjson.fontName = $scope.returnFamilyType(cmsdiv.css('font-family'));
                    json.wordList.push(cjson);
                }
                var json_str = JSON.stringify(json);
                return json_str;
            }
        };

        // 模板删除
        $scope.delModelList = function(model){
            $scope.resetCmsType();
            $scope.modelEdit = false;
            var delArr = [],
                url = "/cms/deleteCmsFixedCommands.from?ran=";
            for(var i = 0, l = model.countArr.length; i < l; i++){
                var _model = $scope.modelBasicList[model.countArr[i]];
                delArr.push(_model.commandId);
            }
            $scope.getdata(url, JSON.stringify(delArr), $scope.resetModelList);
        };

        $scope.setModelFlag = function(type){
            if(type && type != null){
                $scope.modelTypeId = type.type;
                $scope.modelTypeName = type.name;
            }
            var url = '/cms/getCmsFixedCommands.from?ran=',
                json = {};
            json.index = 0; //没有json.index这个字段或者json.index=0是第一个月查询；第二个月查询，index的值为1；以后以此类推
            json.groupId = $scope.modelTypeId + '';
            json.keywords = $scope.searchKeyWord;
            var json_str = JSON.stringify(json);
            $scope.getdata(url, json_str, $scope.setModelList);
        };

        $scope.resetModelList = function(resp){
            $timeout(function(){
                $scope.setModelFlag();
                $timeout(function(){
                    customFunc();
                },30);
            },1000);
        };

        $scope.editModelList = function(model){
            $scope.modelTypeUpdate = false;
            $scope.resetCmsType();
            $scope.modelEdit = true;
            $scope.compileModelTxt = model.text;
            for(var i = 0, l = model.countArr.length; i < l; i++){
                var _model = $scope.modelBasicList[model.countArr[i]];
                for(var j = 0, jl = $scope.cmsTypeList.length; j < jl; j++){
                    if($scope.cmsTypeList[j].deviceTypeId == _model.commandType){
                        var cmsList = JSON.parse(_model.command);
                        $scope.cmsTypeList[j].modelId = _model.commandId;
                        $scope.cmsTypeList[j].guid = _model.guid;
                        $scope.cmsTypeList[j].color = '#' + cmsList.wordList[0].fontColor;
                        $scope.cmsTypeList[j].family = $scope.returnFamilyType(cmsList.wordList[0].fontName);
                        $scope.cmsTypeList[j].time = cmsList.timeDelay + '';
                        $scope.cmsTypeList[j].type = cmsList.transition + '';
                        var fontSize = cmsList.wordList[0].fontSize_HH;
                        var text = cmsList.wordList[0].wordContent;
                        for(var k = 1, kl = cmsList.wordList.length; k < kl; k++){
                            text = text + '\n' + cmsList.wordList[k].wordContent
                            if(cmsList.wordList[k].fontSize_HH != fontSize){
                                fontSize = '';
                            }
                        }
                        if(cmsList.graphList.length > 0){
                            $scope.cmsTypeList[j].icon = cmsList.graphList[0].graphId + '.PNG';
                        }
                        $scope.cmsTypeList[j].size = fontSize + '';
                        $scope.cmsTypeList[j].editModel = text;
                        break;
                    }
                }
            }
            $timeout(function(){
                customFunc();
            },30);
        };

        $scope.editViewList = function(model){
            $scope.modview = true;
            $scope.resetViewType();
            for(var i = 0, l = model.countArr.length; i < l; i++){
                var _model = $scope.modelBasicList[model.countArr[i]];
                for(var j = 0, jl = $scope.cmsViewList.length; j < jl; j++){
                    if($scope.cmsViewList[j].deviceTypeId == _model.commandType){
                        var cmsList = JSON.parse(_model.command);
                        $scope.cmsViewList[j].color = '#' + cmsList.wordList[0].fontColor;
                        $scope.cmsViewList[j].family = $scope.returnFamilyType(cmsList.wordList[0].fontName);
                        var fontSize = cmsList.wordList[0].fontSize_HH;
                        var text = cmsList.wordList[0].wordContent;
                        for(var k = 1, kl = cmsList.wordList.length; k < kl; k++){
                            text = text + '\n' + cmsList.wordList[k].wordContent
                            if(cmsList.wordList[k].fontSize_HH != fontSize){
                                fontSize = '';
                            }
                        }
                        if(cmsList.graphList.length > 0){
                            $scope.cmsViewList[j].icon = cmsList.graphList[0].graphId + '.PNG';
                        }
                        $scope.cmsViewList[j].size = fontSize + '';
                        $scope.cmsViewList[j].editModel = text;
                        break;
                    }
                }
            }
        };

        $scope.setModelList = function(data){
            $scope.modelTypeList = [];
            $scope.modelBasicList = data.data;
            var data = data.data;
            for(var i = 0, l = data.length; i < l; i++){
                var j = 0, jl = $scope.modelTypeList.length;
                for(; j < jl; j++){
                    if($scope.modelTypeList[j].typeArr.length === $scope.cmsTypeList.length){
                        continue;
                    }
                    if($scope.modelTypeList[j].guid == data[i].guid){
                        $scope.modelTypeList[j].countArr.push(i);
                        $scope.modelTypeList[j].typeArr.push(data[i].commandType);
                        $scope.modelTypeList[j].showArr.push($scope.returnTypeInfo(data[i].commandType));
                        break;
                    }
                }
                if(j === jl){
                    $scope.modelTypeList[jl] = {};
                    $scope.modelTypeList[jl].text = data[i].commandName;
                    $scope.modelTypeList[jl].guid = data[i].guid;
                    $scope.modelTypeList[jl].countArr = [];
                    $scope.modelTypeList[jl].countArr.push(i);
                    $scope.modelTypeList[jl].typeArr = [];
                    $scope.modelTypeList[jl].typeArr.push(data[i].commandType);
                    $scope.modelTypeList[jl].showArr = [];
                    $scope.modelTypeList[jl].showArr.push($scope.returnTypeInfo(data[i].commandType));
                }
            }
            $timeout(function(){
                customFunc();
            },30);
        };

        $scope.setModelUse = function(type){
            $scope.modelTypeId = type.type;
            $scope.modelTypeName = type.name;
            var url = '/cms/getCmsFixedCommands.from?ran=',
                json = {};
            json.index = 0; //没有json.index这个字段或者json.index=0是第一个月查询；第二个月查询，index的值为1；以后以此类推
            json.groupId = $scope.modelTypeId + '';
            json.keywords = $scope.searchKeyWord;
            var json_str = JSON.stringify(json);
            $scope.getdata(url, json_str, setModelUseList);
            function setModelUseList(data){
                $scope.modelUseList = data.data;
                $scope.resetScroll(30);
            }
        };

        $scope.modelExist = function(type, size, arr){
            if($.inArray((type + '(' + size + ')'), arr) >= 0){
                return true;
            }
            return false;
        };

        $scope.returnTypeInfo = function(type){
            for(var i = 0, l = $scope.cmsTypeList.length; i < l; i++){
                if($scope.cmsTypeList[i].deviceTypeId == type){
                    return ($scope.cmsTypeList[i].cmsType + '(' + $scope.cmsTypeList[i].cmsSize + ')');
                }
            }
            return false;
        };

        $scope.cancelEditModel = function(){
            $scope.modelEdit = false;
            $scope.resetCmsType();
        };

        $scope.resetCmsType = function(){
            $scope.compileModelTxt = '';
            for(var i = 0, l = $scope.cmsTypeList.length; i < l; i++){
                $scope.cmsTypeList[i].color = '#FFFF00';
                $scope.cmsTypeList[i].textalign = 'center';
                $scope.cmsTypeList[i].family = 'SimHei';
                $scope.cmsTypeList[i].size = '';
                $scope.cmsTypeList[i].type = '1';
                $scope.cmsTypeList[i].time = '3';
                $scope.cmsTypeList[i].icon = '';
                $scope.cmsTypeList[i].editModel = '';
                $scope.cmsTypeList[i].modelId = 0;
            }
            $('cmsedit').find('div[compmodel]').css({
                'opacity': '',
                'z-index': ''
            });
        };

        $scope.resetViewType = function(){
            for(var i = 0, l = $scope.cmsViewList.length; i < l; i++){
                var json = $scope.cmsViewList[i];
                json.color = '#FFFF00';
                json.textalign = 'center';
                json.family = 'SimHei';
                json.size = '';
                json.type = '1';
                json.time = '3';
                json.icon = '';
                json.editModel = '';
            }
        };

        $scope.modelManageFn = function(){
            $scope.modelManage = !$scope.modelManage;
            $timeout(function(){
                $('modelmanage').find('filbtn').eq(0).find('input').click();
            },100);
        };

        $scope.closeModelUse = function(){
            $scope.modelList = false;
            $scope.modelUseList = [];
        };

        // 模板使用
        $scope.getModelList = function(){
            $scope.modelList = !$scope.modelList;
            $timeout(function(){
                $('cmsmodel').find('filbtn').eq(0).find('input').click();
            },100);
        };

        // 确定使用模板
        $scope.viewToCms = function(list){
            var json = {};
            json.text = $scope.editModel;
            json.oldModel = $scope.cmsModel
            $scope.oldCmsStr = JSON.stringify(json);
            var _color, _text, _size, _textalign, _time, _type, _family, _icon = '', _list;
            _list = JSON.parse(list);
            _time = _list.timeDelay;
            _type = _list.transition;
            _color = '#' + _list.wordList[0].fontColor;
            // $scope.modelColor = '#' + _list.wordList[0].fontColor;
            // if($scope.cmsInfo.cmsColor === '1' || $scope.cmsInfo.cmsColor === '2'){
            //     _color = '#FFFF00';
            // }
            _family = $scope.returnFamilyType(_list.wordList[0].fontName);
            if(_list.graphList.length > 0){
                _icon = _list.graphList[0].graphId + '.PNG';
            }
            _size = _list.wordList[0].fontSize_HH + '';
            _text = _list.wordList[0].wordContent;
            for(var k = 1, kl = _list.wordList.length; k < kl; k++){
                _text = _text + '\n' + _list.wordList[k].wordContent;
                if(_list.wordList[k].fontSize_HH != _size){
                    _size = '';
                }
            }
            $scope.cmsModel.color = _color;
            $scope.cmsModel.textalign = _textalign;
            $scope.cmsModel.family = _family;
            $scope.cmsModel.size = _size;
            $scope.cmsModel.type = _type + '';
            $scope.cmsModel.time = _time + '';
            $scope.cmsModel.icon = _icon;
            $scope.editModel = _text;
        };

        $scope.resetToCms = function(){
            $scope.cmsModel = JSON.parse($scope.oldCmsStr).oldModel;
            $scope.editModel = JSON.parse($scope.oldCmsStr).text;
        };

        // 最新发布显示判断
        $scope.lastSandFn = function(){
            var boo = true;
            if($scope.cmsLastInf.length === 0){
                boo = false;
            }
            boo = boo && $scope.pandectFlag.direct && $scope.pandectFlag.lines && $scope.pandectFlag.position && $scope.pandectFlag.roads && $scope.pandectFlag.types;
            return boo;
        };

        // 详细信息
        $scope.showDetails = function(device){
            $scope.details = true;
            $scope.cmsTpl = true;
            $scope.cmsInfo = device;
            $timeout(function(){
                if($scope.cmsTimer != ''){
                    $interval.cancel($scope.cmsTimer);
                }
                $scope.cmsProgram = [];
                $scope.cmsTabp = [];
                var programs = $('cmsdetails cms').find('pwrap');
                var props = $('cmsdetails cnav').find('p');
                var programl = programs.length;
                if(programl === 0){
                    return;
                }
                for(var i = 0; i < programl; i++){
                    $scope.cmsProgram.push(programs.eq(i));
                    $scope.cmsTabp.push(props.eq(i));
                }
                var oldCount = $('cmsdetails preview[count]').attr('count');
                $('cmsdetails preview[count]').attr('count', 0);
                $scope.cmsProgram[oldCount].css('right', '');
                $scope.cmsTabp[oldCount].css('background-color', '');
                $scope.cmsProgram[0].css('right', 0);
                $scope.cmsTabp[0].css('background-color', '#0069cb');
                $scope.cmsTimer = $interval(function(){
                    var programNow = $('cmsdetails preview[count]').attr('count');
                    var pro = $scope.cmsProgram[programNow];
                    if(pro.parents('*[setstop]').attr('stop') === 'true'){
                        return;
                    }
                    pro.animate({'right': '100%'}, 240, 'swing', function(){
                        pro.css('right', '');
                    });
                    $scope.cmsTabp[programNow].css('background-color', '');
                    programNow++;
                    if(programNow > programl - 1){
                        programNow = 0;
                    }
                    $scope.cmsTabp[programNow].css('background-color', '#0069cb');
                    $scope.cmsProgram[programNow].animate({'right': '0'}, 240, 'swing');
                    $('cmsdetails preview[count]').attr('count', programNow);
                }, 3000);
            },30);
        }


        /* ----------出字方式---------- */
        // 立即显示
        function immediately(type, oldObj, newObj){
            if(type != 1){
            // console.log(type);
            // console.log(oldObj);
            // console.log(newObj);

            }
            if(type == 1 || type == 3){
                oldObj.css({'right': '-100%'});
                newObj.css({'right': '0px'});
            }
        }




        // 临时
        $scope.timesoo = '';
        $scope.moover = function(){
            $scope.timesoo = $timeout(function(){
                $scope.resfl = !$scope.resfl;
            }, 3000);
        }

        $scope.moout = function(){
            $timeout.cancel($scope.timesoo);
        }

        $scope.resfn = function(){
            $('.resstyle').html('正在修复……');
            var res = false;
            for(var j = 0, jl = $scope.cmsBasicInf.length; j < jl; j++){
                for(var i = 0, l = $scope.cmsBasicInf[j].devices.length; i < l; i++){
                    var device = $scope.cmsBasicInf[j].devices[i];
                    if(device.deviceVar[device.issuedTypeId] == null){
                        continue;
                    }
                    if(typeof(device.deviceVar[device.issuedTypeId].deviceVarValue) == 'undefined'){
                        continue;
                    }
                    var deviceList = device.deviceVar[device.issuedTypeId].deviceVarValue,
                        deviceFlag = false;
                    for(var k = 0, kl = deviceList.length; k < kl; k++){
                        for(var m = 0, ml = deviceList[k].wordList.length; m < ml; m++){
                            delete deviceList[k].wordList[m].$$hashKey;
                        }
                        if(deviceList[k].transition == 0){
                            deviceFlag = true;
                            deviceList[k].transition = 1;
                        }
                    }

                    if(deviceFlag){
                        res = true;
                        var json_str = JSON.stringify(deviceList);

                        var msgcontentArr = [];
                        var msgcontentjson = {};
                        msgcontentjson.collnode = 1;
                        msgcontentjson.orgid = device.orgId;
                        msgcontentjson.deviceid = device.deviceId;
                        msgcontentjson.devicevarid = device.deviceVar[device.issuedTypeId].deviceVarId;
                        msgcontentjson.devicetypeid = device.deviceVar[device.issuedTypeId].typeId;
                        msgcontentjson.sendcontents = json_str;
                        msgcontentjson.senddatetime = device.deviceVar[device.issuedTypeId].deviceVarDateTime;
                        msgcontentjson.userid = userId;
                        msgcontentArr.push(msgcontentjson);

                        var msgjson = {};
                        msgjson.msgtype = 'devicectl';
                        msgjson.msgcontent = JSON.stringify(msgcontentArr);
                        var msgarr = [], sandarr = [];
                        msgarr.push(msgjson);
                        var msgarrStr = JSON.stringify(msgarr);
                        socket.emit('controlevent', msgarrStr);
                    }
                }
            }
            $scope.resfl = false;
            if(res){
                alert('请保存当前工作，确保情报板发送状态没有【发送中】字样后，刷新页面！');
            } else {
                $('.resstyle').remove();
            }
        };

        $scope.resColorfn = function(){
            $('.resstyle').html('正在修复……');
            var res = false;
            for(var j = 0, jl = $scope.cmsBasicInf.length; j < jl; j++){
                for(var i = 0, l = $scope.cmsBasicInf[j].devices.length; i < l; i++){
                    var device = $scope.cmsBasicInf[j].devices[i];
                    if(device.cmsColor != '1' && device.cmsColor != '2'){
                        continue;
                    }
                    if(device.deviceVar[device.issuedTypeId] == null){
                        continue;
                    }
                    if(typeof(device.deviceVar[device.issuedTypeId].deviceVarValue) == 'undefined'){
                        continue;
                    }
                    var deviceList = device.deviceVar[device.issuedTypeId].deviceVarValue,
                        deviceFlag = false;
                    for(var k = 0, kl = deviceList.length; k < kl; k++){
                        for(var m = 0, ml = deviceList[k].wordList.length; m < ml; m++){
                            delete deviceList[k].wordList[m].$$hashKey;
                            var _color = (deviceList[k].wordList[m].fontColor).toLowerCase();
                            if(deviceList[k].wordList[m].fontColor != 'ffff00'){
                                deviceFlag = true;
                                deviceList[k].wordList[m].fontColor = 'ffff00';
                            }
                        }
                    }

                    if(deviceFlag){
                        res = true;
                        var json_str = JSON.stringify(deviceList);

                        var msgcontentArr = [];
                        var msgcontentjson = {};
                        msgcontentjson.collnode = 1;
                        msgcontentjson.orgid = device.orgId;
                        msgcontentjson.deviceid = device.deviceId;
                        msgcontentjson.devicevarid = device.deviceVar[device.issuedTypeId].deviceVarId;
                        msgcontentjson.devicetypeid = device.deviceVar[device.issuedTypeId].typeId;
                        msgcontentjson.sendcontents = json_str;
                        msgcontentjson.senddatetime = device.deviceVar[device.issuedTypeId].deviceVarDateTime;
                        msgcontentjson.userid = userId;
                        msgcontentArr.push(msgcontentjson);

                        var msgjson = {};
                        msgjson.msgtype = 'devicectl';
                        msgjson.msgcontent = JSON.stringify(msgcontentArr);
                        var msgarr = [], sandarr = [];
                        msgarr.push(msgjson);
                        var msgarrStr = JSON.stringify(msgarr);
                        socket.emit('controlevent', msgarrStr);
                    }
                }
            }
            $scope.resfl = false;
            if(res){
                alert('请保存当前工作，确保情报板发送状态没有【发送中】字样后，刷新页面！');
            } else {
                $('.resstyle').remove();
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
            // 获取筛选项信息
            $scope.getdata('/cms/getSearchCondition.from', JSON.stringify($scope.getdataJson), $scope.pandectThen);
            // 获取设备基本信息
            $scope.getdata('/cms/getCmsBasicInfos.from', JSON.stringify($scope.getdataJson), $scope.cbiThen);

            $scope.getdata('/cms/getCmsIcons.from', JSON.stringify($scope.getdataJson), $scope.getIconArr);
        });
	}])
})(angular);
