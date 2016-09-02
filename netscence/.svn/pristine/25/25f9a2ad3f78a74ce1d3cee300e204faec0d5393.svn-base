<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" deferredSyntaxAllowedAsLiteral="true"%>
<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions"  prefix="fn"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/layout1.css" type="text/css"
	media="screen" />
<script
	src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js"
	type="text/javascript"></script>
<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

<script type="text/javascript">

 	function editGlobalConfigDetail1(scn_id) {
		document.getElementById('cjxpzb').style.display = 'block';
		$.ajax({
			url:"getGatherItemDetail",
			data:{"id":scn_id},
			dataType: "json",
			success:function(data){ 
				$(".oid_name_cn").val(data.oid_name_cn);
				$(".gather_id").val(data.gather_id);
				$(".oid_name_en").val(data.oid_name_en);
				$(".state").val(data.state);
				$(".operTime").val(data.operTime);
				$(".note").val(data.note);
				$(".scn_id").val(data.scn_id);
				$(".oid").val(data.oid);
				$(".child_oid").val(data.child_oid);
				$(".gather_flag").val(data.gather_flag);
				$(".oid_value_type").val(data.oid_value_type);
				$(".read").val(data.read);
				$(".write").val(data.write);
				if(data.oid_flag =="1"){
				    $(".oid_flag1").attr("checked","checked");
       			    $("#ch_divEdit").hide();
				}
				else{
				    $(".oid_flag2").attr("checked","checked");
       			    $("#ch_divEdit").show();
				}
			}
		});
	}
	
	
	function deleteConfig(id,gather_id){
		if(confirm("确定要删除此子标吗？")){
			window.location = "deleteGatherItemDetail?id="+id+"&gather_id="+gather_id;
		}
	}
	
	function show(type){ 
	  if(type == 1 ){
        $("#ch_div").hide();
        $("#ch_divEdit").hide();
      }else{
        $("#ch_div").show();
        $("#ch_divEdit").show();
      }
      
    } 
     $(window).load(function() {
            $("#ch_div").hide();
        });
</script>
</head>

<body>
			<table class="tablesorter_b border" cellspacing="0">
					<thead>
						<tr>
							<th colspan="10"><span style="line-height:30px;">采集项OID明细</span>
							 
							  <a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpz').style.display='block';"
								style="float:right; margin:3px 10px;"> <input type="submit"
									value="新增" class="alt_btn1"></a>
							 </th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td width="3%">序号</td>
							<td width="15%">OID</td>
							<!-- 
							<td>OID</td>
							<td>中文名</td>
							<td>英文名</td>
							 -->
							<td width="15%">中文名称</td>
							<!--<td>值类型</td>-->
							<td width="12%">英文名称</td>
							<td width="12%">采集项</td>
							<td width="8%">操作时间</td>
							<td width="20%">备注</td>
							<td width="5%">类型</td>
							<td width="5%">子OID</td>
							<td width="15%">操作</td>
						</tr>
						<c:forEach items="${globalConfigDetaillist}" var="gatherItemDetail"
							varStatus="status">
							<tr>
								<td width="3%">${status.count}</td>
								<td width="15%">${gatherItemDetail.oid}</td>
								<td width="15%">${gatherItemDetail.oid_name_cn}</td>
								<td width="12%">${gatherItemDetail.oid_name_en}</td>
								<td width="12%"><nobr>${gatherItemDetail.gather_name}</nobr></td>
								<td width="8%">${gatherItemDetail.operTime}</td>
								<td width="20%">${gatherItemDetail.note}</td>
								<td width="5%"><nobr><c:if test="${gatherItemDetail.oid_flag == 1}">单值</c:if>
									<c:if test="${gatherItemDetail.oid_flag == 2}">表结构</c:if></nobr></td>
								<td width="20%">${gatherItemDetail.child_oid}</td>
								<td width="15%"><nobr>
								<a href="javascript:void(0);"
									onclick="editGlobalConfigDetail1(${gatherItemDetail.scn_id})"><img
										src="<%=request.getContextPath()%>/images/icn_edit.png"
										title="Edit" style="vertical-align:middle;" /> 编辑</a> <a
									href="javascript:void(0);" onclick="deleteConfig('${gatherItemDetail.scn_id}','${gatherItemDetail.gather_id}');"><img
										src="<%=request.getContextPath()%>/images/icn_trash.png"
										title="Trash" style="vertical-align:middle;"> 删除</a></nobr></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>

				<!-- 新增弹出层 -->
				<sf:form action="addGlobalConfigDetail" method="post" id="from3"
					modelAttribute="gatherItemDetail">
					<div id="cjxpz" class="cjclpzDetail" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpz').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">OID：</div>
								<sf:input path="oid" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">中文名称：</div>
							    <sf:input path="oid_name_cn" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">英文名称：</div>
								<sf:input path="oid_name_en" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">操作时间：</div>
							 <sf:input path="operTime" type="text"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备注：</div>
								<sf:input path="note" type="text"/>
								<sf:input path="gather_id" type="text" class="gather_id1" value="${gather_id }" 
								style="display:none;" />
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">OID类型：</div>
								<input type="radio" name="oid_flag" checked="checked" value="1" onclick="show(this.value)"/> 单值 
								<input type="radio" name="oid_flag" value="2" onclick="show(this.value)"/> 表结构
								</li>
								
							<li id="ch_div" class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">子OID：</div>
								<sf:input path="child_oid" type="text"/>
								</li>
								








								
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">采集标识：</div>
								<sf:select path="gather_flag" >
									 
										<option value="1">采集一次</option>
										<option value="0">按批次采</option>
									 
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">值类型：</div>
								<sf:select path="oid_value_type" >
									 
										<option value="INTEGER">INTEGER</option>
										<option value="TABLE">TABLE</option>
										<option value="GAUGE">GAUGE</option>
										<option value="TIMETICKS">TIMETICKS</option>
										<option value="OCTET-STRING">OCTET-STRING</option>
										<option value="COUNTER">COUNTER</option>
									 
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">读权限：</div>
								<sf:select path="read" >
									 
										<option value="1">有</option>
										<option value="0">无</option>
									 
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">写权限：</div>
								<sf:select path="write" >
									 
										<option value="1">有</option>
										<option value="0">无</option>
									 
								</sf:select>
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
				<sf:form action="updateGlobalConfigDetail" method="post" id="from4"
					modelAttribute="gatherItemDetail">
					<div id="cjxpzb" class="cjclpzDetail" style="display:none;">
						<div class="clearfix">
							<a href="#"
								onClick="document.getElementById('cjxpzb').style.display='none';"
								style="float:right;">X</a>
						</div>
						<ul>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">OID：</div>
								<sf:input path="oid" type="text" class="oid"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">中文名称：</div>
							    <sf:input path="oid_name_cn" type="text" class="oid_name_cn"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">英文名称：</div>
								<sf:input path="oid_name_en" type="text" class="oid_name_en"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">操作时间：</div>
							 <sf:input path="operTime" type="text" class="operTime"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">备注：</div>
								<sf:input path="note" type="text" class="note"/>
								<sf:input path="scn_id" type="text" class="scn_id" style="display:none;" />
								<sf:input path="gather_id" type="text" class="gather_id" style="display:none;" />
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">OID类型：</div>
								<input type="radio" name="oid_flag" class="oid_flag1" checked="checked" value="1"  onclick="show(this.value)"/> 单值 
								<input type="radio" name="oid_flag" class="oid_flag2" value="2"  onclick="show(this.value)"/> 表结构
							</li>
							<li id="ch_divEdit" class="clearfix" style="margin-bottom:10px;"><div
									style="width:75px !important; float:left; text-align:right; margin-right:10px;">子OID：</div>
								<sf:input path="child_oid" type="text" class="child_oid"/>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">采集标识：</div>
								<sf:select path="gather_flag" class="gather_flag">
									 
										<option value="1">采集一次</option>
										<option value="0">按批次采</option>
									 
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">值类型：</div>
							<sf:select path="oid_value_type" class="oid_value_type">
									 
										<option value="INTEGER">INTEGER</option>
										<option value="TABLE">TABLE</option>
										<option value="GAUGE">GAUGE</option>
										<option value="TIMETICKS">TIMETICKS</option>
										<option value="OCTET-STRING">OCTET-STRING</option>
										<option value="COUNTER">COUNTER</option>
									 
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">读权限：</div>
								<sf:select path="read" class="read">
									 
										<option value="1">有</option>
										<option value="0">无</option>
									 
								</sf:select>
							</li>
							<li class="clearfix" style="margin-bottom:10px;"><div
									style="width:70px !important; float:left; text-align:right; margin-right:10px;">写权限：</div>
								<sf:select path="write" class="write">
									 
										<option value="1">有</option>
										<option value="0">无</option>
									 
								</sf:select>
							</li>
						</ul>
						<div style="margin-left:120px;">
							<a href="javascript:void(0);"
								onClick="document.getElementById('cjxpzb').style.display='none';"><input
								type="submit" value="确定" class="alt_btn1"> </a>&nbsp;<a
								href="javascript:void(0);"
								onClick="document.getElementById('cjxpzb').style.display='none';"><input
								type="button" value="取消"> </a>
						</div>
					</div>
				</sf:form>
			 
			<footer>
				<div class="submit_link">
					<a href="javascript:void(0);"
								onClick="window.close();"><input
								type="submit" value="关闭" class="alt_btn1"> </a>
				</div>
			</footer>
</body>
</html>