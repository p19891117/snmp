<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/layout.css" type="text/css"
	media="screen" /> 
<script
	src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js"
	type="text/javascript"></script>
<!--[if lt IE 9]>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
<script type="text/javascript">

//编辑服务端信息
function selectVmbackClientlist(serverId){
	$("#vmbackClient").attr("style","display:block");
	$("#serverId").val(serverId);
	$("#Client").empty();
	$.ajax({
		url : "getVmbackClientList" ,
		data : { "serverId" : serverId},
		dataType : "json" ,
		type : "post" ,
		success : function(data){
			var vmbackClient ="";
			for(var i=0 ;i < data.length ;i++){
				vmbackClient += "<tr><td class='txt_c'>"+i+"</td>"+
				                 "<td>"+$(data)[i].serverId+"</td>"+
				                 "<td>"+$(data)[i].clientIp+"</td>"+
				                 "<td>"+$(data)[i].uuid+"</td>"+
								 "<td><a href='javascript:void(0);' onclick='modifyVmbackClient("+$(data)[i].clientId+")'>"+
								 " <img src='<%=request.getContextPath()%>/images/icn_edit.png'	title='Edit' style='vertical-align:middle;'/> 编辑</a>"+
								 "<a id='removeClient' href='javascript:void(0);' onclick='deleteVmbackClient("+$(data)[i].clientId+","+$(data)[i].serverId+")'>"+
								 " <img src='<%=request.getContextPath()%>/images/icn_trash.png' title='Trash' style='vertical-align:middle;'/> 删除</a>"+
					 			 "</td></tr>"
			}
			$("#Client").append(vmbackClient);
		}
	});
}   
 function modifyVmback(id) {
		document.getElementById('cjxpzb').style.display = 'block';
		$.ajax({
			url:"getVmbackbyId",
			data:{"serverId":id},
			dataType: "json",
			success:function(data){ 
				$(".ip1").val(data.serverIp);
				$(".username1").val(data.username);
				$(".passwd1").val(data.passwd);
				$(".id1").val(data.serverId);
			}
		});
	} 
//删除虚拟机快照（服务端）配置
 function deleteVmbacklist(fileid){
    if(confirm("确定要删除此配置信息吗？")){
        window.location="deleteVmback?id=" + fileid;
    }
} 

//删除虚拟机快照（客户端）配置
 function deleteVmbackClient(clientId , serverId){
    if(confirm("确定要删除此配置信息吗？")){
    	$.ajax({
			url:"deleteVmbackClient",
			data:{"clientId":clientId},
			dataType: "text",
			type: "post",
			success:function(data){ 
				selectVmbackClientlist(serverId);
			}
		});
    }
} 
//新增虚拟机快照（客户端）配置信息
function addVmbackClient(){
	$.ajax({
		url:"saveVmbackClient",
		data:{"clientIp":$("input[name='clientIp']").val(),
			  "serverId": $("input[name='serverId']").val(),
			  "uuid": $("input[name='uuid']").val()
		},
		dataType: "text",
		type: "post",
		success:function(data){ 
			selectVmbackClientlist($("#serverId").val());
			$("input[name='clientIp']").val("");
			$("input[name='serverId']").val("");
			$("input[name='uuid']").val("");
		}
	});
}
</script>
</head>

<body>

	<!-- end of header bar -->

	<section id="main">
		<div class="dw">
			<sf:form class="post_message" action="vmbacklist"
				modelAttribute="vmbackServer" method="post">
                    服务端IP： <sf:input path="serverIp" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;"></sf:input>&nbsp;&nbsp;&nbsp;&nbsp;
                    
				<input type="hidden" name="page" id ="page" value="1"/>
					 <input type="submit" value="搜索" id="sub" class="alt_btn">
                    <input type="reset" value="重置" class="alt_btn" >
			</sf:form>
		</div>
		<article class="module width_full">
			<div class="clearfix">
				<h3>虚拟机快照(服务端)配置列表</h3>  <a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='block';"
								style="float:right; margin:3px 10px;"><input type="submit"
									value="新增" class="alt_btn1"> </a> 
				</div>
				



<!-- 新增服务端弹出层 -->
				<sf:form action="saveVmback" method="post" id="from3"
					modelAttribute="vmbackServer">
					<div id="cjxpz" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpz').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul> 
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">IP地址：</div>
								<sf:input path="serverIp" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">帐户：</div>
								  <sf:input path="username" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">密码：</div>
								<sf:input path="passwd" type="text"/>
							</li>
						</ul>
						<div style="margin-left:120px;">
							<a href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='none';"><input
								type="submit" value="确定" class="alt_btn1"> </a>&nbsp;<a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='none';"><input
								type="button" value="取消"> </a>
						</div>
					</div>
				</sf:form>

<!-- 新增客户端弹出层 -->
				<sf:form action="saveVmbackClient" method="post" id="from5"
					modelAttribute="vmbackClient">
					<div id="cjxpz1" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpz1').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul> 
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:83px !important; float:left; text-align:right; margin-right:10px;">服务端Id：</div>
								<input id="serverId" name="serverId" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:83px !important; float:left; text-align:right; margin-right:10px;">客户端IP地址：</div>
								<input  name="clientIp" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:83px !important; float:left; text-align:right; margin-right:10px;">uuid：</div>
								  <input name="uuid" type="text"/>
								  
							</li>
						</ul>
						<div style="margin-left:120px;">
							<a href="javascript:void(0);"
								onClick="document.getElementById('cjxpz1').style.display='none';"><input
								type="button" onclick='addVmbackClient()' value="确定" class="alt_btn1"> </a>&nbsp;<a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz1').style.display='none';"><input
								type="button" value="取消"> </a>
						</div>
					</div>
				</sf:form>


<!--编辑弹出层 -->
				<sf:form action="modifyVmback" method="post" id="from4"
					modelAttribute="vmbackServer">
					<div id="cjxpzb" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpzb').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul> 
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">IP地址：</div>
								<sf:input path="serverIp" type="text" class="ip1"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">帐户：</div>
								  <sf:input path="username" type="text" class="username1"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">密码：</div>
								<sf:input path="passwd" type="text" class="passwd1"/>
							</li>
								<sf:input path="serverId" type="hidden" class="id1"/>
						</ul>
						<div style="margin-left:120px;">
							<a href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='none';"><input
								type="submit" value="确定" class="alt_btn1"> </a>&nbsp;
								<a	href="javascript:void(0);"
								onClick="document.getElementById('cjxpzb').style.display='none';"><input
								type="button" value="取消"> </a>
						</div>
					</div>
				</sf:form>
			<table class="tablesorter_b" cellspacing="0">
				<thead>
					<tr>
						<th>序号</th>
						<th class="header headerSortUp">IP地址</th>
						<th class="header">帐户</th>
						<th class="header">密码</th>
						<th class="header">操作</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${vmbacklist}" var="vmbackserver" varStatus="status">
						<tr>
							<td class="txt_c">${status.count}</td>
							
							<td>${vmbackserver.serverIp }</td>
							<td>${vmbackserver.username }</td>
							<td>${vmbackserver.passwd }</td>
							<td>
							     
							   <a href="javascript:void(0);"
									onclick="modifyVmback(${vmbackserver.serverId})"><img
										src="<%=request.getContextPath()%>/images/icn_edit.png"
										title="Edit" style="vertical-align:middle;" /> 编辑</a>
								 
								<a href="javascript:deleteVmbacklist(${vmbackserver.serverId});"><img
									src="<%=request.getContextPath()%>/images/icn_trash.png"
									title="Trash" style="vertical-align: middle;"> 删除</a>
									
								<a href="javascript:selectVmbackClientlist(${vmbackserver.serverId});"><img
									src="<%=request.getContextPath()%>/images/icn_categories.png"
									title="Trash" style="vertical-align: middle;"> 查看客户端信息</a>
							</td>
						</tr>
					</c:forEach>
					
				</tbody>
			</table>
			</div>
			<footer>
    			<div align="center">${pager}</div>
			</footer>
		</article>
			<div id="vmbackClient" class="module width_full" style="display:none">
			<div class="clearfix">
				<h3>虚拟机快照(客户端)配置列表</h3>  <a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz1').style.display='block';"
								style="float:right; margin:3px 10px;"><input id="clientSubmit" type="submit"
									value="新增" class="alt_btn1"> </a> 
				</div>
					<table  class="tablesorter_b" cellspacing="0">
				<thead>
					<tr>
						<th>序号</th>
						<th class="header headerSortUp"> 服务端Id</th>
						<th class="header">客户端IP</th>
						<th class="header">uuid</th>
						<th class="header">操作</th>
					</tr>
				</thead>
				<tbody id="Client">
					
				</tbody>
			</table>
			</div>
	</section>
</body>
</html>