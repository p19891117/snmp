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
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js"></script>
    <script type="text/javascript"src="<%=request.getContextPath()%>/js/gojs/go.js"></script>
    <script type="text/javascript"src="<%=request.getContextPath()%>/js/common/load.js"></script>
    <script type="text/javascript">
	$(document).ready(function() {
		init();
	});

/*         var content1 = [
            "正在验证网络设备连通性... ",
            "网络设备连通性验证成功",
            "网络拓扑恢复成功"];
       	var content2 = [
            "正在恢复设备信息...",
						"正在恢复虚拟机快照...",
						"<br>",
						"虚拟机快照恢复成功",
						"正在恢复设备静态配置信息...",
						"设备静态配置信息恢复成功",
						"<br>",
						"正在恢复设备运行状态信息...",
						"设备1路由表正在恢复...",
						"设备1路由表恢复成功",
						"...",
						"...",
						"设备运行状态信息恢复成功",
						"设备信息恢复成功"];
				var i = 0; */
	/* 			
        function show1(){
        	  tab2.innerHTML = "";
            str  = content1[i];
            tab1.innerHTML += str;
            tab1.innerHTML += "<br>";
            i++;
            if (i>=content1.length) {
            	i = 0;
              return;
            }
            setTimeout("show1()",1000);
        }
         */
       function show1(data){
        	 var info="";
        	 for(var i =0 ;i<data.length;i++){
        		 info += data[i] +"<br>"; 
        	 }
        	 $("#tab1").append(info);
        	 $("#tab1").attr("style","display: block; padding:50px 237px;");
        	 $("#netRecover").attr("class", "");
        	 $("#devRecover").attr("style", "display:block;");
        	 $("#devRecover").attr("class", "active");
         }
        var j = 0;
        function show2(){
        	divLoadInit("#main");
        	$.ajax({
	            url : 'recover',
	            data: {"id":${taskid},"scnid" :"${scnid}"},
	            type : 'post',
	            success : function(data) {
	                //var result = eval("(" + data + ")");
	                //IdList = result.IdList;
	                closeMask();
	                $("#tab1").html("");
	                $("#tab2").html(data);
	                $("#tab2").show();
	                $("#nextBtn").show();
	                AjaxRequestBack = true;
	            },
	            error:function(data) {
	            	closeMask();
	            }
	        });
        } 
         

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
       /*      { doubleClick: nodeDoubleClick },//鼠标双击事件函数
            { click: nodeDoubleClick }, //鼠标单击事件函数 */
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
        
	function recoveryNetTopo(taskid){
		divLoadInit("#main");
		$("#tab1").empty();
		$.ajax({
			url:"recoveryNetTopo",
			dataType:"json",
			data:{"id":taskid},
			type:"post",
			success:function(data){
				closeMask();
				if(data != null){
					show1(data);
				}
			}
		});
	}
    </script>
    </head>

    <body>

<!-- end of header bar -->

<section id="main" class="column">
      <article class="module width_full">
    <div class="clearfix" id="title1">
          <h3 >场景回溯  -- ${taskName} -- 设备恢复 </h3>
        </div>
    <div style="margin:20px 5%;background: none;width: 90%;">
          <div style=" text-align:center;"> <div style="text-align:center; margin-top:30px;height:350px;" id="myDiagram">
			    
		      </div></div>
          
          <ul class="tabsa">
        <li class="active" id="netRecover" ><a href="#tab1" onclick="recoveryNetTopo(${taskid})" disabled = 'true'>网络拓扑恢复</a></li>
        <li style="display:none;"  id="devRecover"><a href="#tab2" onclick="javascript:show2();">设备信息恢复</a></li>
      </ul>
          <div class="tab_container">
        <div id="tab1" class="tab_content dw1" style="display: none; padding:50px 300px;"> </div>
        <div id="tab2" class="tab_content dw1" style="display: none; padding:50px 300px;"> </div>
      </div>
          <!-- end of .tab_container --> 
        </div>
    <footer>
          <div class="submit_link"> <a href="toSceneBack1?id=${taskid }">
            <input type="button" value="上一步" class="alt_btn1" onclick="javascript:history.go(-1);">
            </a>&nbsp;<a href="toSceneBack3?id=${taskid }&scenceId=${scnid}&ip=${ip}">
            <input type="submit" value="下一步" class="alt_btn1"  id="nextBtn">
            </a>&nbsp;<!-- <a href="#">
            <input type="button" value="取消" onclick="javascript:history.go(-1);"/>
            </a> --> </div>
        </footer>
  </article>
    </section>
<br />
<br />
<br />
<br />

</body>
</html>