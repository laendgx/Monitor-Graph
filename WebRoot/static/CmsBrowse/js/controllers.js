(function(angular){

	var controllers = angular.module('app.controllers', []);

	controllers.controller('cmsController', ['$scope', '$filter', '$interval', function($scope, $filter, $interval){
        $scope.editWindow = false;  // 情报板编辑页显式隐藏标志
        $scope.cmsWidth = '192';    // 情报板宽
        $scope.cmsHeight = '96';    // 情报板高
        $scope.cmsIcons = [];       // 情报板图标ID集合
        $scope.cmsScrType = '2';    // 情报板类型
        $scope.cmsTimeDelay = 3;    // 切换时间
        $scope.cmsType = '';        // 节目单类型
        $scope.cmsText = '';        // 情报板文字
        $scope.cmsFontFamily = 'SimHei';// 情报板字体
        $scope.cmsFontSize = '';    // 情报板字号
        $scope.cmsFontColor = '#FFFF00';// 情报板文字颜色
        $scope.cmsFBColor = '';     // 情报板背景颜色
        $scope.cmsFSColor = '';     // 情报板文字阴影颜色
        $scope.cmsTransition = 1;   // 出字方式
        $scope.cmsParam = 0;        // 出字速度
        $scope.cmsStyle = {         // 情报板编辑页面预览显式宽高值
            'width': $scope.cmsWidth + 'px',
            'height': $scope.cmsHeight + 'px'
        };
        $scope.statuslist = [];     // 用于储存情报板下发状态
        $scope.cmsTextList = [];    // 节目单展示列表
        $scope.cmsList = [];        // 节目单列表
        $scope.cmsTips = '';        // 错误提示
        $scope.sendPreviewInterval = '';// 发送后，用于预览的计时器
        $scope.preTimer = [];       // 用于发送后，预览的延时器
        $scope.cmsTimerClear = false;//清除定时器的标志
        $scope.cpList = [];      //清除定时器的标志
        $scope.fontFamilies = [     // 情报板文字字体，及对应标志
            {
                name: 'SimSun',
                type: 's'
            },
            {
                name: 'KaiTi',
                type: 'k'
            },
            {
                name: 'SimHei',
                type: 'h'
            }
        ];
        $scope.bcmsStyle = {         // 情报板总预览显式宽高值
            'width': $scope.cmsWidth + 'px',
            'height': $scope.cmsHeight + 'px'
        };

    	var socketPath = "/Monitor-CollSvr";
    	
    	var WebSocketAddr = 'ws://127.0.0.1:8080'+ socketPath + "/webSocketServer.from";
    	 //var WebSocketAddr = 'ws://' + window.location.host + basePath + "/webSocketServer.from";
        $scope.ws = new WebSocket(WebSocketAddr);

        //websocket连接上触发事件
        $scope.ws.onopen = function(){

        }

        //websocket收到消息事件
        $scope.ws.onmessage = function(event){
            try{
                $scope.transRecvData(event.data);
            }catch(err){

            }
        };

        //websocket关闭事件
        $scope.ws.onclose = function(event){

        };

        //content为发送内容的字符串
        $scope.send = function(content){
            var msgcontentArr = [];
            var msgcontentjson = {};
            msgcontentjson.collnode = 1;
            msgcontentjson.orgid = 1010;
            msgcontentjson.deviceid = 22220001;
            msgcontentjson.devicevarid = 100001;
            msgcontentjson.devicetypeid = 222201;
            msgcontentjson.sendcontents = content;
            msgcontentArr.push(msgcontentjson);
            
            var msgjson = {};
            msgjson.msgtype = "devicectl";
            msgjson.msgcontent = JSON.stringify(msgcontentArr);
            var str = JSON.stringify(msgjson);
            $scope.ws.send(str);
        };
        
        $scope.cmsData = null;
        //处理接收到的字符串
        $scope.transRecvData = function(data){
            var obj = eval('(' + data + ')');
            if (obj.msgtype == "uploaddata"){
                //设备数据
                if (obj.datalist != null){
                    for(var i = 0, l = obj.datalist.length; i < l; i++){
                        var data = obj.datalist[i];
                        if (data.deivcevarid == 100001){
                            $scope.cmsData = data.devicevarvalue;
                            $scope.displayCms($scope.cmsData);
                            console.log($scope.cmsData);
                        }
                    }
                }
            }
            
            if (obj.msgtype == "sendflag"){
                //下发状态
                if (obj.sendflaglist != null){
                    for(var i = 0; i< obj.sendflaglist.length; i++){
                        var data = obj.sendflaglist[i];
                        try{
                        	var msg = {};
                        	msg.text = "设备：" + data.deviceid + " 下发状态：" + data.sendsucessflag;
                        	$scope.$apply(function(){
                        		$scope.statuslist.push(msg);
                        	});
                        }catch(err){}
                    }
                }
            }
            
            if (obj.msgtype == "alertinfo"){
                //设备告警
                if (obj.alertlist != null){
                    for(var i = 0; i< obj.alertlist.length; i++){
                        var data = obj.alertlist[i];
                        try{
                        	if (data.alertid != 100000 && data.alertid != 100001){
                        		var msg = {};
                        		msg.text = "设备：" + data.deviceid + " 故障：" + data.alertid;
                        		$scope.$apply(function(){
                        			$scope.statuslist.push(msg);
                        		});
                        	}                        	
                        }catch(err){}                        
                    }
                }
            }
        };

        $scope.savePreview = function(cmsTxt){
            var _cmsJson = {}, _guid = NewGuid(), _cmsTextList = {};
            _cmsJson.displayWidth = $scope.cmsWidth,
            _cmsJson.displayHeight = $scope.cmsHeight,
            _cmsJson.dispScrType = $scope.cmsScrType,
            _cmsJson.timeDelay = $scope.cmsTimeDelay * 100,
            _cmsJson.transition = $scope.cmsTransition,
            _cmsJson.param = $scope.cmsParam,
            _cmsJson.graphList = saveIcon(),
            _cmsJson.wordList = saveTxts(),
            _cmsJson.guid = _guid;
            $scope.cmsList.push(_cmsJson);

            _cmsTextList.text = cmsTxt.replace(/\n+/g,'').replace(/ +/g,'');
            _cmsTextList.guid = _guid;
            $scope.cmsTextList.push(_cmsTextList);
            $scope.editWindow = false;
            // delete _cmsJson.guid;
            // console.log(_cmsJson);
            // console.log(JSON.stringify(_cmsJson));

            // 整理文字类
            function saveTxts(){
                var _ps = $('preview cms').find('p'),
                    _d = $('preview cms').find('div'), 
                    _txt_arr = [];
                for(var i = 0, l = _ps.length + 1; i < l; i++){
                    var _p, _txtJson = {};
                    if(i === _ps.length){
                        _p = _d;
                    } else {
                        _p = _ps.eq(i);
                    }
                    _txtJson.wordXXX = parseInt(_p.attr('positionX')),
                    _txtJson.wordYYY = parseInt(_p.attr('positionY')),
                    _txtJson.fontColor = $scope.cmsFontColor,
                    _txtJson.fontBackColor = $scope.cmsFBColor,
                    _txtJson.fontShadowColor = $scope.cmsFSColor;
                    _txtJson.wordSpace = parseInt(_p.css('letter-spacing')),
                    _txtJson.fontName = getFFType($scope.cmsFontFamily),
                    _txtJson.fontSize_HH = parseInt(_p.attr('fz')),
                    _txtJson.fontSize_WW = parseInt(_p.attr('fz')),
                    _txtJson.wordContent = _p.html();
                    if($scope.cmsFontSize != '' && $scope.cmsFontSize != 'auto'){
                        _txtJson.fontSize_HH = parseInt($scope.cmsFontSize),
                        _txtJson.fontSize_WW = parseInt($scope.cmsFontSize);
                    }
                    _txt_arr.push(_txtJson);
                }
                return _txt_arr;
            }

            // 整理图片类
            function saveIcon(){
                var _icon_arr = [], _iconJson = {};
                _iconJson.graphXXX = 0,
                _iconJson.graphYYY = 0,
                _iconJson.graphId = $scope.cmsIcons[0];
                _icon_arr.push(_iconJson);
                if($scope.cmsIcons.length > 1){
                    _iconJson = {};
                    _iconJson.graphXXX = $('preview cmswrap').innerWidth - $('preview cmswrap').innerHeight,
                    _iconJson.graphYYY = 0,
                    _iconJson.graphId = $scope.cmsIcons[0];
                    _icon_arr.push(_iconJson);
                }
                if($scope.cmsIcons.length === 0){
                    return [];
                }
                return _icon_arr;
            }
        };

        // 查找字体代码
        function getFFType(ff){
            for(var i = 0, l = $scope.fontFamilies.length; i < l; i++){
                if($scope.fontFamilies[i].name === ff){
                    return $scope.fontFamilies[i].type;
                }
                if($scope.fontFamilies[i].type === ff){
                    return $scope.fontFamilies[i].name;
                }
            }
            return 's';
        }

        $scope.changeStyle = function(){
            $scope.cmsStyle = {
                'width': $scope.cmsWidth + 'px',
                'height': $scope.cmsHeight + 'px'
            };
        };

        $scope.changeFz = function(){
            $filter('ipreview')($scope.cmsText, $scope.cmsWidth, $scope.cmsHeight, $scope.cmsFontFamily, $scope.cmsFontSize, $scope.cmsFontColor, $scope.cmsIcons);
        };

        $scope.addIcon = function(id){
            if(id === 'null'){
                $scope.cmsIcons = [];
            } else {
                $('preview cmswrap').find('img').remove();
                $('<img>').attr({
                    'src': basepath + '/static/Images/icon/A' + id + '.PNG',
                    'width': $scope.cmsHeight,
                    'height': $scope.cmsHeight
                }).appendTo($('preview cmswrap'));
                $scope.cmsIcons.push(id);
            }
            if($scope.cmsIcons.length <= 1){            
                $filter('ipreview')($scope.cmsText, $scope.cmsWidth, $scope.cmsHeight, $scope.cmsFontFamily, $scope.cmsFontSize, $scope.cmsFontColor, $scope.cmsIcons);
            }
        };

        $scope.showCms = function(guid){
            var _cms;
            $scope.cpList = [];
            for(var i = 0, l = $scope.cmsList.length; i < l; i++){
                if($scope.cmsList[i].guid === guid){
                    _cms = $scope.cmsList[i];
                    break;
                }
            }
            $scope.bcmsStyle = {
                'height': _cms.displayHeight + 'px',
                'width': _cms.displayWidth + 'px',
                'color': _cms.wordList[0].fontColor,
                'font-family': getFFType(_cms.wordList[0].fontName)
            };
            for(var i = 0, l = _cms.wordList.length; i < l; i++){
                var _json = {};
                _json.style = {
                    'top': _cms.wordList[i].wordYYY + 'px',
                    'letter-spacing': _cms.wordList[i].wordSpace + 'px',
                    'font-size': _cms.wordList[i].fontSize_HH + 'px',
                    'height': _cms.wordList[i].fontSize_HH + 'px',
                    'line-height': _cms.wordList[i].fontSize_HH + 'px',
                    'text-indent': _cms.wordList[i].wordSpace + 'px'
                };
                _json.text = _cms.wordList[i].wordContent;
                $scope.cpList.push(_json);
            }
        };

        $scope.sendCms = function(){
        	$scope.send(JSON.stringify($scope.cmsList));
        };
        
    	$scope.displayCms = function(data){
    		$scope.cmsList = JSON.parse(data);
            var _par = $('browse bcms');
            _par.empty();
            _par.css({
                'height': $scope.cmsList[0].displayHeight + 'px',
                'width': $scope.cmsList[0].displayWidth + 'px'
            });
            for(var i = 0, l = $scope.cmsList.length; i < l; i++){
                // delete $scope.cmsList[i].guid;
                var _cms = $scope.cmsList[i];
                var _ps_wrap = $('<pwrap>').appendTo(_par);
                _ps_wrap.css({
                    'opacity': 0,
                    'color': $scope.cmsList[i].wordList[0].fontColor,
                    'font-family': getFFType($scope.cmsList[i].wordList[0].fontName)
                }).attr({
                    'cmsn': i,
                    'cmsParam': $scope.cmsList[i].param,
                    'cmsTimeDelay': $scope.cmsList[i].timeDelay
                });
                for(var j = 0, jl = _cms.wordList.length; j < jl; j++){
                    $('<p>').css({
                        'top': _cms.wordList[j].wordYYY + 'px',
                        'letter-spacing': _cms.wordList[j].wordSpace + 'px',
                        'font-size': _cms.wordList[j].fontSize_HH + 'px',
                        'height': _cms.wordList[j].fontSize_HH + 'px',
                        'line-height': _cms.wordList[j].fontSize_HH + 'px',
                        'text-indent': _cms.wordList[j].wordSpace + 'px'
                    }).html(_cms.wordList[j].wordContent).appendTo(_ps_wrap)
                }
            }

            var _interval = preview();
            $scope.sendPreviewInterval = $interval(function(){
                preview();
            }, _interval);
            $scope.cmsTimerClear = true;

            function preview(){
                var _pws = $('browse').find('pwrap'), _timeout = 0;
                $scope.preTimer = [];
                for(var i = 0, l = _pws.length; i < l; i++){
                    (function(i){
                        $scope.preTimer[i] = setTimeout(function(){
                            _pws.css('opacity', 0);
                            _pws.eq(i).css('opacity', 1);
                        }, _timeout);
                        _timeout += parseInt(_pws.eq(i).attr('cmsTimeDelay') * 10);
                    })(i);
                }
                return _timeout;
            }
        };

        $scope.clearCms = function(){
            $interval.cancel($scope.sendPreviewInterval);
            $('browse bcms').empty();
            $scope.cmsTimerClear = false;
        };
	}])
})(angular);

