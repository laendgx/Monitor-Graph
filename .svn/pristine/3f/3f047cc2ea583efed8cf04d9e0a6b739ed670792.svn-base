/**
 * 基于百度地图的轨迹回放
 * 需要数据 json 
 * 1.name 属性，为地图显示区域的 id                                 
 * 2.points 属性，为运行轨迹上的一连串点的经纬度
 * 3.需要引入网络文件 http://api.map.baidu.com/api?v=2.0&ak=百度开发者密钥  
 *                                                    （v7Nin9xjKGpyFm7Q7XjmU4wyrHYezC5k）
 */
function BaiduMapGPS(map, json){
	// 百度地图API功能
	//var map = new BMap.Map(json.name);
	//map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
	var points = json.points;
//		[
//		new BMap.Point(116.201333,39.952218),
//		new BMap.Point(116.201602,39.952812),
//		new BMap.Point(116.204746,39.952791),
//		new BMap.Point(116.206139,39.952169),
//		new BMap.Point(116.206812,39.950413),
//		new BMap.Point(116.2048,39.950427),
//		new BMap.Point(116.206785,39.950351),
//		new BMap.Point(116.212103,39.949888),
//		new BMap.Point(116.215957,39.949908),
//		new BMap.Point(116.219065,39.950876),
//		new BMap.Point(116.220862,39.953808),
//		new BMap.Point(116.22158,39.956234),
//		new BMap.Point(116.220987,39.958841),
//		new BMap.Point(116.223359,39.959359),
//		new BMap.Point(116.221428,39.95928),
//		new BMap.Point(116.222348,39.959491),
//		new BMap.Point(116.22618,39.960493),
//		new BMap.Point(116.228318,39.960576),
//		new BMap.Point(116.228767,39.961143),
//		new BMap.Point(116.228812,39.961965),
//		new BMap.Point(116.230141,39.962014)
//	];
	
	var n = 0;
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
		//offset: new BMap.Size(0, -5),    //相当于CSS精灵
		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
	  });
	var driving2 = new BMap.DrivingRoute(map);    //驾车实例
	while(n + 1 < points.length){
		driving2.search(points[n], points[n + 1]);
		n++;
	}
	map.setViewport(points);
	
	var pts;
	driving2.setSearchCompleteCallback(function(){
        pts = driving2.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组

        var polyline = new BMap.Polyline(pts);     
        map.addOverlay(polyline);
	});

	window.run = function (){
		var m = 0;
		var driving = new BMap.DrivingRoute(map);
		var apts = [];
		for(var m = 0; m + 1 < points.length; m++){
			(function(m){
				setTimeout(function(){
					driving.search(points[m], points[m + 1]);
					driving.setSearchCompleteCallback(function(){
						pts = driving.getResults().getPlan(0).getRoute(0).getPath();
						apts = apts.concat(pts);
					});
				}, (100 * m));
			})(m);
		}

		setTimeout(function(){
			showpoints();
		},150 * points.length);

		function showpoints(){
			var paths = apts.length;    //获得有几个点

			var carMk = new BMap.Marker(apts[0],{icon:myIcon});
			map.addOverlay(carMk);
			i=0;
			function resetMkPoint(i){
				carMk.setPosition(apts[i]);
				if(i < paths){
					setTimeout(function(){
						i++;
						resetMkPoint(i);
					},100);
				}
			}
			setTimeout(function(){
				resetMkPoint(0);
			},100)
		}
	}

	setTimeout(function(){
		run();
	},1000);
	
}

/**
 * 播放轨迹
 * 作者：孙冠义
 * @param map
 * @param json
 */
function BaiduMapGPS2(map, json){
	if (json.points == null || json.points.length==0 ){
		return;
	}
	var points = json.points;
//	points = [
//	new BMap.Point(116.201333,39.952218),
//	new BMap.Point(116.201602,39.952812),
//	new BMap.Point(116.204746,39.952791),
//	new BMap.Point(116.206139,39.952169),
//	new BMap.Point(116.206812,39.950413),
//	new BMap.Point(116.2048,39.950427),
//	new BMap.Point(116.206785,39.950351),
//	new BMap.Point(116.212103,39.949888),
//	new BMap.Point(116.215957,39.949908),
//	new BMap.Point(116.219065,39.950876),
//	new BMap.Point(116.220862,39.953808),
//	new BMap.Point(116.22158,39.956234),
//	new BMap.Point(116.220987,39.958841),
//	new BMap.Point(116.223359,39.959359),
//	new BMap.Point(116.221428,39.95928),
//	new BMap.Point(116.222348,39.959491),
//	new BMap.Point(116.22618,39.960493),
//	new BMap.Point(116.228318,39.960576),
//	new BMap.Point(116.228767,39.961143),
//	new BMap.Point(116.228812,39.961965),
//	new BMap.Point(116.230141,39.962014)
//];
	// 百度地图API功能
	var myP1 = points[0];    //起点
	var myP2 = points[points.length - 1];    //终点
	var n = 0;
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
		//offset: new BMap.Size(0, -5),    //相当于CSS精灵
		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
	  });
	var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
	//driving2.search(myP1, myP2);    //显示一条公交线路
	while(n + 1 < points.length){
		driving2.search(points[n], points[n + 1]);
		n++;
	}
	
	window.run = function (){
		var driving = new BMap.DrivingRoute(map);    //驾车实例
		driving.search(myP1, myP2);
		driving.setSearchCompleteCallback(function(){
			var pts = points;//driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
			var paths = pts.length;    //获得有几个点

			var carMk = new BMap.Marker(pts[0],{icon:myIcon});
			map.addOverlay(carMk);
			i=0;
			function resetMkPoint(i){
				carMk.setPosition(pts[i]);
				if(i < paths){
					setTimeout(function(){
						i++;
						resetMkPoint(i);
					},100);
				}
			}
			setTimeout(function(){
				resetMkPoint(5);
			},100)

		});
	}

	setTimeout(function(){
		run();
	},1000);
}


/**
 * 播放轨迹
 * 作者：孙冠义
 * @param map
 * @param json
 */
function BaiduMapGPS3(map, json){
	if (json.points == null || json.points.length==0 ){
		return;
	}
	var points = json.points;

	// 百度地图API功能
	var myP1 = points[0];    //起点
	var myP2 = points[points.length - 1];    //终点
	var n = 0;
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
		//offset: new BMap.Size(0, -5),    //相当于CSS精灵
		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
	  });
	
	var startIcon = new BMap.Icon(basePath +"/static/CommonImg/start.png", new BMap.Size(32, 32), {    //起点图片
		imageOffset: new BMap.Size(0, 0)    
	  });
	var startMk = new BMap.Marker(myP1,{icon:startIcon});
	map.addOverlay(startMk);
	
	var endIcon = new BMap.Icon(basePath +"/static/CommonImg/end.png", new BMap.Size(32, 32), {    //终点图片
		imageOffset: new BMap.Size(0, 0)    
	  });
	var endMk = new BMap.Marker(myP2,{icon:endIcon});
	map.addOverlay(endMk);
	console.log('points');
	console.log(JSON.stringify(points));
	var polyline = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.45}); 
	map.addOverlay(polyline);
	
	var carMk = new BMap.Marker(myP1,{icon:myIcon});
	map.addOverlay(carMk);
	
	var count = 0;
	if (timeHandle != null){
		window.clearInterval(timeHandle);
	}
	
	window.run = function (){
		carMk.setPosition(points[count]);
		count++;
		if (count > (points.length - 1)){
			window.clearInterval(timeHandle);
		}
	}

	timeHandle = self.setInterval(function(){
		run();
	},200);
}

