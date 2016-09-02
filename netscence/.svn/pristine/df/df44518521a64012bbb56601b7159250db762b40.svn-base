<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" deferredSyntaxAllowedAsLiteral="true"%>
<%@ page import="java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%
	List list = new ArrayList();
 %>
 <%
	String result = request.getAttribute("result").toString();
    String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String sf;
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/layout.css" type="text/css"
	media="screen" />
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js"></script>	
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/My97DatePicker/WdatePicker.js"></script>
	<script src="<%=request.getContextPath()%>/js/ht/d3.js"></script>
	<script src="<%=request.getContextPath()%>/js/ht/playAxis.js"></script>
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/json/json2.js"></script>    
	<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/gojs/go.js"></script>
<!--[if lt IE 9]>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<script type="text/javascript">
	
	    var sceneInfoList;
	    var index=0;
	    var rapid;
	    var flag = 0
		
		function addInfo(sceneInfo){ 
		    sceneInfoList = ${sceneInfoList};
		    if(sceneInfo != "1" && flag ===0){
			    load(sceneInfo.ip);
			    
			    flag = flag +1;
				var innerHtml = "";
				if(sceneInfo.sce_flag==0){
					innerHtml += "<tr style='color:#FFAA33;'>";
				}else{
					innerHtml += "<tr style='color:#FF0000'>";
				}
				innerHtml += "<td class='txt_'  width='4%'>";
				innerHtml += (index + 1);
				innerHtml += "</td><td width='12%'>";
				innerHtml += sceneInfo.name;
				innerHtml += "</td><td width='12%'>";
				innerHtml += sceneInfo.ip;
				innerHtml += "</td><td width='15%'>";
				innerHtml += sceneInfo.sceTime;
				innerHtml += "</td><td width='20%'>";
				innerHtml += sceneInfo.scetri_condition;
				innerHtml += "</td><td width='15%'>";
				if(sceneInfo.sce_description == undefined){
				}else{
					innerHtml += sceneInfo.sce_description;
				}
				innerHtml += "</td><td width='7%'>";
				if(sceneInfo.sce_conmment == undefined){
				}else{
					innerHtml += sceneInfo.sce_conmment;
				}
				/*
				innerHtml += "</td><td width='15%'><a href='javascript:void(0);' onClick='listSceneBack(\""+sceneInfo.scn_id+"\");'><img src='<%=request.getContextPath()%>/images/icn_categories.png' title='查看' class='vm'> 查看</a>   ";
				
				*/
				innerHtml += "</td></tr>";
				$("#tbody_sce").html($("#tbody_sce").html() + innerHtml);
				var intov = document.getElementById("intoV");
				intov.scrollIntoView(false);
				index ++;
				if(index < sceneInfoList.length){
					setTimeout("waitf()",rapid);
				}
				
			}
			
				 
		}
		
		function listSceneBack(scn_id){
			$.ajax({
				url:"listSceneBack",
				data:{"id":scn_id},
				dataType:"text",
				success:function(data){
					$("#tbody1").html(data);
					document.getElementById('yzxx').style.display='block';
				}
			});
		}
		
		   function expByExcel(){
		     var task_id = '${id}';
			$.ajax({
				url:"expSceneByExcel",
				data:{"task_id":task_id},
				dataType:"text",
				success:function(data){
					//window.location.href="<%=request.getContextPath()%>/"+data;
					document.getElementById("ifile").src="<%=request.getContextPath()%>/"+data;
				}
			});
		}
	</script>
	
</head>

  <iframe id="ifile" style="display:none"></iframe>
<body onload="init()">

	<section id="main" style="TEXT-ALIGN:center;">
		<div style="width:1360px;height:110px;MARGIN-RIGHT: auto; MARGIN-LEFT: auto;">
			<div style="width:180px;height:110px;float:left"></div>
			<div id="timeAxis" style="width:1000px;height:110px;float:left;"></div>
			<div style="float:right;width:180px;height:110px;">
				<div style="float:left;height:110px;margin-top:10px;">
					播放速度：
					<select id="viewRapid" style="width:65px" onchange="reloadP();">
						<option value="1" selected>1倍</option>
						<option value="2">2倍</option>
						<option value="4">4倍</option>
						<option value="8">8倍</option>
					</select>
				</div>
				<div style="float:right;height:110px;">
					<span  style="float:right;margin-top:17px;">
						 
					</span>
				</div>
			</div>
		</div>
		 <div style="border:1px solid #09F;text-align:center; MARGIN-RIGHT: auto; MARGIN-LEFT: auto;width:900px;height:300px;background-image:url(<%=request.getContextPath()%>/images/topo.jpg');" id="myDiagram">
      	 </div>
		<article class="module width_full" style="width:900px;height:260px;MARGIN-RIGHT: auto; MARGIN-LEFT: auto;">
		<div>
			<%-- <div class="clearfix">
				<h3>场景信息-${task.name}</h3>
			</div> --%>
			<table id="tablesorter_b" class="tablesorter_b" cellspacing="1" style="margin: 5px 0 0;">
				<thead>
					<tr>
						<th width="4%">序号</th>
						<th class="header headerSortUp"  width="12%">场景名称</th>
						<th width="12%">ip地址</th>
						<th width="15%">场景发生时间</th>
						<th width="20%">场景触发条件</th>
						<th width="15%">场景简单描述</th>
						<th width="7%">场景评论</th>
						<!--  <th width="15%">操作</th>-->
					</tr>
				</thead>
				
			</table>
			<div id="scrollDiv" style="height:200px; overflow-y:scroll; background:none;">
			<table class="tablesorter_b" cellspacing="0" style="margin: 0 0 0;">	
				<tbody id="tbody_sce">
					
				</tbody>
			</table>
			<span id="intoV" style="overflow:hidden"></span>
			</div>
		</div>
		<div style="display:block;float:right;margin-top: 20px;border:1px;" width=100px height=100px; align="right">
			<input type="button" value="场景发现信息导出" onclick="expByExcel()"/>
		</div>
		</article>
		<article class="module width_full" id="yzxx" style="width:900px;height:260px;MARGIN-RIGHT: auto; MARGIN-LEFT: auto;display:none;">
			<div class="clearfix">
				<h3>场景回溯验证信息</h3>
			</div>
			<table class="tablesorter_b" cellspacing="0">
				<thead>
					<tr>
						<th>序号</th>
						<th class="header headerSortUp">场景回溯验证</th>
						<th>启动时间</th>
						<th>停止时间</th>
						<th>是否触发场景</th>
					</tr>
				</thead>
				<tbody id="tbody1">
					
				</tbody>
			</table>
		</article>
	</section>
</body>
<script type="text/javascript"> 
    var svg = d3.select("#timeAxis").append("svg")
        .attr("width", 1050);  
    var axisData = getPlayAxisData();
    var errors = axisData.warning;  
    var chart = playAxis()
        .startTime(axisData.time[0])
        .endTime(axisData.time[1])
        .marks(errors)
        .callBack(callBack);
    svg.call(chart);
    //回调函数
    function callBack(startTime,endTime){
    console.log(startTime);
    	var timeList = new Array();//
    	var t;//
    	var num;//
   		for(var n=0;n<sceneInfoList.length;n++){
   			timeList.push(new Date(sceneInfoList[n].sceTime));
   			if(new Date(sceneInfoList[n].sceTime) > new Date(startTime) && new Date(sceneInfoList[n].sceTime) <= new Date(endTime)){
   				 addInfo(getWarningDataByScnID(sceneInfoList[n].scn_id));
            }
   			
   			
   		};
   		flag=0;
    	if(typeof(endTime)=="undefined"){
    		t = new Date(startTime);
    	}else{
    		t = new Date(endTime);
    	}
        for(var s=0;s<timeList.length;s++){
        	if(t>timeList[s]){
        		num = timeList.length-s+1;
        		break;
        	};
        };
        /* if(sceneInfoList.length>num){
        	var intov = document.getElementById("info"+num);
			intov.scrollIntoView(false);
        } */
       // deleteAll();
    }
    addInfo("1");
    //改变播放轴播放速度
    //实现实验回看界面播放轴改变播放速度
    //实时播放轴与拓扑图同步修改
    function reloadP(){
		chart.changeSpeed($("#viewRapid").val());
	}
	function getPlayAxisData(){
		var result = "";
		$.ajax({
            url : 'getPlayAxisData',
            data:{"taskid":'${task.id}'},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                result = data;
            }
       	});
       	return result;
	}
    function getWarningDataByScnID(id){
		var result = "";
		$.ajax({
            url : 'getWarningDataByScnID',
            data:{"scn_id":id},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                result = data;
            }
       	});
       	return result;
	}
	function deleteAll() {
		var table = document.getElementById("tablesorter_b");
		var tableLength = table.rows.length;
	
		for ( var ii = 1; ii < tableLength; ii++) {
			table.deleteRow(1);
		}

	}
</script>
<script type="text/javascript">
    var AjaxRequestBack = false;
    var IdList;
   
    //onload调用方法
    function init() {
    	//if('${handleResult}' != 'noMsg'){
    	//	alert("${handleResult}");
    	//}
    	
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
                return "../images/router.png";
            if (type === "2")
                return "../images/switch.png";
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
                        };
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
    
    function load(ip) {
      
        var str = <%=result%>;
        
        if(typeof(ip) != "undefined"){
            for (var i = 0; i < str.nodeDataArray.length; i++) {
	                  str.nodeDataArray[i].problem = ""; 
	        }
	        for (var i = 0; i < str.nodeDataArray.length; i++) {
	              if(str.nodeDataArray[i].ip == ip){
	                  str.nodeDataArray[i].problem = "1"; 
	              }     
	        }
        }else{
            for (var i = 0; i < str.nodeDataArray.length; i++) {
	                  str.nodeDataArray[i].problem = ""; 
	         }
        }
        
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

	function showDiv() {

	}
	function nodeDoubleClick(e, node) {
		//window.showModalDialog('<%=basePath %>task/getNodeInfo',window,'dialogLeft:150px;dialogTop:75px;dialogWidth=1300px;dialogHeight=650px,center:yes');
        //window.open('<%=basePath %>task/getNodeInfo?taskid=' + ${task.id} + '&ip=' + node.data.ip + '&tabpage=1','_blank',' top=75, left=150, width=1600,height=800,toolbar=no,menubar=no,resizable=no,scrollbars=yes,resizable=no,location=no,status=no');
    }
    
    function handle(type){
    	divLoadInit("#main");
    	divLoadInit("#main"); 
    	window.location.href = "<%=basePath %>task/handle?id=" + ${task.id} + "&type=" + type;
    }
    
    function addSceInfo(sceTime, sceDev, sceCondition){
    	$("#sceTime").html(sceTime);
    	$("#sceDev").html(sceDev);
    	$("#sceCondition").html(sceCondition);
    }
</script>
</html>