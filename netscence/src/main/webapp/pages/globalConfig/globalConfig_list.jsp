<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" deferredSyntaxAllowedAsLiteral="true"%>
<%@page import="java.util.Date"%>
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
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

<script type="text/javascript">

 	function editGlobalConfig(gather_id) {
		document.getElementById('cjxpzb').style.display = 'block';
		$.ajax({
			url:"updateGlobalConfig",
			data:{"id":gather_id},
			dataType: "json",
			success:function(data){ 
				$(".dev_type1").val(data.dev_type);
				$(".gather_name1").val(data.gather_name);
				$(".gather_id1").val(data.gather_id);
				$(".dev_firm1").val(data.dev_firm);
				$(".dev_model1").val(data.dev_model);
				$(".note1").val(data.note);
				if(data.complex_flag =="0"){
				    $(".complex_flag0").attr("checked","checked");
				}
				else{
				    $(".complex_flag1").attr("checked","checked");
				}
				if(data.sys_type =="1"){
				    $(".sys_type1").attr("checked","checked");
				}
				else if(data.sys_type =="2"){
				    $(".sys_type2").attr("checked","checked");
				}
				else{
				    $(".sys_type3").attr("checked","checked");
				}
			}
		});
	}
	
	
	function deleteConfig(id){
		if(confirm("确定要删除此策略吗？")){
			window.location = "deleteGlobalConfig?id="+id;
		}
	}
	
	
	
	function configDetailPage(gather_id,complex_flag) {
        var openUrl = "";//弹出窗口的url
		var iWidth=1400; //弹出窗口的宽度;
        var iHeight=600; //弹出窗口的高度;
        var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
        var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
        window.open('<%=request.getContextPath()%>/Global_configctrl/listGlobalConfigDetail?gather_id=' + gather_id+'&complex_flag='+complex_flag,"","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft); 
    }
    
    function expByExcel(exp_type){
			$.ajax({
				url:"expByExcel",
				data:{"exp_type":exp_type},
				dataType:"text",
				success:function(data){
					//window.location.href="<%=request.getContextPath()%>/"+data;
					document.getElementById("ifile").src="<%=request.getContextPath()%>/"+data;
				}
			});
		}
		
		  
        function check(){
            var s=$("#conffile").val();
            var s1=$("#conffile1").val();
            var imp_type=$("#imp_type").val();
            if(s != "" && s1 == ""){
            	if(s.indexOf("FatherItem")<=10 && imp_type =="1"){
	            	alert("导入父项的文件名不正确，请重新选择文件!");
	                return false;
            	}
            	if( imp_type =="2"){
	            	alert("请重选择采集子项文件!");
	                return false;
            	}
            	
            	return true;
            }else if(s1 != "" && s == "" ){
            	
            	if(s1.indexOf("ChildItem")<=10 && imp_type =="2"){
	            	alert("导入子项的文件名不正确，请重新选择文件!");
	                return false;
            	}
            	if( imp_type =="1"){
	            	alert("请重选择采集父项文件!");
	                return false;
            	}
            	return true;
            }else if(s1 == "" && s == "" ){
            	
            	if(imp_type =="2"){
	            	alert("请重选择采集子项文件!");
	                return false;
            	}
            	if( imp_type =="1"){
	            	alert("请重选择采集父项文件!");
	                return false;
            	}
            	return true;
            }else{
                if(imp_type =="1"){
	            	alert("请重选择采集父项文件!");
	                return false;
            	}
            	if(imp_type =="2"){
	            	alert("请重选择采集子项文件!");
	                return false;
            	}
            }
        }
</script>
</head>

<body>

	<!-- end of header bar -->
  <iframe id="ifile" style="display:none"></iframe>


	<section id="main">
	<div class="dw">
			<sf:form class="post_message" action="listGlobalConfig"
				modelAttribute="gatherItem" method="post">
                                                         采集项名称： <sf:input path="gather_name" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;"></sf:input> 
					 设备类型： 
					 <sf:select path="dev_type">
					   <sf:option value="">请选择...</sf:option>
					   <sf:option value="1">主机</sf:option>
					   <sf:option value="2">路由器</sf:option>
					   <sf:option value="3">交换机</sf:option>
					   <sf:option value="4">防火墙</sf:option>
				    </sf:select>  
				       系统类型：
					 <sf:select path="sys_type">
					   <sf:option value="">请选择...</sf:option>
					   <sf:option value="1">system</sf:option>
					   <sf:option value="2">interface</sf:option>
					   <sf:option value="3">IP</sf:option>
					   <sf:option value="4">tcp</sf:option>
					   <sf:option value="5">udp</sf:option>
					   <sf:option value="6">icmp</sf:option>
				    </sf:select>   
				    复合项标志： 
					 <sf:select path="complex_flag">
					   <sf:option value="">请选择...</sf:option>
					   <sf:option value="0">否</sf:option>
					   <sf:option value="1">是</sf:option>
				    </sf:select>  
				<input type="hidden" name="page" id ="page" value="1"/>
					 <input type="submit" value="搜索" id="sub" class="alt_btn">
                    <input type="reset" value="重置" class="alt_btn" >
                    <input type="button" value="数据导入" class="alt_btn"  onClick="document.getElementById('impexcel').style.display='block';"> 
                    <input type="button" value="数据导出" class="alt_btn"  onClick="document.getElementById('expexcel').style.display='block';"> 
			</sf:form>
		</div>
		<article class="module width_full">
			<div class="clearfix">
				<h3>全局配置<span style="line-height:30px;">采集项配置</span></h3><a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='block';"
								style="float:right; margin:3px 10px;"><input type="submit"
									value="新增" class="alt_btn1"> </a>
									
			</div>
			<div style="background: none;width: 98%;">
			
				<table class="tablesorter_b border" cellspacing="0"
					style="margin-top:20px;">
					
					<tbody>
						<tr>
							<td>序号</td>
							<td>设备类型</td>
							<!-- 
							<td>OID</td>
							<td>中文名</td>
							<td>英文名</td>
							 -->
							<td>采集项名称</td>
							<!--<td>值类型</td>-->
							<td>供应商</td>
							<td>型号</td>
							<td>系统类型</td>
							<td>备注</td>
							<td>是否复合项</td>
							<td width="120px">操作</td>
						</tr>
						<c:forEach items="${globalConfiglist}" var="gatherItem"
							varStatus="status">
							<tr>
								<td>${status.count}</td>
								<td>${gatherItem.dev_type_cn}</td>
								<td>${gatherItem.gather_name}</td>
								<td>${gatherItem.dev_firm_cn}</td>
								<td>${gatherItem.dev_model}</td>
								
								<td><c:if test="${gatherItem.sys_type == 1}">基本信息</c:if>
									<c:if test="${gatherItem.sys_type == 2}">网络信息</c:if>
									<c:if test="${gatherItem.sys_type == 3}">安装与进程</c:if></td>
								<td>${gatherItem.note}</td>
								<td><c:if test="${gatherItem.complex_flag == 0}">否</c:if>
									<c:if test="${gatherItem.complex_flag == 1}">是</c:if></td>
								<td width="15%"><a href="javascript:void(0);"
									onclick="configDetailPage(${gatherItem.gather_id},${gatherItem.complex_flag})"><img
										src="<%=request.getContextPath()%>/images/img_add.png"
										title="Edit" style="vertical-align:middle;" /> 采集明细</a>
								<a href="javascript:void(0);"
									onclick="editGlobalConfig(${gatherItem.gather_id})"><img
										src="<%=request.getContextPath()%>/images/icn_edit.png"
										title="Edit" style="vertical-align:middle;" /> 编辑</a> <a
									href="javascript:void(0);" onclick="deleteConfig('${gatherItem.gather_id}');"><img
										src="<%=request.getContextPath()%>/images/icn_trash.png"
										title="Trash" style="vertical-align:middle;"> 删除</a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>

				<!-- 新增弹出层 -->
				<sf:form action="addGlobalConfig" method="post" id="from3"
					modelAttribute="gatherItem">
					<div id="cjxpz" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpz').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">设备类型：</div>
								<sf:select path="dev_type"  class="dev_type">
									<c:forEach items="${dev_list}" var="deviceType">
										<option value="${deviceType.id}">${deviceType.dev_type}</option>
									</c:forEach>
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">采集项名称：</div>
								<sf:input path="gather_name" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">供应商：</div>
								<sf:select path="dev_firm" class="dev_firm">
									<c:forEach items="${factory_list}" var="factory">
										<option value="${factory.scn_id}">${factory.firmName_cn}</option>
									</c:forEach>
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">型号：</div>
								<sf:input path="dev_model" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备注：</div>
								<sf:input path="note" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">是否复合项：</div>
								<input type="radio" name="complex_flag" checked="checked" value="0"/> 否 
								<input type="radio" name="complex_flag" value="1"/> 是
								</li>
								
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">系统类型：</div>
								<input type="radio" name="sys_type" checked="checked" value="1"/> 基本信息 
								<input type="radio" name="sys_type" value="2"/> 网络信息
								<input type="radio" name="sys_type" value="3"/> 安装与进程
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
				<sf:form action="editGlobalConfig" method="post" id="from4"
					modelAttribute="gatherItem">
					<div id="cjxpzb" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpzb').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">设备类型：</div>
								<sf:select path="dev_type"  class="dev_type1">
									<c:forEach items="${dev_list}" var="deviceType">
										<option value="${deviceType.id}">${deviceType.dev_type}</option>
									</c:forEach>
								</sf:select>
							</li>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">采集项名称：</div>
								<sf:input path="gather_name" class="gather_name1" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">供应商：</div>
								<sf:select path="dev_firm" class="dev_firm1">
									<c:forEach items="${factory_list}" var="factory">
										<option value="${factory.scn_id}">${factory.firmName_cn}</option>
									</c:forEach>
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">型号：</div>
								<sf:input path="dev_model" class="dev_model1" type="text"/>
							</li>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备注：</div>
								<sf:input path="note" class="note1" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">是否复合项：</div>
								<input type="radio" name="complex_flag" class="complex_flag0" value="0"/> 否 
								<input type="radio" name="complex_flag" class="complex_flag1" value="1"/> 是
								</li>
								
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">是否复合项：</div>
								<input type="radio" name="sys_type" class="sys_type1" value="1"/> 基本信息 
								<input type="radio" name="sys_type" class="sys_type2" value="2"/> 网络信息
								<input type="radio" name="sys_type" class="sys_type3" value="3"/> 安装与进程
								</li>
							<sf:input path="gather_id" type="text" class="gather_id1"
								style="display:none;" />
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
			</div>






<!-- 导入弹出层 -->
				<form action="impGatherItemByExcel" method="post" id="from8"  enctype="multipart/form-data" onsubmit="return check();">
					<div id="impexcel" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('impexcel').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul>
							
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">父项文件：</div>
								<input type="file" name="conffile" id="conffile"/>
										</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">&nbsp;&nbsp;&nbsp;</div>
								<input type="submit" value="父项导入" id="sub1" class="alt_btn1" onclick="javascript:document.getElementById('imp_type').value='1'">  &nbsp;
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">子项文件：</div>
								<input type="file" name="conffile1" id="conffile1"/>
							 	</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">&nbsp;&nbsp;&nbsp; </div>
								 <input type="submit" value="子项导入" id="sub2" class="alt_btn1" onclick="javascript:document.getElementById('imp_type').value='2'">  &nbsp;
							</li>
						</ul>
						<input type="hidden" id="imp_type" name="imp_type"/>
						
					</div>
				</form>
<!-- 导出弹出层 -->
	<form action="expGatherItemByExcel" method="post" id="from3"  enctype="multipart/form-data">
					<div id="expexcel" class="cjclpz" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('expexcel').style.display='none';"
								style="float:right;">X</a>
						</div>
						<div style="margin-left:120px;"> <input
								type="button" value="父项导出" class="alt_btn1" onclick="expByExcel(1)">  &nbsp;<input
								type="button" value="子项导出" class="alt_btn1" onclick="expByExcel(2)">  &nbsp;
              <a	href="javascript:void(0);" 	onClick="document.getElementById('expexcel').style.display='none';">
              <input type="button" value="取消"> </a>
						</div>
					</div>
				</form>



			<table class="tablesorter_b border" cellspacing="0"
				style="margin-top:20px;">
				<thead>
					<tr algin="center">
						<th width="81%" class="txt_c">${pager}</th>
						<th width="19%" class="txt_c"><a href="../task/tasklist"><input
								type="button" value="返回首页"> </a></th>
					</tr>
				</thead>
			</table>






		</article>
	</section>
</body>
</html>