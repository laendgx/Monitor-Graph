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

        $scope.addToInfo = [];          // 存储情报板基本信息
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
        $scope.lastSendTime = 0;
        $scope.oldCmsStr = '';          // 存放旧情报板信息
        $scope.modelUseList = [];       // 存放可使用的模板

        // 鹰眼
        $scope.moveNeagle = function(elem){
            var cmap = elem.find('cmap'),
                follow = elem.find('img.cmap'),
                ewrap = elem.find('eagle'),
                eagle = elem.find('eawindow'),
                bgctrl = elem.find('bgctrl'),
                borderwid = 180;
            var movePercent = setModStyle();

            cmap.bind('mousedown', moveMousedown);
            bgctrl.bind('mousedown', bgMousedown);

            function setModStyle(){
                cmap.css({width: follow.width(), height: follow.height()});
                var percent = cmap.width() / cmap.height();
                if(percent >= 4 / 3){
                    ewrap.css({'width': borderwid, 'height': (borderwid / percent).toFixed(2)});
                } else {
                    ewrap.css({'width': (borderwid / 4 * 3 * percent).toFixed(2), 'height': borderwid / 4 * 3});
                }
                ewrap.css({'background-image': 'url(' + follow.attr('src') + ')', 'background-size': ewrap.width() + 'px ' + ewrap.height() + 'px'})

                var epercent = ewrap.width() / cmap.width();
                eagle.css({'width': ($(window).width() * epercent).toFixed(2), 'height': ($(window).height() * epercent).toFixed(2),
                    'border-width': borderwid, 'top': -1 * borderwid, 'left': -1 * borderwid});
                return (cmap.width() / ewrap.width());
            }

            function moveMousedown(event){
                var disX = event.clientX - cmap.position().left,
                    disY = event.clientY - cmap.position().top,
                    minX = $(window).width() - cmap.width(), maxX = 0,
                    minY = $(window).height() - cmap.height(), maxY = 0;

                $(document).bind({
                    'mousemove': moveMousemove,
                    'mouseup': moveMouseup
                });

                function moveMousemove(event){
                    var l = event.clientX - disX;
                    var t = event.clientY - disY;
                    if(l > maxX){
                        l = maxX;
                    }
                    if(l < minX){
                        l = minX;
                    }
                    if(t > maxY){
                        t = maxY;
                    }
                    if(t < minY){
                        t = minY;
                    }
                    cmap.css({'left': l + 'px', 'top': t + 'px'});
                    follow.css({'left': l + 'px', 'top': t + 'px'});
                    eagle.css({'left': -l / movePercent - borderwid + 'px', 'top': -t / movePercent - borderwid + 'px'});
                }

                function moveMouseup(){
                    $(document).unbind({
                        'mousemove': moveMousemove,
                        'mouseup': moveMouseup
                    });
                }
            }

            function bgMousedown(event){
                var mdx = event.offsetX,
                    mdy = event.offsetY,
                    areax = eagle.position().left,
                    areay = eagle.position().top,
                    areawid = eagle.width(),
                    areahei = eagle.height();
                if(mdx <= areax + borderwid || mdx >= areax + borderwid + areawid || mdy <= areay + borderwid || mdy >= areay + borderwid + areahei){
                    var eagle_n_top = mdy - areahei / 2,
                        eagle_n_left = mdx - areawid / 2;
                    if(eagle_n_top < 0){
                        eagle_n_top = 0;
                    }
                    if(eagle_n_top > ewrap.height() - areahei){
                        eagle_n_top = ewrap.height() - areahei;
                    }
                    if(eagle_n_left < 0){
                        eagle_n_left = 0;
                    }
                    if(eagle_n_left > ewrap.width() - areawid){
                        eagle_n_left = ewrap.width() - areawid;
                    }
                    eagle.css({'top': (-borderwid + eagle_n_top), 'left': (-borderwid + eagle_n_left)});
                    cmap.css({'left': -eagle_n_left * movePercent + 'px', 'top': -eagle_n_top * movePercent + 'px'});
                    follow.css({'left': -eagle_n_left * movePercent + 'px', 'top': -eagle_n_top * movePercent + 'px'});
                }
                mdx = event.offsetX - eagle.position().left,
                mdy = event.offsetY - eagle.position().top;
                maxX = ewrap.width() - parseFloat(eagle.css('width')) - borderwid, minX = 0 - borderwid,
                maxY = ewrap.height() - parseFloat(eagle.css('height')) - borderwid, minY = 0 - borderwid;

                bgctrl.bind({
                    'mousemove': bgMousemove,
                    'mouseup': bgMouseup
                });

                function bgMousemove(event){
                    var mmx = event.offsetX - mdx;
                    var mmy = event.offsetY - mdy;
                    if(mmx > maxX){
                        mmx = maxX;
                    }
                    if(mmx < minX){
                        mmx = minX;
                    }
                    if(mmy > maxY){
                        mmy = maxY;
                    }
                    if(mmy < minY){
                        mmy = minY;
                    }
                    eagle.css({'left': mmx + 'px', 'top': mmy + 'px'});
                    cmap.css({'left': -(mmx + borderwid) * movePercent + 'px', 'top': -(mmy + borderwid) * movePercent + 'px'});
                    follow.css({'left': -(mmx + borderwid) * movePercent + 'px', 'top': -(mmy + borderwid) * movePercent + 'px'});
                }

                function bgMouseup(){
                    bgctrl.unbind({
                        'mousemove': bgMousemove,
                        'mouseup': bgMouseup
                    });
                }
            }
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
            $scope.cmsBasicInf.cms = [];
            for(var i = 0, l = $scope.prevdata.length; i < l; i++){
                $scope.prevdata[i].deviceVar = {};
                $scope.prevdata[i].status = {
                    alertType: {},
                    alertArr: [],
                    alertText: '正常',
                    alertColor: '#029d0c'
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

        // 选择情报板
        $scope.showCmsInfo = function(device){
            if($scope.cmsPosition){
                return;
            }
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
                oldList[0] = json;
            } else {
                oldList[ae] = json;
            }
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
                $scope.cmsLastInf.push($scope.addToInfo[i])
                var msgcontentArr = [];
                var msgcontentjson = {};
                msgcontentjson.collnode = 1;
                msgcontentjson.orgid = $scope.addToInfo[i].orgId;
                msgcontentjson.deviceid = $scope.addToInfo[i].deviceId;
                msgcontentjson.devicevarid = $scope.addToInfo[i].deviceVar[$scope.addToInfo[i].issuedTypeId].deviceVarId;
                msgcontentjson.devicetypeid = $scope.addToInfo[i].deviceVar[$scope.addToInfo[i].issuedTypeId].typeId;
                msgcontentjson.sendcontents = cjson;
                msgcontentjson.senddatetime = "SendTimeReplaceStr";
                msgcontentjson.userid = userId;
                msgcontentArr.push(msgcontentjson);

                var msgjson = {};
                msgjson.msgtype = 'devicectl';
                msgjson.msgcontent = JSON.stringify(msgcontentArr);
                $scope.msgarr.push(msgjson);
            }
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
            if($scope.cmsInfo.deviceVar[$scope.cmsInfo.issuedTypeId].deviceVarValue == null){
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
                var inputs = $('cmscompile btns').find('input');
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
                    device = $scope.cmsBasicInf.cms[deviceX],
                    devStat = device.status;
                devStat.alertText = data[i].sendsucessflagdesc;
                if(data[i].sendsucessflagdesc.indexOf('成功') >= 0){
                    devStat.alertColor = '#029d0c';
                } else if(data[i].sendsucessflagdesc.indexOf('失败') >= 0){
                    devStat.alertColor = '#ff0000';
                }
            }
        };

        // 组态
        $scope.cmsPosiFn = function(){
            $scope.cmsPosition = !$scope.cmsPosition;
            if(!$scope.cmsPosition){
                var cms = $('div[cmsposi]'),
                    cmsArr = [];
                for(var i = 0, l = cms.length; i < l; i++){
                    var count = cms.eq(i).attr('ccount'),
                        dev = $scope.cmsBasicInf.cms[count],
                        _json = {};
                    _json.orgId = dev.orgId;
                    _json.deviceId = dev.deviceId;
                    _json.screenX = parseInt(cms.eq(i).css('left'));
                    _json.screenY = parseInt(cms.eq(i).css('top'));
                    _json.symbolStyle = '';
                    cmsArr.push(_json);
                }
                var url = "/GraphIntouch/updateDeviceIntouchInfo.from?ran=" + Math.random(),
                    dataStr = JSON.stringify(cmsArr);
                $scope.getdata(url, dataStr);
            }
        };

        // 情报板状态
        $scope.checkStatus = function(alertArr){
            if($.isEmptyObject(alertArr)){
                return 0;
            }
            for(var item in alertArr){
                if(alertArr[item].id == 100010){
                    return 1;
                }
            }
            return 2;
        };

        // 模板使用
        $scope.getModelList = function(){
            $scope.modelList = !$scope.modelList;
            $timeout(function(){
                $('cmsmodel').find('filbtn').eq(0).find('input').click();
            },100);
        };

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

        $scope.closeModelUse = function(){
            $scope.modelList = false;
            $scope.modelUseList = [];
        };

        /* ----------出字方式---------- */
        // 立即显示
        function immediately(type, oldObj, newObj){
            if(type == 1 || type == 3){
                oldObj.css({'right': '-100%'});
                newObj.css({'right': '0px'});
            }
        }

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
            // 获取设备基本信息
            $scope.getdata('/cms/getCmsBasicInfos.from', JSON.stringify($scope.getdataJson), $scope.cbiThen);

            $scope.getdata('/cms/getCmsIcons.from', JSON.stringify($scope.getdataJson), $scope.getIconArr);
        });
	}])
})(angular);

