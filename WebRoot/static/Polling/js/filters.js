(function(angular) {

	var filters = angular.module('app.filters', []);

	filters
	// 过滤器：筛选区域，去掉‘公路’字样
	.filter('cutname', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
	    	var _val = val.replace(/公路/g,"");
		  	return _val;
	    };
	})
	// 过滤器：筛选
	.filter('filtrate', function () {
	    return function (val, condition) {
		    if (!val){
		    	return '';
		    }
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
	    };
	})
	// 筛选器标志
	.filter('filtrateFlag', function () {
	    return function (val, condition) {
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
	    };
	})
	// 
	.filter('setbcstyle', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
	    	var _val = val.split('×');
		  	return {
		  		width: _val[0] + 'px',
		  		height: _val[1] + 'px'
		  	};
	    };
	})
	
	// 
	.filter('setstatuscolor', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		    return {
		    	'color': val.alertColor
		    };
	    };
	})
	
	// 过滤器：修改显示文字
	.filter('modelview', function () {
	    return function (val, viewid, position, size, type, time, iconsArr, iconsAddr) {
			var view = $('#' + viewid),
				icon = $('#' + viewid + '_icon'),
				cms = view.parent(),
				cmstextarea = $('textarea[cmstextarea]'),
				t_posi = cmstextarea.attr('enterposi'),
				t_row = cmstextarea.attr('enterrow'),
				c_posi = cms.attr('enterposi'),
				c_row = cms.attr('enterrow'),
				newCmsFlag = cms.attr('enternew'),
				wid = 0,
				hei = 0;
			if(position){
				wid = position.split('×')[0],
	    		hei = position.split('×')[1];
	    	}
    		setIcon();
	    	if(!val || val == ''){
	    		$('#' + viewid).parent().find('p').remove();
	    		return '';
	    	}

			var _val = $.trim(val).replace(/\n+/g,'\n'),
				_a_val = _val.split('\n'),
            	_a_val_l = _a_val.length,
            	_a_val_last = _a_val[_a_val_l - 1],
            	fontsize;
            if(size && size != '' && size != 'auto'){
            	fontsize = size;
            	// 检查文字字数
            } else {
	            fontsize = getFontSize(wid, hei, _a_val_l, _a_val_last);
	            if(!fontsize){
	                // $('editwindow tips').html('文字过多');
	                return;
	            }
	        }

            // 修改之前行的文字 或 换行  时触发
            if(newCmsFlag == 'true' || !t_posi || t_posi != c_posi || t_row != c_row){
            	cms.attr('enternew', 'false');
            	cms.find('p').remove();
            	for(var i = 0, l = _a_val_l - 1; i < l; i++){
					var _p = $('<p>').html(_a_val[i]);
   					view.before(_p);
				}
				pscss(size);
	            cmstextarea.attr({
					'enterposi': t_posi,
					'enterrow': t_row
				});
            }
            dcss(fontsize);
			cmsLineHeight();
			// 设置图片
	    	function setIcon(){
	    		var iconsCount = 0;
		    	if(iconsArr && iconsArr != ''){
	    			iconsCount = iconsArr.length;
					iconsCount = 1;
		    		icon.attr('iname', iconsArr);
		    		cms.css({
		    			left: hei + 'px',
		    			width: wid - hei * iconsCount + 'px'
		    		});
		    		icon.css({
		    			width: hei + 'px',
		    			height: hei + 'px',
		    			backgroundImage: 'url(' + iconsAddr + iconsArr + ')',
		    			backgroundSize: hei + 'px ' + hei + 'px'
		    		});
		    	} else {
		    		icon.attr('iname', '');
		    		cms.css({
		    			left: 0,
		    			width: wid + 'px'
		    		});
		    		icon.css({
		    			width: '0px',
		    			height: '0px',
		    			backgroundImage: 'url()',
		    			backgroundSize: '0 0'
		    		});
		    	}
		    	wid = wid - hei * iconsCount;
		    }
            
            // 计算字间距
            function cmsLetterSpacing(str, fz){
	            var _strn = getByteLen(str.replace(/\n/g,'')),
	            	_letterSpacing = 0, _marginLR = 0;
	            if(str.length > 1){
	            	_letterSpacing = parseInt((wid - _strn / 2 * fz) / (str.length + 1));
	            	if(_letterSpacing > fz / 2){
	            		_letterSpacing = parseInt(fz / 2);
	            	}
	            }
	            _marginLR = parseInt((wid - _strn / 2 * fz - _letterSpacing * (str.length - 1)) / 2);
	            return {
	            	'marginLR': _marginLR,
	            	'letterSpacing': _letterSpacing
	            }
            }
            
            // 计算行间距
            function cmsLineHeight(){
            	var _ps = cms.find('p'),
            		_d = cms.find('div'),
            		_cmsheight = parseInt(cms.css('height')),
            		_totalHeight = 0, _lineHeight = 0, _marginTB = 0;
            	for(var i = 0, l = _ps.length; i < l; i++){
            		_totalHeight += parseInt(_ps.eq(i).css('height'));
            	}
            	if(_d.length > 0){
            		_totalHeight += parseInt(_d.eq(0).css('height'));
            	}
            	if(_a_val_l > 1){
            		_lineHeight = parseInt((_cmsheight - _totalHeight) / (_a_val_l + 1));
            	}
            	_marginTB = parseInt((_cmsheight - _totalHeight - _lineHeight * (_a_val_l - 1)) / 2);
            	cms.find('p, div').css('margin-top', '');
            	cms.find('*:first-child').css('margin-top', _marginTB + 'px');
            	for(var i = 0, l = _ps.length; i < l; i++){
            		var _p = _ps.eq(i);
            		_p.css('margin-bottom', _marginTB + 'px');
            		_p.attr({'positionY': _p.position().top});
            	}
            	_d.attr({'positionY': _d.position().top});
            	cms.find('*:first-child').attr('positionY', _marginTB);
            }

            // 为预览框中的<div>添加样式
            function dcss(fz){
            	var _html = _a_val_last;
            	_textStyle = cmsLetterSpacing(_html, fz),
            	_d = cms.find('div');
            	_d.css({
					height: fz + 'px',
					lineHeight: fz + 'px',
					fontSize: fz + 'px',
					textIndent: _textStyle.letterSpacing + 'px',
					letterSpacing: _textStyle.letterSpacing + 'px'
				}).attr({
					'positionX': _textStyle.marginLR,
					'fz': fz
				});
            }

            // 为预览框中所有的<p>添加样式
            function pscss(fz){
            	var _ps = cms.find('p');
                for(var i = 0, l = _ps.length; i < l; i++){
					var _html = _ps.eq(i).html(),
						_dfz;
					if(fz && fz != '' && fz != 'auto'){
						_dfz = fz;
					} else {
						_dfz = getFontSize(wid, hei, _a_val_l, _html);
					}
					var	_textStyle = cmsLetterSpacing(_html, _dfz),
						_p = _ps.eq(i);
					_p.css({
						height: _dfz + 'px',
						lineHeight: _dfz + 'px',
						fontSize: _dfz + 'px',
						textIndent: _textStyle.letterSpacing + 'px',
						letterSpacing: _textStyle.letterSpacing + 'px'
					}).attr({
						'positionX': _textStyle.marginLR,
						'fz': _dfz
					});
				}
            }

            // 计算字号
            function getFontSize(wid, hei, n, str){
                var _a_fz_i, _fontSize,
                    _str_l = Math.ceil(getByteLen(str.replace(/\n/g,'')) / 2),
                	_fontSize = fontSize(parseInt(wid / _str_l));
                if(!_fontSize){
                    return false;
                }
                if(_fontSize > hei / n){
                    _fontSize = fontSize(parseInt(hei / n));
                }
                return _fontSize;

                function fontSize(fz){
                    var _a_fontSize = [16, 24, 32, 48, 64],
                        i = 0, l = _a_fontSize.length;
                    for(; i < l; i++){
                        if(fz < _a_fontSize[i]){
                            if(i === 0){
                                return false;
                            } else {
                                fz = _a_fontSize[i - 1];
                            }
                            break;
                        }
                    }
                    if(i === l){
                        fz = _a_fontSize[l - 1];
                    }
                    return fz;
                }
            }
	    	return _a_val_last;
	    };
	})
	// 过滤器：
	.filter('cmsInfoList', function () {
	    return function (val, type) {
		    if (!val){
		    	return '';
		    }
		    var arr = [];
	    	for(var i = 0, l = val.length; i < l; i++){
	    		for(var j = 0, jl = val[i].devices.length; j < jl; j++){
	    			if(val[i].devices[j].cmsSizeDesc == type){
	    				arr.push(val[i].devices[j]);
	    			}
	    		}
	    	}
		  	return arr;
	    };
	})
	// 过滤器：
	.filter('cmsStyle', function () {
	    return function (val, textAlign, family, size, color, icon, colorType) {
		    if (!val){
		    	return '';
		    }
		    var size = val.split('×'),
		    	icount = 0;
		    if(!textAlign){
		    	textAlign = '';
		    }
		    if(!family){
		    	family = '';
		    }
		    if(!size){
		    	size = '';
		    }
		    if(!color){
		    	color = '';
		    }
		    if(color.indexOf('#') < 0){
		    	color = '#' + color;
		    }
		    if(icon != null && icon != ''){
		    	icount = 1;
		    }
		    if(colorType != null && colorType != ''){
		    	if(colorType === '1' || colorType === '2'){
		    		color = '#FFFF00';
		    	}
		    }
		  	return {
		  		'width': (size[0] - size[1] * icount) + 'px',
		  		'height': size[1] + 'px',
		  		'text-align': textAlign,
		  		'font-family': family,
		  		'font-size': size,
		  		'color': color
		  	};
	    };
	})
	// 过滤器：
	.filter('wrapStyle', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		    var size = val.split('×');
		  	return {
		  		'width': size[0] + 'px',
		  		'height': size[1] + 'px'
		  	};
	    };
	})
	// 过滤器：
	.filter('pStyle', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		    var familyJson = {
                'SimHei': 'h',
                'SimSun': 's',
                'KaiTi': 'k',
                'h': 'SimHei',
                's': 'SimSun',
                'k': 'KaiTi'
            };
		  	return {
		  		'height': val.fontSize_HH + 'px',
		  		'line-height': val.fontSize_HH + 'px',
		  		'color': '#' + val.fontColor,
		  		'top': val.wordYYY + 'px',
		  		'letter-spacing': val.wordSpace + 'px',
		  		'font-size': val.fontSize_HH + 'px',
		  		'text-indent': val.wordXXX + 'px',
		    	'font-family': familyJson[val.fontName]
		  	};
	    };
	})
	// 过滤器：
	.filter('iColor', function () {
	    return function (val, colorType) {
		    if (!val){
		    	return {
		    		'background-color': '#FFFF00'
		    	};
		    }
		    if(colorType != null && colorType != ''){
		    	if(colorType === '1' || colorType === '2'){
		    		return {
			    		'background-color': '#FFFF00'
			    	};
		    	}
		    }
		    if(val.indexOf('#') < 0){
		    	val = '#' + val;
		    }
		  	return {
		  		'background-color': val
		  	};
	    };
	})
	// 过滤器：
	.filter('deviceStyle', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		  	return {
		  		'background-image': 'url(/Monitor-Graph/static/Images/BtsIcon/' + val.symbolStyle + '.png)',
		  		'top': val.screenY + 'px',
		  		'left': val.screenX + 'px'
		  	};
	    };
	})
	// 过滤器：
	.filter('setIcon', function () {
	    return function (val, addr) {
		    if (!val){
		    	return '';
		    }
		  	return {
		  		'background-image': 'url(' + addr + val + ')'
		  	};
	    };
	})
	// 过滤器：
	.filter('showIcon', function () {
	    return function (val, height, addr) {
		    if (!val){
		    	return '';
		    }
		    if(val.length === 0){
		    	return {
		    		'display': 'none'
		    	};
		    }
		    var height = height.split('×')[1];
		  	return {
		  		'display': 'block',
		  		'width': height + 'px',
		  		'top': val[0].graphXXX,
		  		'left': val[0].graphYYY,
		  		'background-image': 'url(' + addr + val[0].graphId + '.PNG)',
		  		'background-size': height + 'px'
		  	};
	    };
	})
	// 过滤器：
	.filter('resetModel', function () {
	    return function (val, type) {
		    if (!val){
		    	return '';
		    }
		    var arr = [];
		    for(var i = 0, l = val.length; i < l; i++){
		    	if(val[i].commandType == type){
		    		arr.push(val[i]);
		    	}
		    }
		    return arr;
	    };
	})
	// 过滤器：
	.filter('cmsProgram', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		    if(val.deviceVar != null && val.issuedTypeId != null && val.deviceVar[val.issuedTypeId] != null ){
		    	if(val.deviceVar[val.issuedTypeId].deviceVarValue == null){
		    		return 0;
		    	} else {
		    		return (val.deviceVar[val.issuedTypeId].deviceVarValue.length);
		    	}
			} else {
				return 0;
			}
	    };
	})
	// 过滤器：
	.filter('cmsCycle', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		    if(val.deviceVar != null && val.issuedTypeId != null && val.deviceVar[val.issuedTypeId] != null ){
		    	if(val.deviceVar[val.issuedTypeId].deviceVarValue == null){
		    		return 0;
		    	} else {
		    		var arr = val.deviceVar[val.issuedTypeId].deviceVarValue,
		    			time = 0;
		    		for(var i = 0, l = arr.length; i < l; i++){
		    			time += arr[i].timeDelay;
		    		}
		    		return time;
		    	}
			} else {
				return 0;
			}
	    };
	})
	// 过滤器：
	.filter('cmsFault', function () {
	    return function (val) {
		    if (!val){
		    	return '';
		    }
		    if(val.length > 1){
		    	var text = '';
			    for(var i = 0, l = val.length; i < l; i++){
			    	text = text + '(' + (i + 1) + ') ' + val[i] + '. ';
			    }
			    return text;
			} else if(val.length == 1){
				return val[0];
			}
		    return '';
	    };
	})
})(angular);