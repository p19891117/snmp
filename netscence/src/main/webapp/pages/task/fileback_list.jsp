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
//编辑备份文件

function modifyfileback(id) {
		document.getElementById('cjxpzb').style.display = 'block';
		$.ajax({
			url:"getfilebackbyId",
			data:{"id":id},
			dataType: "json",
			success:function(data){ 
				$(".ip1").val(data.ip);
				$(".username1").val(data.username);
				$(".passwd1").val(data.passwd);
				$(".ftp_port1").val(data.ftp_port);
				$(".device_type1").val(data.device_type);
				$(".back_command1").val(data.back_command);
				$(".recover_command1").val(data.recover_command);
				//$(".hardware_type1").val(data.hardware_type);
				$(".backup_files1").val(data.backup_files);
				$(".id1").val(data.id);
				if(data.hardware_type =="1"){
				    $(".hardware_type1").attr("checked","checked");
				}
				else if(data.hardware_type =="2"){
				    $(".hardware_type2").attr("checked","checked");
				}
				else{
				    $(".hardware_type3").attr("checked","checked");
				}
			}
		});
	}
//删除备份文件
function deletefilebacklist(fileid){
    if(confirm("确定要删除此文件备份配置信息吗？")){
        window.location="deletefileback?id=" + fileid;
    }
}
//新增备份文件
function addfileback(id){
    window.location="addfileback?id=" + id;
}
 

</script>
</head>

<body>

	<!-- end of header bar -->

	<section id="main">
		<div class="dw">
			<sf:form class="post_message" action="filebacklist"
				modelAttribute="fileBackUp" method="post">
                    IP： <sf:input path="ip" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;"></sf:input>&nbsp;&nbsp;&nbsp;&nbsp;
					 设备类型： 
					 <sf:select path="hardware_type">
					   <sf:option value="">请选择...</sf:option>
					   <sf:option value="1">主机</sf:option>
					   <sf:option value="2">路由器</sf:option>
					   <sf:option value="3">交换机</sf:option>
				    </sf:select> &nbsp;&nbsp;&nbsp;&nbsp;
					备份文件名： <sf:input path="backup_files" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;"></sf:input>&nbsp;&nbsp;&nbsp;&nbsp;
                    
				<input type="hidden" name="page" id ="page" value="1"/>
					 <input type="submit" value="搜索" id="sub" class="alt_btn">
                    <input type="reset" value="重置" class="alt_btn" >
			</sf:form>
		</div>
		<article class="module width_full">
			<div class="clearfix">
				<h3>备份文件配置列表</h3>  <a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='block';"
								style="float:right; margin:3px 10px;"><input type="submit"
									value="新增" class="alt_btn1"> </a> 
				</div>
				



<!-- 新增弹出层 -->
				<sf:form action="savefileback" method="post" id="from3"
					modelAttribute="fileBackUp">
					<div id="cjxpz" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpz').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul> 
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">IP地址：</div>
								<sf:input path="ip" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">帐户：</div>
								  <sf:input path="username" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">密码：</div>
								<sf:input path="passwd" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">FTP端口：</div>
								<sf:input path="ftp_port" type="text"/>
							</li>
						<li class="clearfix" style="margin-bottom:10px;"><div
								style="width:75px !important; float:left; text-align:right; margin-right:10px;">设备类型：</div>
							<sf:select path="hardware_type">
								<sf:option value="">请选择...</sf:option>
								<sf:option value="1">主机</sf:option>
								<sf:option value="2">路由器</sf:option>
								<sf:option value="3">交换机</sf:option>
							</sf:select></li>

						<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">设备型号：</div>
								<sf:input path="device_type" type="text"/>
								</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备份命令：</div>
								<sf:input path="back_command" type="text"/>
							</li>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">恢复命令：</div>
								<sf:input path="recover_command" type="text"/>
							</li>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备份文件：</div>
								<sf:input path="backup_files" type="text"/>
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



<!--编辑弹出层 -->
				<sf:form action="modifyfileback" method="post" id="from4"
					modelAttribute="fileBackUp">
					<div id="cjxpzb" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpzb').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul> 
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">IP地址：</div>
								<sf:input path="ip" type="text" class="ip1"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">帐户：</div>
								  <sf:input path="username" type="text" class="username1"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">密码：</div>
								<sf:input path="passwd" type="text" class="passwd1"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">FTP端口：</div>
								<sf:input path="ftp_port" type="text" class="ftp_port1"/>
							</li>
						<li class="clearfix" style="margin-bottom:10px;"><div
								style="width:75px !important; float:left; text-align:right; margin-right:10px;">设备类型：</div>
							<input type="radio" name="hardware_type" class="hardware_type1" value="1"/>主机 
								<input type="radio" name="hardware_type" class="hardware_type2" value="2"/> 路由器
								<input type="radio" name="hardware_type" class="hardware_type3" value="3"/> 交换机</li>

						<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">设备型号：</div>
								<sf:input path="device_type" type="text" class="device_type1"/>
								</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备份命令：</div>
								<sf:input path="back_command" type="text" class="back_command1"/>
							</li>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">恢复命令：</div>
								<sf:input path="recover_command" type="text" class="recover_command1"/>
							</li>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备份文件：</div>
								<sf:input path="backup_files" type="text" class="backup_files1"/>
								<sf:input path="id" type="hidden" class="id1"/>
							</li>
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
						<th class="header">FTP端口</th>
						<th class="header">设备类型</th>
						<th class="header">设备型号</th>
						<th class="header">备份命令</th>
						<th class="header">恢复命令</th>
						<th class="header">备份文件</th>
						<th class="header">操作</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${backfilelist}" var="backfile" varStatus="status">
						<tr>
							<td class="txt_c">${status.count}</td>
							
							<td>${backfile.ip }</td>
							<td>${backfile.username }</td>
							<td>${backfile.passwd }</td>
							<td>${backfile.ftp_port }</td>
							 <td>${backfile.hardware_type}</td>
							<td>${backfile.device_type }</td>
							 <td>${backfile.back_command}</td>
							 <td>${backfile.recover_command}</td>
							 <td>${backfile.backup_files}</td>
							<td>
							     
							   <a href="javascript:void(0);"
									onclick="modifyfileback(${backfile.id})"><img
										src="<%=request.getContextPath()%>/images/icn_edit.png"
										title="Edit" style="vertical-align:middle;" /> 编辑</a>
								 
								<a href="javascript:deletefilebacklist(${backfile.id});"><img
									src="<%=request.getContextPath()%>/images/icn_trash.png"
									title="Trash" style="vertical-align: middle;"> 删除</a></td>
						</tr>
					</c:forEach>
					
				</tbody>
			</table>
			</div>
			<footer>
				
    <div align="center">${pager}</div>
			</footer>
			
		</article>
	</section>
</body>
</html>