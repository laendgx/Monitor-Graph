
function gcj2bd(lat, lon) {
	var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	var x = lon;
	var y = lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    
    var result ={};
    result.lng = bd_lon;
    result.lat = bd_lat;
    return result;
}