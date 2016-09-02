<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" deferredSyntaxAllowedAsLiteral="true"%>
<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%
	String result = request.getAttribute("result").toString();
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
<link rel="stylesheet" href="<%=request.getContextPath() %>/css/layout.css" type="text/css" media="screen" />
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js" type="text/javascript"></script>
<script type="text/javascript"src="<%=request.getContextPath()%>/js/gojs/go.js"></script>
<script type="text/javascript"src="<%=request.getContextPath()%>/js/common/load.js"></script>
<script src="<%=request.getContextPath()%>/js/highcharts/highcharts.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	$(".close").click(function(){
		$("#TB_overlayBG").css("display","none");
		$(".box ").css("display","none");
	});
	if("${retback}" == '1'){
		$("#alt_btn_flow").attr("disabled","disabled");
		$("#relook").attr("disabled",false);
	    showflow();
	}
	init();
});


function showbox(){
	
		$("#TB_overlayBG").css({
			display:"block",height:$(document).height()
		});
		$(".box").css({
			left:($("body").width()-$(".box").width())/2-20+"px",
			top:($(window).height()-$(".box").height())/2+$(window).scrollTop()+"px",
			display:"block"
		});
}
/********************************************** 拓扑图 ********************************/
  var AjaxRequestBack = false;
        var IdList;
       
        //onload调用方法
        function init() {
            if (window.goSamples) //判断是否有这个js方法。
                goSamples();
            var $ = go.GraphObject.make;

            myDiagram = $(go.Diagram, "myDiagram", {
                initialContentAlignment : go.Spot.Center
            //整个拓扑图的位置
            });
            //节点的图片，根据传进来的参数获取相对应的图片
            function nodeTypeImage(type) {
                if (type === "4")
                    return "../images/firewall.png";
                if (type === "3")
                    return "../images/switch.png";
                if (type === "2")
                    return "../images/router.png";
                if (type === "5")
                    return "../images/vm.png";
                if (type === "1")
                    return "../images/server.png";
                return "../images/net.png";
            }

            function nodeProblemConverter(msg) {
                if (msg)
                    return "red";
                return null;
            }
            //判断节点左边形状
            function nodeOperationConverter(s) {
                if (s >= 2)
                    return "TriangleDown";
                if (s >= 1)
                    return "Rectangle";
                return "Circle";
            }
            //判断节点右边形状的颜色
            function nodeStatusConverter(s) {
                if (s >= 2)
                    return "red";
                if (s >= 1)
                    return "green";
                return "green";
            }
            //可以通过 problem控制节点的连线和边框的颜色
            //data.status = 10.1;//控制节点内部图标的颜色
            //data.operation //控制节点内图标的形状
            myDiagram.nodeTemplate = $(go.Node, "Vertical", {
                selectable : true//是否可以选择节点并移动
                //mouseOver : function(e, obj) {//鼠标进入响应的事件方法
                //  nodeDoubleClick(e, obj) //事件调用方法
                //}
            },
       /*      { doubleClick: nodeDoubleClick },//鼠标双击事件函数*/
            { click: showbox }, //鼠标单击事件函数 
            {
                locationObjectName : "ICON"
            },
            // new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), //这里使用节点的位置参数，也可以不知用，不使用的时候，就的使用插件的布局属性
            $(go.Panel, "Spot", $(go.Panel, "Auto", {
                name : "ICON"
            }, //这个参数无所谓
            $(go.Shape, {
                fill : null,
                portId : "",
                strokeWidth : 0,
                stroke : null
            },//这两个属性和起来去掉边框
            new go.Binding("background", "problem", nodeProblemConverter)), //这里使用节点的问题描述 problem值为空时：控制线条和边框的颜色，即设备是否出现问题
            $(go.Picture,
            //{ stroke: ""},
            {
                margin : 0
            }, //这里控制图片和外围边框的边距
            {
                desiredSize : new go.Size(60, 60)
            }, new go.Binding("source", "type", nodeTypeImage))), //这里是用节点的类型，即是用的图片
            //这段代码是控制节点内部左边图标初始颜色 形状等，位子信息
            //            $(go.Shape, "Circle",
            //              { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft, //TopLeft显示的位置
            //                  width: 10, height: 10, fill: "Green"//这里的颜色是控制节点内部左边图标的颜色
            //              },

            //              new go.Binding("figure", "operation", nodeOperationConverter)) //这里是用节点形状参数

            //这段代码是控制节点内部右边图标初始颜色 形状等，位子信息
            $(go.Shape, "Circle", {
                alignment : go.Spot.TopRight,
                alignmentFocus : go.Spot.TopRight, //TopLeft显示的位置
                width : 0,
                height : 0,
                fill : "Green"
            }, new go.Binding("fill", "status", nodeStatusConverter)) //这里是用节点状态参数
            ),
            //这里是节点文字的样式
            $(go.TextBlock, {
                font : " 12px Helvetica, bold Arial, sans-serif",
                stroke : "black",
                margin : 3
            }, new go.Binding("text")));

            //设置线条的颜色
            function linkProblemConverter(msg) {
                if (msg)
                    return "red";
                return "#227700";
            }

            myDiagram.linkTemplate = $(go.Link, go.Link.AvoidsNodes, {
                corner : 3
            }, //控制线的转弯的弧度值越小 越呈现直角
            $(go.Shape, {
                strokeWidth : 1
            }, //控制线条的粗细，值越大  线越粗
            new go.Binding("stroke", "problem", linkProblemConverter)));

            //节点的布局                
            myDiagram.layout = $(go.LayeredDigraphLayout, {
                direction : 270, //拓扑图的方向
                layerSpacing : 10,
                columnSpacing : 15,
                setsPortSpots : false
            });

            //在这里加载数据
            load();
            //利用随机数随机设备出现问题的方法
            function randomProblems() {
                if (AjaxRequestBack) {

                    var model = myDiagram.model;
                    //nodeDataArray
                    //设置问题节的颜色
                    var arr = model.nodeDataArray;
                    for (var i = 0; i < arr.length; i++) {
                        data = arr[i];

                        //console.log(data.key);
                        for (var t = 0; t < IdList.length; t++) {
                            if (data.key == IdList[t]) {
                                data.status = 3;
                            } else {
                                //data.status = 1;
                            }
                        }

                        //data.problem = (Math.random() < 0.8) ? "" : "Power loss due to ...";//0.8是一个零界点
                        //data.problem = ""; //当为空的时候就是没问题
                        //data.problem = "Power loss due to ...";//当这个的时候就是有问题
                        //data.status = 10.1;//这个数据是用于判断节点右边正方形 圆形 三角形还有形状的颜色（右边形状不变）
                        //data.operation = 0.1; //设置节点左边正方形 圆形 三角形还有形状的颜色（左边的形状颜色不变）

                        //data.operation = 0.3;
                        model.updateTargetBindings(data);
                        data.status = 1;
                    }

                    //获取JSON数据中的linkDataArray
                    //设置节点之间线的颜色
                  /*  
                    arr = model.linkDataArray;
                    for (i = 0; i < arr.length; i++) {
                        data = arr[i];
                        data.problem = (0.1 < 0.7) ? "" : "No Power";
                        model.updateTargetBindings(data);
                    }
                     */
                    AjaxRequestBack = false;
                }
            }
            //设置间隔时间获取设备的状态
            function loop1() {
                setTimeout(function() {
                    //GetStatus();
                    loop1();
                }, 4000);
            }
            loop1();
            function loop() {
                setTimeout(function() {
                    randomProblems();
                    loop();
                }, 5500);
            }
            loop(); // start the simulation
            myDiagram.makeImage({
                scale : 1,
                background : "AntiqueWhite",
                type : "image/jpeg",
                details : 0.05
            });
        }
        
        function load() {
            var str = <%=result%>;
            myDiagram.model = go.Model.fromJson(str);
        }

        function GetStatus() {
            $.ajax({
                url : 'topo',
                type : 'post',
                success : function(data) {
                    var result = eval("(" + data + ")");
                    IdList = result.IdList;

                    AjaxRequestBack = true;
                }
            });

        }

        function highlightNode(e, node) {
           /*  alert(node.data.text); */
        }

        function showDiv(){
        	
        }
        function nodeDoubleClick(e, node) {
        	//window.showModalDialog('<%=basePath %>task/getNodeInfo',window,'dialogLeft:150px;dialogTop:75px;dialogWidth=1300px;dialogHeight=650px,center:yes');
            window.open('<%=basePath %>task/getNodeInfo?taskid=' + ${taskid} + '&ip=' + node.data.ip + '&tabpage=1','_blank',' top=0, left=0, width=screen.width,height=screen.height,toolbar=no,menubar=no,resizable=no,scrollbars=yes,resizable=no,location=no,status=no');
        }
        
     <%--    function handle(type){
        	divLoadInit("#main"); 
        	window.location.href = "<%=basePath %>task/handle?id=" + ${taskid} + "&type=" + type;
        } --%>
        
        function addSceInfo(sceTime, sceDev, sceCondition){
        	$("#sceTime").html(sceTime);
        	$("#sceDev").html(sceDev);
        	$("#sceCondition").html(sceCondition);
        }
        
        function startC(){
        	divLoadInit("#main");
        	location.href = "createChildTask?id=${taskid }&scenceId=${scenceId}&ip=${ip}";
        }
        
        
     if("${retback}" == '1'){
   		$.ajax({
              url : 'flowRun',
              type : 'post',
              data: {"id" : "${oldtaskid}", "starTime":"${starTime}", "endTime":"${endTime}"},
              success : function(data) {
                 
              }
          });
     }  
        
     function showflow(){   
        //流量1
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            var chart;
            $('#wlxx_chart').highcharts({
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 1,
                    events: {
                        load: function () {

// set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                        y = ajaxGetOctsUserd();//Math.random();
                                series.addPoint([x, y], true, true);
                            }, 5000); //取值频率
                        }
                    }
                },
                title: {
                    text: '接收流量情况'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 120 //
                },
                yAxis: {
                    title: {
                        text: 'Bps'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }
                    ]
                },
                tooltip: {
                    formatter: function () { //数据点的显示串
                        return '<b>' + this.series.name + '</b><br/>' +
                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [
                    {
                        name: '流量',
                        data: (function () {
// generate an array of random data
                            var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                            for (i = -19; i <= 0; i++) {
                                data.push({
                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
                                    y: 0
                                });
                            }
                            return data;
                        })()
                    }
                ]
            });
            
            //流量2
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            var chart;
            $('#wlxx_chart_s').highcharts({
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 1,
                    events: {
                        load: function () {

// set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                        y = ajaxGetOctsSendUserd();//Math.random();
                                series.addPoint([x, y], true, true);
                            }, 5000); //取值频率
                        }
                    }
                },
                title: {
                    text: '发送流量情况'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 120 //
                },
                yAxis: {
                    title: {
                        text: 'Bps'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }
                    ]
                },
                tooltip: {
                    formatter: function () { //数据点的显示串
                        return '<b>' + this.series.name + '</b><br/>' +
                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [
                    {
                        name: '流量',
                        data: (function () {
// generate an array of random data
                            var data = [],
                                    time = (new Date()).getTime(),
                                    i;

                            for (i = -19; i <= 0; i++) {
                                data.push({
                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
                                    y: 0
                                });
                            }
                            return data;
                        })()
                    }
                ]
            });
      	}
	            
	//ajax获取流量
   	function ajaxGetOctsSendUserd(){
   	    var mUsed = "";
   		$.ajax({
            url : 'getUserdSend',
            data:{"ip":'${ip }',"task_id":'${taskid}'},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.octsSendUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	//ajax获取流量
   	function ajaxGetOctsUserd(){
   	    var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}'},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.octsUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	function relook(){
   		location.href = "toSceneBack4?id=${taskid }";
   	}
</script>
</head>

<body>

<!-- end of header bar -->

<section id="main" class="column">
  <article class="module width_full">
    <div class="clearfix">
      <h3 >场景回溯 -- ${task.name } -- 流量回放</h3>
    </div>
    <div style="margin:20px 5%;background: none;width: 90%;">
    	 <div style="text-align:center; margin-top:30px;height:350px;" id="myDiagram"></div>
     <%--  <div style=" text-align:center;"><img src="<%=request.getContextPath() %>/images/wltpjg.jpg" width="769" height="561" usemap="#Map">
        <map name="Map">
          <area shape="rect" coords="247,355,304,412" href="javascript:void(0);" class="showbox">
        </map>
      </div> --%>
      <div id="TB_overlayBG" style="display: none; height: 711px;"></div>
      <div class="box" style="display: none; left: 480px; top: 273px;">
        <h2>设备远程登录设置<a href="#" class="close">关闭</a></h2>
        <div class="mainlist">
          <p>登录方式：
            <input type="radio" name="name2" checked="checked" />
            URL
            <input type="radio" name="name2" />
            TELNET
            <input type="radio" name="name2" />
            SSH</p>
          <p>http:
            <input type="text" style="margin-left:10px; width:190px;">
          </p>
          <p><a href="#">
            <input type="submit" class="alt_btn1" value="登录">
            </a><a href="#" style="margin-left:50px;">
            <input type="submit" value="重置">
            </a></p>
        </div>
      </div>
      <div class="dw2">
        <input type="radio" name="name1" checked="checked" />
        <span>发现并记录场景</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="radio" name="name1" />
        <span>只发现场景</span></div>
      <br />
      <br />
    </div>
    <div style="width:100%;height:300px;background:none;">
    <hr>
    <div style="width:49%;height:280px;float:left;margin-left:5px;" id="wlxx_chart"></div>
    <div style="width:49%;height:280px;float:left;margin-left:5px;" id="wlxx_chart_s"></div>
    </div>
    <footer>
      <div class="submit_link">
      	<input type="button" value="上一步" onclick="javascript:history.go(-1);" />&nbsp;
      	<a href="javascript:void(0);" onclick="startC();">
        	<input type="button" value="开始流量回放" id="alt_btn_flow" class="alt_btn1">
       	 	&nbsp;
        </a>&nbsp;<a href="add.html">
        <input type="button" id="relook" value="场景回看" disabled="disabled" onclick="relook();" />
        </a> </div>
    </footer>
  </article>
</section>
<br />
<br />
<br />
<br />
</body>
</html>