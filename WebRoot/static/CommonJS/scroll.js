/**
 * 在需要添加自定义滚动条的元素上添加自定义属性 customAttr="scroll", 并设定这个元素为绝对定位(position: absolute;)
 */

function customFunc(bottom) {
    var aDom = $("*");
    var customDoms = [];
    for (var i = 0, l = aDom.length; i < l; i++) {
        var dom = aDom.eq(i);
        if (dom.attr("customAttr")) {
            customDoms.push(dom);
        }
    }

    // 滚动条 & 更新滚动条
    for (var i = 0, l = customDoms.length; i < l; i++) {
        (function (i) {
            var cScroll = customDoms[i];
            if(cScroll.attr("customAttr") === "scroll"){
                customScroll(cScroll, '', bottom);
            } else if(cScroll.attr("customAttr") === "resize"){
                customScroll(cScroll, 'resize', bottom);
            }
        })(i);
    }
}

var customScrollFn = {
    createScroll: function(scroll){
        var _wrap = scroll,
            _scroll = _wrap.find('*[custombody]'),
            _parent = _wrap.parent();
        if(_parent.prop("tagName") !== "BODY" && _parent.css("position") === "static"){
            _parent.css("position", "relative");
        }
        return {
            "wrap": _wrap,
            "scroll": _scroll
        };
    },
    createScrollDoms: function(wrap){
        var _wrap = wrap;
        var _wrapScrollBar = $("<div>", { class: "wrap-scroll-bar"}).appendTo(_wrap);
        var _scrollBar = $("<div>", { class: "scroll-bar"}).appendTo(_wrapScrollBar);
        var _scrollBarBack = $("<div>", { class: "scroll-bar-back"}).appendTo(_wrapScrollBar);
        _wrap.attr('customAttr', 'resize');
        return {
            wrapScrollBar: _wrapScrollBar,
            scrollBar: _scrollBar
        };
    }

};

function customScroll(scroll, resize, bottom) {
    var _scroll, _wrap;
    if(resize && resize != ''){
        _wrap = scroll;
        _scroll = scroll.find('*[custombody]');
    } else {
        var doms = customScrollFn.createScroll(scroll);
        _wrap = doms.wrap,
        _scroll = doms.scroll;
    }
    if(_wrap.height() >= _scroll.height()){
        if(_wrap.find('.wrap-scroll-bar').length > 0){
            _wrap[0].removeEventListener("DOMMouseScroll", fnMouseWheel, false);
            _wrap[0].onmousewheel = '';
            _scroll.css('top', 0);
            _wrap.find('.wrap-scroll-bar').css('display', 'none');
        }
        return;
    }
    _wrap.find('.wrap-scroll-bar').css('display', '');
    var scrolls, _wrapScrollBar, _scrollBar;
    if(resize && resize != ''){
        _wrapScrollBar = _wrap.find('.wrap-scroll-bar'), 
        _scrollBar = _wrap.find('.scroll-bar');
    } else {
        scrolls = customScrollFn.createScrollDoms(_wrap),
        _wrapScrollBar = scrolls.wrapScrollBar, 
        _scrollBar = scrolls.scrollBar;
    }
    var _ch = _scroll.outerHeight();
    var _wh = _wrap.outerHeight();

    _wrapScrollBar.css("display", "block");
    _wrap.css("overflow", "hidden");

    //设置滚动按钮高度
    _scrollBar.height((_wh * _wh / _ch));

    var _sh = _scrollBar.height();
    var disY = 0;

    //滚动条拖动事件
    if(resize && resize != ''){
        _scrollBar.unbind('mousedown');
        _scrollBar.unbind('mousemove');
        _scrollBar.unbind('mouseup');
    }
    _scrollBar.mousedown(function(event){
        var bbDisY = 0;
        var sbDisY = event.pageY - _scrollBar.offset().top;  // 点击位置跟滚动条顶端的位置
        var wsbDisY = _wrapScrollBar.offset().top;
        disX = event.pageY - $(this).position().left;
        if (this.setCapture) {
            $(this).mousemove(function(event){
                fnChangePos(event.pageY - disY - wsbDisY - sbDisY);
            });
            this.setCapture(); //设置捕获范围
            _scrollBar.mouseup(function(){
                $(this).unbind('mousemove mouseup');
                this.releaseCapture(); //取消捕获范围
            });
        } else {
            $(document).mousemove(function(event){
                fnChangePos(event.pageY - disY - wsbDisY - sbDisY);
            });
            $(document).mouseup(function(){
                $(document).unbind('mousemove mouseup');
            });
        }
        return false;
    });
    function fnChangePos(data) {
        if (data < 0) data = 0;
        else if (data > (_wh - _sh)) data = _wh - _sh;
        _scrollBar.css('top', data);
        _scroll.css('top', -(_ch - _wh) * data / (_wh - _sh));
        if(parseFloat(_scroll.css('bottom')) == 0){
            _scroll.attr('custombody', 'bottom');
        }
        if(parseFloat(_scroll.css('bottom')) != 0 && _scroll.attr('custombody') != 'normal'){
            _scroll.attr('custombody', 'normal');
        }
    }

    // 鼠标在滚动条上点击或滚动滚轮单次移动的距离
    var sMoveDis = 18;
    // 滚动条单击事件注册
    if(resize && resize != ''){
        _wrapScrollBar.unbind('click');
    }
    _wrapScrollBar.click(function(event){
        var relDisY = event.pageY - $(this).offset().top;
        if (relDisY > (_scrollBar.position().top + _sh)) {
            fnChangePos(_scrollBar.position().top + sMoveDis)
        } else if (relDisY < _scrollBar.position().top) {
            fnChangePos((_scrollBar.position().top - sMoveDis))
        };
    });
    // 阻止事件冒泡
    _scrollBar.click(function(event){
        event.stopPropagation();
    });

    // 滚动条鼠标滚轮事件注册
    if(resize && resize != ''){
        _wrap[0].removeEventListener("DOMMouseScroll", fnMouseWheel, false);
        _wrap[0].onmousewheel = '';
    }
    if (_wrap[0].addEventListener) {      //for firefox
        _wrap[0].addEventListener("DOMMouseScroll", fnMouseWheel, false);
    }
    _wrap[0].onmousewheel = fnMouseWheel; // for other browser


    // 鼠标滚轮事件处理函数
    function fnMouseWheel(e){
        var evt = e || window.event;
        var wheelDelta = evt.wheelDelta || evt.detail; //鼠标滚动值，可由此判断鼠标滚动方向
        if(wheelDelta == -120 || wheelDelta == 3){
            fnChangePos(_scrollBar.position().top + sMoveDis);
        } else if(wheelDelta == 120 || wheelDelta == -3){ 
            fnChangePos(_scrollBar.position().top - sMoveDis);
        }
    }

    // 滚动块显示处理
    if(_sh >= 13){
        _scrollBar.height(_sh - 2);
    }

    if(_scroll.attr('custombody') === 'bottom'){
        _scroll.css('top', _wh - _ch + 'px');
        _scrollBar.css('top', _wrapScrollBar.height() - _scrollBar.height() + 'px');
    }

    if(bottom && bottom != '' && _scroll.attr('customsubmit') != null){
        _scroll.css('top', _wh - _ch + 'px');
        _scrollBar.css('top', _wrapScrollBar.height() - _scrollBar.height() + 'px');
    }
}