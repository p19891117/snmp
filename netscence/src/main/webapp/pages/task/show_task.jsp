<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<meta charset="utf-8" />
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/layout.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <script src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/js/jquery/jquery.tablesorter.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/js/highcharts/highcharts.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/js/highcharts/highcharts-more.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/js/zTree/jquery.ztree.core-3.5.js" type="text/javascript" ></script>
    <script src="<%=request.getContextPath()%>/js/zTree/jquery.ztree.excheck-3.5.js" type="text/javascript" ></script>
    <style type="text/css">
    .divsize_scroll{overflow-y:scroll;height:300px;overflow-x:hidden}
    .divsize2_scroll{overflow-y:scroll;height:400px;overflow-x:hidden}
    .divsize3_scroll{overflow-y:scroll;height:740px;overflow-x:hidden}
    .divsize{height:300px}
    .divsize2{height:400px}
    .divsize3{height:250px}
    </style>
    <script type="text/javascript"src="<%=request.getContextPath()%>/js/ht/d3.js"></script>
    <script type="text/javascript"src="<%=request.getContextPath()%>/js/timeline/realTime.js"></script>
    <script type="text/javascript"src="<%=request.getContextPath()%>/js/ht/realTimeAxis.js"></script>
    <script type="text/javascript"src="<%=request.getContextPath()%>/js/timeline/mytimeline.js"></script> 
	<script type="text/javascript"src="<%=request.getContextPath()%>/js/gojs/go.js"></script>
	<script type="text/javascript"src="<%=request.getContextPath()%>/js/common/load.js"></script>
	<script type="text/javascript"src="<%=request.getContextPath()%>/js/chart/wtree.js"></script>
	<script type="text/javascript">
    var AjaxRequestBack = false;
    var IdList;
   
    //onload调用方法
    function init() {
    	if('${handleResult}' != 'noMsg'){
    		alert("${handleResult}");
    	}
    	if('${flow}' == '1'){
    		jQuery.ajax({
	            url : 'flowGather',
	            type : 'post',
	            data: {"id":${task.id}},
	            success : function(data) {
	            }
	        });
    	}
    	
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
        { doubleClick: nodeDoubleClick },//鼠标双击事件函数
        { click: nodeDoubleClick }, //鼠标单击事件函数
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
        alert(node.data.text);
    }

    function showDiv(){
    	
    }
    function nodeDoubleClick(e, node) {
    	//window.showModalDialog('<%=basePath %>task/getNodeInfo',window,'dialogLeft:150px;dialogTop:75px;dialogWidth=1300px;dialogHeight=650px,center:yes');
        window.open('<%=basePath %>task/getNodeInfo?taskid=' + ${task.id} + '&ip=' + node.data.ip + '&tabpage=1','_blank',' top=0, left=0, width=screen.width,height=screen.height,toolbar=no,menubar=no,resizable=no,scrollbars=yes,resizable=no,location=no,status=no');
    }
    
    function handle(type){
    	$.ajax({
            url : 'getConfScen',
            type : 'post',
            data: {"id":${task.id}},
            success : function(data) {
                var result = eval("(" + data + ")");
                flag = result.has;
                if(flag == "0" && type == "1"){
				    alert("请先设置场景发现规则，再启动！");
				    return;
		    	}
		    	divLoadInit("#main"); 
		    	window.location.href = "<%=basePath %>task/handle?id=" + ${task.id} + "&type=" + type;
            }
        });
    	
    }
    
    function addSceInfo(sceTime, sceDev, sceCondition){
    	$("#sceTime").html(sceTime);
    	$("#sceDev").html(sceDev);
    	$("#sceCondition").html(sceCondition);
    }
</script>
    <script type="text/javascript">
    var tab = 1;
	$(document).ready(function() {
	tab = ${tabpage};
	//When page loads...
	//$("#tab_sbss1").show(); //Hide all content
	//$("ul.tab_sbss li:first").addClass("active").show(); //Activate first tab
	//$(".tab_content:first").show(); //Show first tab content
	if(tab == 1){
		$("#1").parent().addClass("active");
		$("#tab_sbss1").fadeIn();
	}else if(tab == 2){
		$("#2").parent().addClass("active");
		$("#tab_sbss2").fadeIn();
	}
	//showTabPage();
	
	//On Click Event
	$("ul.tab_sbss li").click(function() {
		//$("ul.tab_sbss li").removeClass("active"); //Remove any "active" class
		//$(this).addClass("active"); //Add "active" class to selected tab
		//$(".tab_content").hide(); //Hide all tab content

		tab = $(this).find("a").attr("id");
		//var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		//$(activeTab).fadeIn(); //Fade in the active ID content
		console.log("*****************");
		console.log(${task.id});
		window.location.href = '<%=basePath %>task/showtask?taskid='+ ${task.id} +'&tabpage=' + tab;
		//showTabPage();
		//return false;
	});

});
    </script>
    </head>

    <body onload="init()">
<section id="main" class="column" style="width: 100%;height:80%;">
  <article class="module width_full">
    <div class="clearfix"><h3 >设备实时采集信息展示</h3></div>
    <div style="background: none;">
      <ul class="tab_sbss clearfix">
        <li><a href="#tab_sbss1" id="1">实时拓扑图信息</a></li>
        <li><a href="#tab_sbss2" id="2">自定义图形信息</a></li>
      </ul>
      <div class="tab_container" style="margin:0px;height:600px;">
        <div id="tab_sbss1" class="tab_content" style="display: none;">
		    <h4 class="alert_info clearfix" style="margin-bottom:0%;">场景记录名称：${task.name } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开始时间：<span id="starT"><fmt:formatDate value="${task.starTime}" type="both"
		                                    pattern="yyyy-MM-dd HH:mm:ss" /></span>&nbsp;&nbsp;&nbsp;&nbsp;结束时间：<span id="endT"><fmt:formatDate value="${task.endTime }" type="both"
		                                    pattern="yyyy-MM-dd HH:mm:ss" /></span>&nbsp;&nbsp;&nbsp;&nbsp;状态：
		      <c:if test="${task.status == '1' }">
			      创建
		      </c:if>
		      <c:if test="${task.status == '2' }">
			      启动
		      </c:if>
		      <c:if test="${task.status == '3' }">
			      暂停
		      </c:if>
		      <c:if test="${task.status == '4' }">
			      终止
		      </c:if>
		      <c:if test="${task.status == '0' }">
			      无效
		      </c:if><span style="float:right;">
		      <c:if test="${task.status == '1'}">
			      <a href="javascript:void(0);">
			      <input type="button" value="开始" class="alt_btn1" onclick="handle(1)">
			      </a>&nbsp;
		      </c:if>
		      <c:if test="${task.status == '2' }">
			      <a href="javascript:void(0);">
			      <input type="button" value="暂停" onclick="handle(2)">
			      </a>
		      </c:if>
		      <c:if test="${task.status == '2' }">
			      <a href="javascript:void(0);">
			      <input type="button" value="终止" class="alt_btn1" onclick="handle(3)">
			      </a>&nbsp;
		      </c:if>
		      <c:if test="${task.status == '3' }">
			      <a href="javascript:void(0);">
			      <input type="button" value="重新开始" class="alt_btn1" onclick="handle(4)">
			      </a>&nbsp;
		      </c:if>
		      </span></h4>
		    <div style="margin:20px 5%;background: none;width: 90%;white-space:nowrap;" class="clearfix">
		      <div class="control-group">
				    <div style="width: 1172px;height: 110px">
				        <div style="float: left;width: 1112px;">
				            <div style="float: left;width: 50px;">
				                <button onclick="left()" style="background:url(../images/left.png) no-repeat;height:52px;width:51px; margin-top:28px;border:none;"></button>
				            </div>
				            <div id="realTimeAxis" style="float: left;width: 1060px;height: 52px;"></div>
				        </div>
				        <div style="float: right;width: 52px;">
				            <button onclick="right()" style="background:url(../images/right.png) no-repeat;height:52px;width:51px; margin-top:28px;border:none;"></button>
				        </div>
				    </div>
				</div>
		      
		      <div class="clear"></div>
		      
		      <div style="text-align:center; margin-top:30px;height:350px;" id="myDiagram">
			    
		      </div>
		      <div id="img_box" class="img_box" style="display:none;">
		        <div class="clearfix"><a href="#" onClick="document.getElementById('img_box').style.display='none';" style="float:right;">X</a></div>
		        <br>
		    </div>
        </div>
        </div>
        <div id="tab_sbss2" class="tab_content" style="display: none;">
          <div class="clear"></div> 
     <!--展示菜单的div  -->
         <div id="systree" class="ztree" style="overflow-y:auto; overflow-x:auto;float:left;width:18%;height:600px;"></div> 
     <!--展示图表的div  -->
      <div style="overflow-y:auto; overflow-x:auto;background: #fff; float:right;width:80% ;height:580px;">
      <!-- 表格布局，每一个单元格就是一个图形 -->
       <table class="tablesorter_b border" id="chartTable" cellspacing="0">
       <thead><tr><th colspan="2"><input type="button" id="but" value="增加一行" style="float:right" onclick="addTab()"/><input type="button" id="delall" onclick="delall()" value="全部删除" style="float:right"/></th></tr></thead>
	              <tbody id="showTab" align="center">
	              
	                <tr height="380px">
	                <td width="50%">
	                <!-- 图表div 页面初始化时隐藏，添加图形时显示-->
	                <div class="sbss_wlxx1 divsize3" id="chartID_div_a" style="display:none">
	                <input type="button" value="删除" id="delete" onclick="deleteChart('chartID_a','addButton','chartID_div_a')" style="float: right"></input>
	                <div id="chartID_a"></div>
	                </div>
	                <!-- 添加图表按钮 -->
	               
	                <input type="button" value="添加图形" id="addButton" onclick="show('selectInfo','addButton','infoStyle')"></input>
	                <!-- 用户选择采集信息类别div，单击添加图表时显示，其他隐藏 -->
	                <div id="selectInfo" style="display:none">
	                <table class="tablesorter_b border"  text-align="center">
	                    <tr>
	                        <td>
	                          <p>请选择你要展示图形：</p> 
	                        </td>
	                        <td>
	                        <select name="chartType" id="chartType">
	                          <option value="7">曲线图</option>
	                          <!-- <option value="2">柱状图</option> -->
	                          <option value="3">折线图</option>
	                          <!-- <option value="4">饼图</option> -->
	                          <option value="5">仪表盘</option>
	                          <!-- <option value="6">条形图</option> -->
	                         </select>
	                        </td>
	                    </tr>
	                    <tr >
	                    <td colspan ='2' >
	                    <input type="button" value="确定" onclick="addChart('selectInfo','chartID_a','infoStyle','chartID_div_a','chartType')"></input>
                        <input type="button" value="取消" onclick="closeWin('selectInfo','addButton')"></input>
	                    </td>
	                    </tr>
	                </table>
	                
                     
                     
	                </div>
	                
	                </td>
	                
	               <td width="50%">
	               <!-- 图表div 页面初始化时隐藏，添加图形时显示-->
	                <div class="sbss_wlxx1 divsize3" id="chartID_div_b" style="display:none">
	                <input type="button" value="删除" id="delete" onclick="deleteChart('chartID_b','addButton_b','chartID_div_b')" style="float: right"></input>
	                <div id="chartID_b"></div>
	                </div>
	                <!-- 添加图表按钮 -->
	                <input type="button" value="添加图形" id="addButton_b" onclick="show('selectInfo_b','addButton_b','infoStyle_b')"></input>
	                <!-- 用户选择采集信息类别div，单击添加图表时显示，其他隐藏 -->
	                <div id="selectInfo_b" style="display:none">
	                <table class="tablesorter_b border"  text-align="center">
	                    <tr>
	                        <td>
	                          <p>请选择你要展示图形：</p> 
	                        </td>
	                        <td>
	                        <select name="chartType_b" id="chartType_b">
	                            <option value="7">曲线图</option>
								<option value="3">折线图</option>
								<option value="5">仪表盘</option>
	                         </select>
	                        </td>
	                    </tr>
	                    <tr >
	                    <td colspan ='2' >
	                     <input type="button" value="确定" onclick="addChart('selectInfo_b','chartID_b','infoStyle_b','chartID_div_b','chartType_b')"></input>
                         <input type="button" value="取消" onclick="closeWin('selectInfo_b','addButton_b')"></input>
	                    </td>
	                    </tr>
	                </table>
	                </div>
	                </td>
	                
	               </tr>
	              </tbody>
	            </table>
      </div>
        </div>
      </div>
          
      <!-- end of .tab_container --> 
    </div>
    <footer>
      <div class="submit_link"> <!--<a href="场景回溯.html"><input type="submit" value="上一步" class="alt_btn1"></a>&nbsp;--><a href="../task/tasklist">返回首页</a>
      </div>
    </footer>
  </article>
</section>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>	
</body>
<script type="text/javascript">

	// 第一步  创建svg标签，供画轴使用
    var svg = d3.select("#realTimeAxis").append("svg")
            .attr("width", 1060)
            .attr("height", 110);
    //第二步
    var initData = getAxisData();
    var errors = initData.warning;
    var test = realTime(svg)
            .startTime($("#starT").text())//添加开始时间
            .endTime($("#endT").text())//添加结束时间，可以不添加
            //添加已经过了当前时间的告警标识（当前时间之前的）
            //.marks([{'time':'2015-03-23 09:55:00','id':'6871bdd9-1def-4e30-8978-7efeec223d1a','ip':'192.168.1.1','condition':'trigger condition:bigger than 0.60 of 60 which is 0.82'},
            //    {'time':'2015-03-23 10:10:00','id':'6871bdd9-1def-4e30-8978-7efeec223d1a','ip':'192.168.1.1','condition':'trigger condition:bigger than 0.60 of 60 which is 0.82'}]);
            .marks(errors);
    //第三步 调用js画轴
    test.render();
    //第四步  在轴上实时添加告警标致
    //test.addMark({'time':'2015-03-23 11:15:00','id':'6871bdd9-1def-4e30-8978-7efeec223d1a','ip':'192.168.1.1','condition':'trigger condition:bigger than 0.60 of 60 which is 0.82'});
    loopAxis();
    //  移动轴的方法，moveAxis（）参数是移动的刻度数，1表示向左移每次一个刻度
    function left(){
        test.moveAxis(-1);
    }
    //移动轴的方法，moveAxis（）参数是移动的刻度数，-1表示向右移每次一个刻度
    function right(){
        test.moveAxis(1);
    }
    
/*var svg = d3.select("#playAxis").append("svg")
			.attr("width", 1200)   
			.attr("height", 60);
			
var initData = getAxisData();
var realTimeData;*/
	
    
/* var errors = [
              {time:"2015-03-05 11:06:00",id:0},
              {time:"2015-03-05 13:07:00",id:1},
          ]; 
var errors = initData.warning;
          
          var chart = realTimeAxis(svg)
              .startTime(initData.time[0])
              .endTime(initData.time[1])
              .marks(errors)
              .state(2);//设置实验状态
         
          svg.call(chart);*/
          
//chart.addMark({time:"2015-02-28 11:44:00",id:2});
//chart.addMark({time:"2015-02-28 12:50:00",id:3});
    var realTimeData;
	function loopAxis(){
		realTimeData = getNewData();
		setTimeout(function(){
			if(realTimeData.length>0){
				for(var n=0;n<realTimeData.length;n++){
					test.addMark(realTimeData[n]);
				}
			}
			loopAxis();
		},30000);//间隔3秒请求新数据
	}
	//loopAxis();

 function getAxisData(){
    var axisData = "";
    var dateTime = new Date();
    var LocaleTime = dateTime.toLocaleTimeString();
    var taskid = ${task.id};
	$.ajax({
        url : 'getAxisData',
        data:{"task_id":'${task.id}',"time":LocaleTime},
        type : 'post',
        async: false,//同步
        dataType:"json",
        success : function(data) {
            axisData = data;
        }
   	});
   	
	return axisData;
}

function getNewData(){
	var newData = "";
	$.ajax({
        url : 'getNewData',
        data:{"task_id":'${task.id}'},
        type : 'post',
        async: false,//同步
        dataType:"json",
        success : function(data) {
            newData = data;
        }
   	});
   
   	return newData;
}
    
    
</script>
<script type="text/javascript">

/**
 * 数据处理
 */
var json= ajaxGetTreeNode();
var chartData= ajaxGetInitChart(); 

/*
 * 创建树
 */
 var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            view:{
                showIcon:false
            }
        };
    $(document).ready(function(){
            $.fn.zTree.init($("#systree"), setting, json);
        });

/**
 * 展示图形，将已经定义好的图形展示出来。
 */
 chartData.map(function(d,i){
	 var chartType = parseInt(d.chartType);
	 if(d.chartID=="chartID_a"){
		 document.getElementById("addButton").style.display="none";
		 addChart('selectInfo','chartID_a',-1,'chartID_div_a',chartType);
		 showData('chartID_a','addData',d.serise);
	 }else if(d.chartID=="chartID_b"){
		 document.getElementById("addButton_b").style.display="none";
		 addChart('selectInfo_b','chartID_b',-1,'chartID_div_b',chartType);
		 showData('chartID_b','addData_b',d.serise);
	 }else if(i<chartData.length){
		 
		 var _td  = $("#chartTable td").length;
		 var idNum = d.chartID.split("_")[1];
		 //将定义好的图形div重新创建出来。
		 do{
			 $("#but").trigger("click"); 
		 }while(d.chartID =="chartID"+(_td+1) || d.chartID =="chartID"+(_td+2)); 
		 
		 document.getElementById("addButton"+idNum).style.display="none";
		 addChart('selectInfo_'+idNum,d.chartID,-1,'chartID_div_'+idNum,chartType); 
		 showData(d.chartID,'addData'+idNum,d.serise);
		
	 }
	 
 });

/**
 * 添加图形 
 * 选择信息类别时，确定图的类型，并将其画出来。
 * param: selectID用户选择类别信息div; 
 * param: chartID:图表展示div; 
 * param: infoStyleID:下拉框id; 通过下拉框id获取选中类别节点
 * param: chartDivID:包含图表和工具栏的div
   param: chartTypeID
 */
function addChart(selectID,chartID,infoStyleID,chartDivID,chartTypeID){
	var text="";
	var valueC=3;
	valueC=document.getElementById(chartTypeID).value;

	 var treeObj = $.fn.zTree.getZTreeObj("systree");
     var nodes = treeObj.getCheckedNodes(true);
     var datamap=[];
	 /* var selids=dTree.getCheckedNodes(); //获取选中所有节点id ，return array
	 console.log(selids); */
	 var infoID = [] ; //选中要展示的所有信息id
	 var ipID = []; //选中信息所在主机id
	 var chartType=document.getElementById(chartTypeID).value;
	 //遍历选中节点ids
	 if(""==nodes){
		 alert("请选择你要展示的信息！");
		 return;
	 }else{
	     var nodenum = 0;
		 nodes.map(function(d){
		    var node_ = d.id;
	 		infoID.push(node_);
	 		ipID.push(d.getParentNode().getParentNode().id);
	 		nodenum++;
		 });
		 //alert("你要展示的信息是："+getName(ipID[0])+"/"+getName(infoID[0])); 
		 
		if(nodenum == 1){
			text = getName(infoID[0]) + "(" + getName(ipID[0]) + ")";
		}
		
		/*
		 * 使用hightchart画出图形
		 */
		 var type="line";
		 if(valueC==2){
		   type="column";
		 }else if(valueC==3){
		   type="line";
		 }else if(valueC==4){
		   type="pie";
		 }else if(valueC==5){
		   type="gauge";
		 }else if(valueC==6){
		   type="bar";
		 }else if(valueC==7){
		   type="spline";
		 }
		 
		if(valueC==5){
		  $(function () {
	
	          $('#'+chartID).highcharts({
	
	                      chart: {
	                    	  width:400,
	              	          height:300, 
	                          type: 'gauge',
	                          plotBackgroundColor: null,
	                          plotBackgroundImage: null,
	                          plotBorderWidth: 0,
	                          plotShadow: false
	                      },
	
	                      title: {
	                          text: text
	                      },
	
	                      pane: {
	                          startAngle: -150,
	                          endAngle: 150,
	                          background: [{
	                              backgroundColor: {
	                                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                                  stops: [
	                                      [0, '#FFF'],
	                                      [1, '#333']
	                                  ]
	                              },
	                              borderWidth: 0,
	                              outerRadius: '109%'
	                          }, {
	                              backgroundColor: {
	                                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                                  stops: [
	                                      [0, '#333'],
	                                      [1, '#FFF']
	                                  ]
	                              },
	                              borderWidth: 1,
	                              outerRadius: '107%'
	                          }, {
	                              // default background
	                          }, {
	                              backgroundColor: '#DDD',
	                              borderWidth: 0,
	                              outerRadius: '105%',
	                              innerRadius: '103%'
	                          }]
	                      },
	
	                      // the value axis
	                      yAxis: {
	                          min: 0,
	                          max: 100,
	
	                          minorTickInterval: 'auto',
	                          minorTickWidth: 1,
	                          minorTickLength: 10,
	                          minorTickPosition: 'inside',
	                          minorTickColor: '#666',
	
	                          tickPixelInterval: 30,
	                          tickWidth: 2,
	                          tickPosition: 'inside',
	                          tickLength: 10,
	                          tickColor: '#666',
	                          labels: {
	                              step: 2,
	                              rotation: 'auto'
	                          },
	                          title: {
	                              text: '%'
	                          },
	                          plotBands: [{
	                              from: 0,
	                              to: 30,
	                              color: '#55BF3B' // green
	                          }, {
	                              from: 30,
	                              to: 70,
	                              color: '#DDDF0D' // yellow
	                          }, {
	                              from: 70,
	                              to: 100,
	                              color: '#DF5353' // red
	                          }]
	                      },
	
	                      series: []
	
	                  }/* ,
	                  // Add some life
	                  function (chart) {
	                      if (!chart.renderer.forExport) {
	                    	  
	                          setInterval(function () {
	                              var point = chart.series[0].points[0],
	                                      newVal,
	                                      inc = Math.round((Math.random() - 0.5) * 20);
	
	                              newVal = point.y + inc;
	                              if (newVal > 200 || newVal < 0) {
	                                  newVal = point.y - inc;
	                              }
	
	                              point.update(newVal);
	
	                          }, 3000);
	                      }
	                  } */);
	      });	
	  
	  }else{
			//
			Highcharts.setOptions({
			    global: {
			        useUTC: false
			    }
			});
			var chart;
			$('#'+chartID).highcharts({
			    chart: {
			        type: type,
			        width:400,
			        height:300, 
			        animation: Highcharts.svg, // don't animate in old IE
			        marginRight: 1,
			        
			    }, 
			    title: {
			        text: text
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
			    series: [] 
			}); 
		}
		 var chart = $('#'+chartID).highcharts();
		 chartType=chart;
		 // 增加要展示的数据
		 if(chartType==5){ //为仪表盘添加数据
			 for(var d=0;d<infoID.length;d++){
				 var index = chart.series.length;
				 chart.addSeries({
				     name:getName(ipID[d])+"/"+getName(infoID[d]),
					 data: [80],
					 tooltip: {
                         valueSuffix: '%'
                     }
					 
				 });
				 datamap[d] = [index,getName(ipID[d])+ "#" + infoID[d]];
				
			     }
			  //后台取数据
		  	  datamap.map(function(d){
			  setInterval(function () {
				                    var x = (new Date()).getTime(), // current time
				                        y = ajaxGetData(d[1]);
				                    chart.series[d[0]].addPoint([x, y], true, true);
				                }, 5000); //取值频率
				 $(this).attr('disabled', true);
			  
			  });
			 
		 }else{
			 for(var d=0;d<infoID.length;d++){
				 var index = chart.series.length;
				 chart.addSeries({
				     name:getName(ipID[d])+"/"+getName(infoID[d]),
					 data: (function () {
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
				 });
			  datamap[d] = [d, getName(ipID[d])+ "#" + infoID[d]];
		  }
		  //后台取数据
	  	datamap.map(function(d){
		  setInterval(function () {
			                    var x = (new Date()).getTime(), // current time
			                        y = ajaxGetData(d[1]);
			                    chart.series[d[0]].addPoint([x, y], true, true);
			                }, 5000); //取值频率
			 $(this).attr('disabled', true);
		  
		  });
	  }
	  
	 
	 }
	 
	 //添加图形时，将下拉选择框的div隐藏，将展示图表的div显示出来。
	 document.getElementById(selectID).style.display="none";
	 document.getElementById(chartDivID).style.display="block";
	 //保存图形
	 ajaxSetChart(chartID,chartType,infoID);
}

/**
 * 动态添加表格，每次添加一行两列
 */
 function addTab(){
/* $(document).ready(function(){
	
    $("#but").click(function(){ */
	var _td  = $("#chartTable td").length;
	$("#chartTable").append("<tr align='center'  height='380px'>"
			 +"<td>"
			 +"<div class='sbss_wlxx1 divsize3' id='chartID_div_"+(_td+1)+"' style='display:none'>"
			 +"<input type='button' value='删除' id='delete"+(_td+1)+"' onclick=\"deleteChart('chartID_"+(_td+1)+"','addButton"+(_td+1)+"','chartID_div_"+(_td+1)+"')\" style='float: right' />"
			 //+"<input type='button' value='添加数据' id='addData"+(_td+1)+"' onclick=\"addData('chartID_"+(_td+1)+"','addData"+(_td+1)+"','chartType_"+(_td+1)+"')\" style='float: right' />"
			 +"<div id='chartID_"+(_td+1)+"'></div>"
			 +"</div>"
			 +"<input type='button' value='添加图形' id='addButton"+(_td+1)+"' onclick=\"show('selectInfo_"+(_td+1)+"','addButton"+(_td+1)+"','infoStyle"+(_td+1)+"')\" />"
			 +"<div id='selectInfo_"+(_td+1)+"' style='display:none'>"
			 +"<table class='tablesorter_b border'  text-align='center'>"
			 +"<tr><td><p>请选择你要展示图形：</p></td><td>"
			 +"<select name='chartType_"+(_td+1)+"' id='chartType_"+(_td+1)+"'>"
			 //+"<option value='2'>柱状图</option><option value='3'>折线图</option><option value='4'>饼图</option>"
			 //+"<option value='5'>仪表盘</option><option value='6'>条形图</option><option value='7'>曲线图</option>"
			 +"<option value='7'>曲线图</option><option value='3'>折线图</option><option value='5'>仪表盘</option>"
	         +"</select></td></tr><tr><td colspan ='2' >" 
	         +" <input type='button' value='确定' onclick=\"addChart('selectInfo_"+(_td+1)+"','chartID_"+(_td+1)+"','infoStyle"+(_td+1)+"','chartID_div_"+(_td+1)+"','chartType_"+(_td+1)+"')\" />"
			 +" <input type='button' value='取消' onclick=\"closeWin('selectInfo_"+(_td+1)+"','addButton"+(_td+1)+"')\" />"
			 +"</td> </tr></table>"             
			 +"</div>"
			 +"</td>"
			 +"<td>"
			 +"<div class='sbss_wlxx1 divsize3' id='chartID_div_"+(_td+2)+"' style='display:none'>"
			 +"<input type='button' value='删除' id='delete"+(_td+2)+"' onclick=\"deleteChart('chartID_"+(_td+2)+"','addButton"+(_td+2)+"','chartID_div_"+(_td+2)+"')\" style='float: right' />"
			 //+"<input type='button' value='添加数据' id='addData"+(_td+2)+"' onclick=\"addData('chartID_"+(_td+2)+"','addData"+(_td+2)+"','chartType_"+(_td+2)+"')\" style='float: right' />"
			 +"<div id='chartID_"+(_td+2)+"'></div>"
			 +"</div>"
			 +"<input type='button' value='添加图形' id='addButton"+(_td+2)+"' onclick=\"show('selectInfo_"+(_td+2)+"','addButton"+(_td+2)+"','infoStyle"+(_td+2)+"')\" />"
			 +"<div id='selectInfo_"+(_td+2)+"' style='display:none'>"
			 +"<table class='tablesorter_b border'  text-align='center'>"
			 +"<tr><td><p>请选择你要展示图形：</p></td><td>"
			 +"<select name='chartType_"+(_td+2)+"' id='chartType_"+(_td+2)+"'>"
			 //+"<option value='2'>柱状图</option><option value='3'>折线图</option><option value='4'>饼图</option>"
			 //+"<option value='5'>仪表盘</option><option value='6'>条形图</option><option value='7'>曲线图</option>"
			 +"<option value='7'>曲线图</option><option value='3'>折线图</option><option value='5'>仪表盘</option>"
	         +"</select></td></tr><tr><td colspan ='2' >" 
	         +" <input type='button' value='确定' onclick=\"addChart('selectInfo_"+(_td+2)+"','chartID_"+(_td+2)+"','infoStyle"+(_td+2)+"','chartID_div_"+(_td+2)+"','chartType_"+(_td+2)+"')\" />"
			 +" <input type='button' value='取消' onclick=\"closeWin('selectInfo_"+(_td+2)+"','addButton"+(_td+2)+"')\" />"
			 +"</td> </tr></table>"
			 +"</div>"
			 +"</td>"
			 +"</tr>");     
   /*   })
}) */}

 
 
 
/**
 * 清空全部图形
 */
function delall(){
	
    $("#showTab tr").remove();
}
/**
 * 删除指定图形，将图表所在div清空并将增加图形的按钮显示出来。
 * param:chartID：图形id ，需要清空
 * param：buttonID：增加图形的buttonid ，需要显示
 * param：chartDivID:图形与工具栏(添加数据、删除)所在div ，需要隐藏
 */
 function deleteChart(chartID,buttonID,chartDivID){
 	document.getElementById(chartID).innerHTML="";
 	document.getElementById(buttonID).style.display="block";
 	document.getElementById(chartDivID).style.display="none";
 }
 
/**
 * 初始化页面时，展示图表数据
 * param:chartID:图形ID ,根据图形id确定往哪个图上添加数据。
 * param：buttonID：添加数据按钮，图形添加数据后，不可再次添加，需要隐藏
 * param：
 */
function showData(chartID,buttonID,serise_data){
var datamap =[];
var d =serise_data.split(",");
var chart = $('#'+chartID).highcharts();
for(var i=0 ; i < d.length ; i++ ){
		 var index =chart.series.length;
		 chart.addSeries({
		      name:getName(d[i][0])+"/"+getName(d[i]),
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
		 });
		 
		datamap[i]=[index,d[i]];
	 
    }
    
    datamap.map(function(d){
	  setInterval(function () {
		                    var x = (new Date()).getTime(), // current time
		                        y = ajaxGetData(d[1]);
		                    chart.series[d[0]].addPoint([x, y], true, true);
		                }, 5000); //取值频率
		 $(this).attr('disabled', true);
	  
	  });

}
 
/**
 * 添加数据
 * param:chartID:图形ID ,根据图形id确定往哪个图上添加数据。
 * param：buttonID：添加数据按钮，图形添加数据后，不可再次添加，需要隐藏
 * param：
 addData('chartID_a','addData','chartType')
 */
 function addData(chartID,buttonID,chartTypeID){
     var treeObj = $.fn.zTree.getZTreeObj("systree");
     var nodes = treeObj.getCheckedNodes(true);
     var datamap=[];
	 /* var selids=dTree.getCheckedNodes(); //获取选中所有节点id ，return array
	 console.log(selids); */
	 var infoID = [] ; //选中要展示的所有信息id
	 var ipID = []; //选中信息所在主机id
	 var chartType=document.getElementById(chartTypeID).value;
	 //遍历选中节点ids
	 
	 if(""==nodes){
		 alert("请选择你要展示的信息！");
	 }else if(nodes.length > 1){
	 	alert("您选择了多个采集项！");
	 }else{
		 nodes.map(function(d){
			 if(0<d.id && d.id<10){
				 ipID.push(d.id);
				}
			 if(100<d.id && d.id<1000){
				 infoID.push(d.id);
				 
				}
		 });
		 /* alert("你要展示的信息是："+getName(ipID[0])+"/"+getName(infoID[0])); */
		 var chart = $('#'+chartID).highcharts();
		 chartType=chart;
		 // 增加要展示的数据
		 for(var d=0;d<infoID.length;d++){
		 var index = chart.series.length;
		 chart.addSeries({
		     name:getName(infoID[d][0])+"/"+getName(infoID[d]),
			 data: (function () {
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
		 });
		 datamap[d] = [index,infoID[d]];
		
	  }
	  datamap.map(function(d){
	  setInterval(function () {
		                    var x = (new Date()).getTime(), // current time
		                        y = ajaxGetData(d[1]);
		                    chart.series[d[0]].addPoint([x, y], true, true);
		                }, 5000); //取值频率
		 $(this).attr('disabled', true);
	  
	  });
	 
	 }
	 
	 //保存图形
	 ajaxSetChart(chartID,chartType,infoID);
}
 
/**
 * 获取节点文本
 * param：id节点id
 */
 function getName(id){
 	var name="";
 	json.map(function(d){
 		if(d.id==id){
 			name =d.name;
 		}
 	});
 	return name;
 }
//显示用户选择采集信息类别的div同时隐藏添加图形按钮
 var  s = "";
function show(wID,bID,sID){
	document.getElementById(wID).style.display="block";
	document.getElementById(bID).style.display="none";
}
//关闭用户选择采集信息类别的div同时显示添加图形按钮
function closeWin(wID,bID){
	document.getElementById(wID).style.display="none";
	document.getElementById(bID).style.display="block";
}

//ajax保存用户定义的图形
function ajaxSetChart(chartID,chartType,serise){

 var result="";
    $.ajax({
        url : 'addChart',
        data:{"task_id":${task.id},"chartID":chartID,"chartType":chartType,"serise":serise},
        type : 'post',
        async: false,//同步
        dataType:"json",
        success : function(data) {
        	result = data.chart;
        }
   	});
 
   	return result;

}
//ajax获取采集的信息数据

function ajaxGetData(ipId){
    var result="";
    $.ajax({
        url : 'getData',
        data:{"task_id":${task.id},"ipId":ipId},
        type : 'post',
        async: false,//同步
        dataType:"text",
        success : function(data) {
        	result = data;
        }
   	});
	return parseFloat(result);
}

//ajax获取已定义图形数据
function ajaxGetInitChart(){

var initChart="";
	$.ajax({
        url : 'getInitChart',
        data:{"task_id":'${task.id}'},
        type : 'post',
        async: false,//同步
        dataType:"json",
        success : function(data) {
        	initChart = data.initChart;
        }
   	});

	return initChart;

}

//ajax获取树的节点名称
function ajaxGetTreeNode(){
	var treeJson="";
	$.ajax({
        url : 'getTree',
        data:{"task_id":'${task.id}'},
        type : 'post',
        async: false,//同步
        dataType:"json",
        success : function(data) {
        	treeJson = data.treejson;
        }
   	});

	return treeJson;
}
</script>
</html>