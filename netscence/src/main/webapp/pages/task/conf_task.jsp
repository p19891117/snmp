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
<meta charset="utf-8"/>
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
<style type="text/css">
    .LeftBotton{height:51px;width:51px;background:url(http://pigimg.zhongso.com/space/gallery156/%E9%84%82%E5%B0%94%E5%A4%9A%E6%96%AF%E5%B9%BF%E5%91%8A/1340782360-000.jpg) no-repeat 0px 0;overflow:hidden;float:left;display:inline;margin:51px 0px 0 0px;;padding:0px;cursor:pointer;}
    .RightBotton{height:52px;width:51px;background:url(http://pigimg.zhongso.com/space/gallery156/%E9%84%82%E5%B0%94%E5%A4%9A%E6%96%AF%E5%B9%BF%E5%91%8A/1340782360-000.jpg) no-repeat -51px 0;overflow:hidden;float:left;display:inline;margin:50px 0 0 0px;cursor:pointer; }
</style>
<link rel="stylesheet"
    href="<%=request.getContextPath()%>/css/layout.css" type="text/css"
    media="screen" />
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/timeline/mytimeline.js"></script> 
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js"></script>
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/gojs/go.js"></script>
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/json/json2.js"></script>    

<script type="text/javascript">
    var AjaxRequestBack = false;
    var IdList;
   
    //onload调用方法
    function init() {
    	if('${handleResult}' != 'noMsg'){
    		alert("${handleResult}");
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

    var iWidth = document.documentElement.clientWidth;
    var iHeight = document.documentElement.clientHeight;
    var bgObj;
    //关闭
    function closeDiv(){
    	document.body.removeChild(bgObj);
    	document.getElementById('cjclpz_box').style.display='none';
    	resetInput();
    }
    function nodeDoubleClick(e, node) {
    	ajaxGetDevInfo(node.data.ip, node.data.type);
    	bgObj = document.createElement("div");
    	bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:"+iWidth+"px;height:"+Math.max(document.body.clientHeight, iHeight)+"px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;";
    	document.body.appendChild(bgObj);
    	$("#ip_titile").html(node.data.ip);
    	document.getElementById('cjclpz_box').style.display='block';
    }
    //ajax获取设备数据
    function ajaxGetDevInfo(ip, dev_type){
    	$("#gatherDiv").html("");
    	$("#ip").val(ip);
    	$("#dev_type").val(dev_type);
		$.ajax({
			url:"ajaxGetDevInfo",
			data:{"id":${task.id},"ip":ip},
			dataType: "json",
			success:function(data){
				var gatherList = JSON.parse(data.gatherlist);
				var tdnum = 1;
				var gather_table = $("#gatherDiv");
				for(var i=0;i<gatherList.length;i++){
					var gatherItem = gatherList[i];
					if(tdnum == 1){
						var tr = $("<tr></tr>");
						tr.appendTo(gather_table);
					}
					var td = $("<td><input type='radio' name='gather_id' value=" + gatherItem.gather_id + ">" + gatherItem.gather_name + "</td>");
					td.appendTo(tr);
					if(tdnum == 4){
						tdnum = 0;
					}
					tdnum ++;
				}
				var findList = JSON.parse(data.findList);
				addTbody(findList);
			}
		});
    }
    //填充表格
    function addTbody(findList){
    	$("#findTbody").html("");
		for(var i =0;i<findList.length;i++){
			var findItem = findList[i];
			$("#findTbody").html($("#findTbody").html()
					+ "<tr><td>"+ (i+ 1) + "</td><td>" + findItem.gather_name + "</td><td>" + findItem.regular_type_name
				    + "</td><td>" + findItem.compare_type_name + "</td><td>" + findItem.value + "</td>"
					 + "<td><a href='javascript:void(0);' onclick='deleteFind(" + findItem.id + ");'><img src='<%=basePath %>images/icn_trash.png' title='Trash' style='vertical-align:middle;'> 删除</a></td></tr>");
		}
    }
    //删除发现策略
    function deleteFind(id){
	    if(confirm("确定要删除此策略吗？")){
	    	var ip = $("#ip").val();
	    	$.ajax({
				url:"deleteFind",
				data:{"task_id":${task.id},"ip":ip,"id":id},
				dataType: "json",
				success:function(data){
					var status = data.status;
					var info = data.info;
					alert(info);
					if(status == 'success'){
						resetInput();
					}
					var findList = JSON.parse(data.findList);
					addTbody(findList);
				}
			});
		}
    }
    //清空输入项
    function resetInput(){
    	$("#regular_type").val("");
    	$("#compare_type").val("");
    	$("#value").val("");
    }
    //保存发现策略
    function ajaxSaveFindInfo(){
    	saveingflag = 1;
    	var ip = $("#ip").val();
    	var dev_type = $("#dev_type").val();
    	var gather_id = $('input[name="gather_id"]:checked').val();
    	if(gather_id == undefined){
    		alert("请选择采集项！");
    		return;
    	}
    	var compare_type = $("#compare_type").val();
    	var value = $("#value").val();
    	var regular_type = $("#regular_type").val();
    	if(value == ''){
    		alert("请填写触发值！");
    		return;
    	}
    	var flag = 0;
		if(confirm("是否应用到同类型的所有设备中")){
			flag = 1;
    	}
    	$.ajax({
			url:"ajaxSaveFindInfo",
			data:{"task_id":${task.id},"ip":ip,"gather_id":gather_id,"compare_type":compare_type,"regular_type":regular_type,"value":value,"flag":flag, "dev_type":dev_type},
			dataType: "json",
			success:function(data){
				var status = data.status;
				var info = data.info;
				if(status == 'success'){
					resetInput();
				}
				var findList = JSON.parse(data.findList);
				addTbody(findList);
			}
		});
    }
    
    function handle(type){
    	window.location = "<%=basePath %>task/handle?id=" + ${task.id} + "&type=" + type;
    }
</script>   
</head>

<body onload="init()">
	
	<!-- end of header bar -->

	<section id="main" class="column">
		<article class="module width_full">
			<div class="clearfix">
				<h3>实验场景发现策略配置</h3>
			</div>
			<h4 class="alert_info clearfix">
				场景记录名称：${task.name } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开始时间：
				<fmt:formatDate value="${task.starTime}" type="both"
					pattern="yyyy-MM-dd HH:mm:ss" />
				&nbsp;&nbsp;&nbsp;&nbsp;结束时间：
				<fmt:formatDate value="${task.endTime }" type="both"
					pattern="yyyy-MM-dd HH:mm:ss" />
				&nbsp;&nbsp;&nbsp;&nbsp;状态：
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
      </c:if>
				<span style="float:right;"> </span>
			</h4>
			<div
				style="margin:20px 5%;background: none;width: 90%;white-space:nowrap;"
				class="clearfix">
				<div class="clear"></div>
				<div style="text-align:center; margin-top:0px;height:450px;"
					id="myDiagram"></div>
				<div id="cjclpz_box" class="cjclpz_box" style="display:none;">
					<div class="clearfix">
						<h3>场景发现策略配置（<font id="ip_titile"></font>）
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="javascript:void(0);" onClick="closeDiv();" style="">&nbsp;X&nbsp;</a>
						</h3>
					</div>
					<div style="padding:0px 10px;">
						<div style="white-space:normal;width:750px;margin-left:1px;" >
						<table id="gatherDiv" width="750px;"> </table>
						</div>
						<p style="margin-top: 10px;">
							&nbsp;触发方式：<select style="width:100px;" id="regular_type" name="regular_type">
								<option value="1">阀值触发</option>
								<option value="2">振幅触发</option>
							</select> &nbsp;&nbsp;
							比较类型：<select style="width:80px;" id="compare_type" name="compare_type">
								<option value="1">大于</option>
								<option value="2">小于</option>
							</select> &nbsp;&nbsp;
							<input type="hidden" id="ip" name="ip">
							<input type="hidden" id="dev_type" name="dev_type">
							值：<input type="text" size="20" id="value" name="value"> 
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="button" onclick="ajaxSaveFindInfo()" value="保存"
								style="width:50px;height:30px;font-size:10" />
						</p>
						<p></p>
						<table class="tablesorter_b border" cellspacing="0">
							<thead>
							<tr>
								<td>序号</td>
								<td>采集项</td>
								<td>触发方式</td>
								<td>比较方式</td>
								<td>值</td>
								<td>操作</td>
							</tr>
							</thead>
							<tbody id="findTbody">
								
							</tbody>
						</table>
						<p></p>
					</div>
				</div>
			</div>
			<footer>
				<div class="submit_link">
					<!-- <a href="添加设备.html">
        <input type="submit" value="添加设备" class="alt_btn1">
        </a>&nbsp; -->
					<a href="tasklist"> <input type="submit" value="返回列表">
					</a>
				</div>
			</footer>
		</article>
	</section>
	<br />
	<br />
	<br />
	<br />
</body>
</html>