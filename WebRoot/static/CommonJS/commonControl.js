//新加的js
$(function(){
	//CommonJs();	  //一些公用的功能
	customFunc();     //滚动条引入
	popupPackUp();	  //一些公用的弹出和收起
	CommonCss();	  //一些样式的改变
})     
$(window).resize(function(){
	CommonCss();
})
function CommonCss(){
	var len = $("#skipSearch>a").length;
	var secondGrayWidth = (parseInt($("#event").width())-(len*200+69))+"px";
	$("#secondGray").css("width",secondGrayWidth);
	var tableScollHeight = (parseInt($("#event").height())-217)+"px";
	$("#tableScoll").css("height",tableScollHeight);
	$("#div1").css("overflow","visible");
}
function CommonJs(){
//	$("#textateBigger").focus(function(){
//		$(this).animate(function(){
//			height:200px;
//		})
//	})
}
//表格点击三角号弹出子菜单的方法
var tdShowHide = function(id){
		
		if($("#"+id).attr("class") == "i-open"){
			$("#"+id).attr("class","i-close");
			$("."+id).slideDown();
		}else{
			$("#"+id).attr("class","i-open");
			$("."+id).slideUp();
	}
}
//一些公用的弹出和收起
var popupPackUp = function(){
	//查询的弹出和收起
	 $(".cx").click(function(){
         var div=$("#inquire");
         div.animate({right:'0px'},"slow");
      });
      $("#inquire_button").click(function(){
         var div=$("#inquire");
         div.animate({right:'-23%'},"slow");
      });
      //详情的弹出和收起
      $(".tableDetails").click(function(){
          var div=$("#details");
          div.animate({right:'0px'},"slow");
       });
        $("#detailsButton").click(function(){
           var div=$("#details");
          div.animate({right:'-55%'},"slow");
       });
        //路况信息的详情的模块切换
        $("#toggleBtn button").click(function(){
        	$(this).attr("class","btn btn-primary");
        	$(this).siblings().attr("class","btn btn-defaults");
        	if($(this).html() == "事件描述"){
        		$(".section1").css("display","none");
        		$(".section2").css("display","none");
                $("section").css("display","block");
        	}else if($(this).html() == "现场图片"){
        		$("section").css("display","none");
       	     	$(".section1").css("display","block");
       	     	$(".section2").css("display","none");
        	}else if($(this).html() == "视频联动"){
        		$("section").css("display","none");
       	     	$(".section2").css("display","block");
       	     	$(".section1").css("display","none");
        	}
        })
        //增加处理的模块切换
        $("#subjectNav li").click(function(){
		 	$(this).attr("class","active");
		 	$(this).siblings().attr("class","");
		 	if($(this).attr("id") == "nav_1"){
		 		 $(".subject-section").css("display","block");
		 		 $(".pic").css("display","none");
		 	}else{
		 		 $(".pic").css("display","block");
		          $(".subject-section").css("display","none");
		 	}
		 })
		 //点击左侧菜单改变背景颜色
		 $("#indexUl>li").click(function(){
			 $(this).css("background-color","#238ABD");
			 $(this).siblings().css("background-color","");
		 })
		 //点击textarea使得自身变高
		 $(".textareaFocus").focus(function(){
			 $(this).css("position","absolute");
			 $(this).animate({
				 height:"300px",
				 top:"-100px",
			 },"4000")
		 })
        //失去焦点时
        $(".textareaFocus").blur(function(){
			 $(this).animate({
				 height:"102px",
				 top:"0px",
			 },"4000",function(){
				 $(this).css("position","");
			 });
		 })
}  
/*
 * 下面部分其他模块可能用到，有待处理。
 * 
 * */


//日常处理部分的点击切换。
     $(function(){
       $("#t1").click(function(){
       $("#t1").css("background","#0E41BC");
       $("#click_l>li:not(#t1)").css("background","#3AC4A2");
       $("#none>div:not(#XinShiJian").css("display","none");
       $("#XinShiJian").css("display","block");
    });
       $("#t2").click(function(){
       $("#t2").css("background","#0E41BC");
       $("#click_l>li:not(#t2)").css("background","#3AC4A2");
       $("#none>div:not(#XinShangBao").css("display","none");
       $("#XinShangBao").css("display","block");
    });
      $("#t3").click(function(){
      $("#t3").css("background","#0E41BC");
      $("#click_l>li:not(#t3)").css("background","#3AC4A2");
      $("#none>div:not(#XinLiuZhuan").css("display","none");
      $("#XinLiuZhuan").css("display","block");
    });
      $("#t4").click(function(){
      $("#t4").css("background","#0E41BC");
      $("#click_l>li:not(#t4)").css("background","#3AC4A2");
      $("#none>div:not(.table)").css("display","none");
      $(".table").css("display","block");
    });
      $("#t5").click(function(){
      $("#t5").css("background","#0E41BC");
      $("#click_l>li:not(#t5)").css("background","#3AC4A2");
      $("#none>div:not(#XinHeiMingDan").css("display","none");
      $("#XinHeiMingDan").css("display","block");
    });
      $("#t6").click(function(){
      $("#t6").css("background","#0E41BC");
      $("#click_l>li:not(#t6)").css("background","#3AC4A2");
      $("#none>div:not(#XinBaiMingDan").css("display","none");
      $("#XinBaiMingDan").css("display","block");
    });
      $("#t7").click(function(){
      $("#t7").css("background","#0E41BC");
      $("#click_l>li:not(#t7)").css("background","#3AC4A2");
    });  
      //常用联系电话部分的新增
    $("#add").click(function(){
      if ($(this).hasClass("active")) {
        if ($("#txtName").val()==null) {
          var $tr=$("<tr class='tr'><td><input id='txtName' type='text' placeholder='请输入单位名称'></td><td><input id='txtTel' type='text' placeholder='请输入电话号码'><span class='dui'>√</span></td></tr>");
        $("#div5>tbody").prepend($tr);
          $(this).addClass("active");}
          else{
            $('#div5>tbody>tr:first-child').remove();
            $(this).removeClass("active") };
      }else{
        var $tr=$("<tr class='tr'><td><input id='txtName' type='text' placeholder='请输入单位名称'></td><td><input id='txtTel' type='text' placeholder='请输入电话号码'><span class='dui'>√</span></td></tr>");
        $("#div5>tbody").prepend($tr);
          $(this).addClass("active");
        };
         $(".dui").click(function(){
        $(this).parent().append($("#txtTel").val());
         $(".tr>td:first-child").append($("#txtName").val());
          $(this).remove();
          $("#txtName").remove();
          $("#txtTel").remove();
      });
      });
    //常用联系电话部分的删除
   $("#delete").click(function(){
      if($(this).hasClass("active")){
      $('.error').remove();
      $(this).removeClass("active")
    }else{
       var $div=$("<div class='error'>×</div>");
       $("#div5 td:first-child").append($div);
       $(this).addClass("active");
       $(".error").click(function(){
       var $tr = $(this).parent().parent();
       $tr.remove();
      });
    }
});
    //共享信息部分的删除
     $("#delete_1").click(function(){
        if($(this).hasClass("active")){
        $('.error_1').remove();
        $(this).removeClass("active")
    }else{
        var $div_1=$("<div class='error_1'>×</div>");
        $("#header~div").append($div_1);
        $(this).addClass("active");
        $(".error_1").click(function(){
        var $tr = $(this).parent();
        $tr.remove();
      });
    }
});
    //重要提示部分的删除
       $("#shan").click(function(){
            if($(this).hasClass("active")){
            $('.error_2').remove();
            $(this).removeClass("active")
        }else{
            $(".important").css("display","none");
            $("#text1").css("display","block");
            var $div_2=$("<div class='error_2'>×</div>");
            $("#text1>ul>li").append($div_2);
            $(this).addClass("active");
            $(".error_2").click(function(){
            var $tr = $(this).parent();
            $tr.remove();
        });
      }
    });
        //共享信息部分的新增弹出
      $("#xianshi").click(function(){
         var div=$("#hidden_div");
         div.animate({right:'0px'},"slow");
      });
      $("#hidden_div .hidden_error").click(function(){
         var div=$("#hidden_div");
         div.animate({right:'-57%'},"slow");
      });
      // 更新路况新增部分弹出
      $("#t7").click(function(){
         var div=$("#hidden_div2");
         div.animate({right:'0px'},"slow");
      });
      $("#hidden_div2 .hidden_button2").click(function(){
         var div=$("#hidden_div2");
         div.animate({right:'-57%'},"slow");
      });
       //重要提示部分的新增弹出
      $("#xianshi1").click(function(){
         var div=$("#hidden_div1");
         div.animate({right:'0px'},"slow");
        $("#text").css("display","none");
        $("#text1").css("display","block");
    $(".begin").addClass("active");
     });
     $("#hidden_div1 .hidden_button").click(function(){
       var div=$("#hidden_div1");
       div.animate({right:'-57%'},"slow");
     });
     //动画的切换
     $(".begin").on("click",function(){
        if($(this).hasClass("active")){
        $("#text1").css("display","none");
        $(".important").css("display","block");
        $(this).removeClass("active")
      }else{
        $(".important").css("display","none");
        $("#text1").css("display","block");
        $(this).addClass("active");
      }
    });
 
  $(".icon_1").parent().parent().click(function(){
     $("iframe").attr("src","personal_homepage.html");
      $("body").css("overflow","");
  })
  $(".sjgl").click(function(){
     $("iframe").attr("src","sjgl.html");
     // $("body").css("overflow","hidden");
  })
// 点击投诉管理跳转的iframe
  
  $(".icon_5").parent().parent().click(function(){
     $("iframe").attr("src","tsgl.html");
  })
  // 点击呼叫流转跳转到山西的巡查日志
 $(".icon_3").parent().parent().click(function(){
     $("iframe").attr("src","xcrz.html");
  })  
    // 点击地图服务跳转到山西的案件办理中的赔补偿
 $(".icon_8").parent().parent().click(function(){
     $("iframe").attr("src","ajbl_pbc/pbc.html");
  })  
  window.onresize=function(){
   if($(".html").height()==$(window).height()){
        $(window).scrollTop(0);
   }
 }
  });














