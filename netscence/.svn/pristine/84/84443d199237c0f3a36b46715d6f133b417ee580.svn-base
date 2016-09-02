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
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"
    src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js"></script>
<!--[if lt IE 9]>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
<script type="text/javascript">
	function savetask(){
	    if($("#id").val() != ""){
            $("#form1").attr("action","edittask");
        }
	    //alert($("#form1").attr("action"));
	    //$("#topo_gateway").val($("#ip1").val() + "." + $("#ip2").val() + "." + $("#ip3").val() + "." + $("#ip4").val());
	    $("#flow_devip").val($("#ip11").val() + "." + $("#ip12").val() + "." + $("#ip13").val() + "." + $("#ip14").val());
	    var confid = "";
        $('#gatherItem input:checkbox:checked').each(function() {
            confid += $(this).val();
            confid += ",";
        });
        $("#confid").val(confid);
        if($("#starTime").val() >=$("#endTime").val()){
        	alert("停止时间必须大于启动时间");
        	return false;
        }
        if(parseInt($("#normalRate").val()) < 8){
        	alert("正常采集频率最低为8秒");
        	return false;
        }
        if(parseInt($("#normalRate").val()) <= parseInt($("#warningRate").val())){
        	alert("报警采集频率必须小于正常采集频率");
        	return false;
        }
        if(parseInt($("#warningRate").val()) <= parseInt($("#exceptRate").val())){
        	alert("异常采集频率必须小于报警采集频率");
        	return false;
        }
        if(parseInt($("#swingTime").val()) <= 2*parseInt($("#normalRate").val())){
        	alert("振幅计算时间间隔必须大于正常采集频率2倍值以上");
        	return false;
        }else{
            return true;;
        }
	    
	}
	
	$(function(){
	    if($("#id").val() != ""){
	        //var ips = $("#topo_gateway").val().split(".");
	        var devips = $("#flow_devip").val().split(".");
	        //$("#ip1").val(ips[0]);
	        //$("#ip2").val(ips[1]);
	        //$("#ip3").val(ips[2]);
	        //$("#ip4").val(ips[3]);
	        $("#ip11").val(devips[0]);
	        $("#ip12").val(devips[1]);
	        $("#ip13").val(devips[2]);
	        $("#ip14").val(devips[3]);
	    }
	});
	
	function selectAll(){
		var itemAll = document.getElementById("itemAll");
		if(itemAll.checked == true){
			$(":checkbox").prop("checked", true);
		}else{
			$(":checkbox").prop("checked", false);
		}
		
	}
</script>    
</head>

<body>
	
	<!-- end of header bar -->

	<section id="main" class="column">
		<sf:form action="addtask" modelAttribute="task" id="form1" method="post" enctype="multipart/form-data" onsubmit="return savetask();">
			<article class="module width_full">
				<div class="clearfix">
					<h3>实验场景记录信息</h3>
				</div>
				<table class="tablesorter border" cellspacing="0"
					style="margin: 20px 5%;">
					<thead>
						<tr>
							<th colspan="4">基本信息</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="txt_r"><font color="red">*</font>名称：</td>
							<td colspan="3"><sf:hidden path="id"/><sf:input path="name" style="width: 75.5%;" />
							                 <sf:errors path="name" cssStyle="color:red"/></td>
						</tr>
						<tr>
							<td class="txt_r"><font color="red">*</font>启动时间：</td>
							<td><sf:input path="starTime" style="width: 150px;" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
							     <sf:errors path="starTime" cssStyle="color:red"/></td>
							<td class="txt_r"><font color="red">*</font>停止时间：</td>
							<td><sf:input path="endTime" style="width: 150px;" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});" />
							     <sf:errors path="endTime" cssStyle="color:red"/></td>
						</tr>
						<tr>
							<td class="txt_r"><font color="red">*</font>正常采集频率（秒）：</td>
							<td><sf:input path="normalRate" style="width: 150px;" />
							     <sf:errors path="normalRate" cssStyle="color:red" /></td>
							<td class="txt_r"><font color="red">*</font>预警采集频率（秒）：</td>
							<td><sf:input path="warningRate"  style="width: 150px;" />
							     <sf:errors path="warningRate" cssStyle="color:red" /></td>
						</tr>
						<tr>
							<td class="txt_r"><font color="red">*</font>报警采集频率（秒）：</td>
							<td><sf:input path="exceptRate"  style="width: 150px;" />
							     <sf:errors path="exceptRate" cssStyle="color:red" /><sf:hidden path="topo_gateway"/></td>
							<td class="txt_r"><font color="red">*</font>振幅计算时间间隔（秒）：</td>
							<td><sf:input path="swingTime"  style="width: 150px;" />
							     <sf:errors path="swingTime" cssStyle="color:red" /></td>
						</tr>
						<tr>
							<td class="txt_r"><font color="red">*</font>前置时间窗口（秒）：</td>
							<td><sf:input path="beforWin" style="width: 150px;" />
							     <sf:errors path="beforWin" cssStyle="color:red" /></td>
							<td class="txt_r">流量设备IP：</td>
							<td colspan="3"><sf:hidden path="flow_devip"/>
							    <input type="text"
								style="width: 55px; list-style: none;" id="ip11"/> . <input type="text"
								style="width: 55px;" id="ip12"/> . <input type="text"
								style="width: 55px;" id="ip13"/> . <input type="text"
								style="width: 55px;" id="ip14"/></td>
						</tr>
						<tr>
							<td class="txt_r"><font color="red">*</font>后置时间窗口（秒）：</td>
							<td><sf:input path="afterWin" style="width: 150px;" />
							     <sf:errors path="afterWin" cssStyle="color:red" /></td>
						</tr>
						<tr>
							<td class="txt_r">描述：</td>
							<td colspan="3"><sf:textarea path="mark" rows="4"  style="width: 74.5%;"/></td>
						</tr>
						<c:if test="${fileflag == 'add'}">
							<tr>
								<td class="txt_r"><font color="red">*</font>网络拓扑文件：</td>
								<td colspan="3"><input type="file" name="topofile" />
								</td>
							</tr>
						</c:if>
					</tbody>
				</table>
				<table class="tablesorter border" cellspacing="0"  
					style="margin: 20px 5%;">
					<thead>
						<tr>
							<th colspan="4">采集项选择&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="itemAll" checked onclick="selectAll();">全选</th>
						</tr>
					</thead>
					<tbody  id="gatherItem">
					   <c:forEach items="${devConfList }" var="devConf">
					       <tr>
                            <td class="txt_r" width="60px">${devConf.dev_type.dev_type }</td>
                            <td><sf:hidden path="confid"/>
                                <table border="0px">
                                <tr>
                               	<td width="60px">系统：</td>
                               	<td style="border-right: 0px">
                                <c:forEach items="${devConf.config }" var="conf">
                                	<c:if test="${conf.sys_type == '1' }">
                                		<input type="checkbox" <c:if test="${conf.oid != '-1' }">checked="checked"</c:if> value="${conf.gather_id }"/>${conf.gather_name }
                                	</c:if>
                                </c:forEach>
                                </td>
                                </tr>
                                <tr>
                                <td width="60px">接口：</td>
                                <td style="border-right: 0px">
                                <c:forEach items="${devConf.config }" var="conf">
                                	<c:if test="${conf.sys_type == '2' }">
                                		<input type="checkbox" <c:if test="${conf.oid != '-1' }">checked="checked"</c:if> value="${conf.gather_id }"/>${conf.gather_name }
                                	</c:if>
                                </c:forEach>
                                </td>
                                <tr>
                                <td width="60px">IP：</td>
                                <td style="border-right: 0px;">
                                <c:forEach items="${devConf.config }" var="conf">
                                	<c:if test="${conf.sys_type == '3' }">
                                		<input type="checkbox" <c:if test="${conf.oid != '-1' }">checked="checked"</c:if> value="${conf.gather_id }"/>${conf.gather_name }
                                	</c:if>
                                </c:forEach>
                                </td>
                                </tr>
                                <tr>
                                <td  width="60px">TCP：</td>
                                <td style="border-right: 0px;">
                                <c:forEach items="${devConf.config }" var="conf">
                                	<c:if test="${conf.sys_type == '4' }">
                                		<input type="checkbox" <c:if test="${conf.oid != '-1' }">checked="checked"</c:if> value="${conf.gather_id }"/>${conf.gather_name }
                                	</c:if>
                                </c:forEach>
                                </td>
                                </tr>
                                <tr>
                                <td  width="60px">UDP：</td>
                                <td style="border-right: 0px;">
                                <c:forEach items="${devConf.config }" var="conf">
                                	<c:if test="${conf.sys_type == '5' }">
                                		<input type="checkbox" <c:if test="${conf.oid != '-1' }">checked="checked"</c:if> value="${conf.gather_id }"/>${conf.gather_name }
                                	</c:if>
                                </c:forEach>
                                </td>
                                </tr>
                                <tr>
                                <td style="border-bottom: 0px;"  width="60px">ICMP：</td>
                                <td style="border-right: 0px;border-bottom: 0px;">
                                <c:forEach items="${devConf.config }" var="conf">
                                	<c:if test="${conf.sys_type == '6' }">
                                		<input type="checkbox" <c:if test="${conf.oid != '-1' }">checked="checked"</c:if> value="${conf.gather_id }"/>${conf.gather_name }
                                	</c:if>
                                </c:forEach>
                                </td>
                                </tr>
                                </table>
                            </td>
                            </tr>
					   </c:forEach>
					</tbody>
				</table>
				<footer>
					<div class="submit_link">
						<input type="submit" value="保存" class="alt_btn1"  />
						<input type="reset" value="重置">
						<input type="button" value="返回" class="alt_btn1" onclick="javascript:history.go(-1);"/>
					</div>
				</footer>
			</article>
		</sf:form>
	</section>
	&nbsp;
</body>
</html>