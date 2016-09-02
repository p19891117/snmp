<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layout1.css" type="text/css" media="screen" />
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<article class="module width_full">
		<div class="clearfix">
			<h3>全局配置:<span style="line-height:30px;">编辑OID子项</span></h3>
		</div>
		<div style="background: none;width: 98%;">
		<form action="<%=request.getContextPath()%>/Global_configctrl/editOidSubResult">
			<input type="hidden" name="table_oid_id" value="${oidsub.table_oid_id}" />
			<input type="hidden" name="id" value="${oidsub.id}" />
			<table  class="tablesorter_b border" >
				<tr> <td>父oid</td> <td>${oidsub.table_oid_id}</td></tr>
				<tr> <td>oid</td> <td><input type="text" name="sub_oid" value="${oidsub.sub_oid}"/></td></tr>
				<tr> 
					<td>类型</td>
					<td> 
						<select name="oid_value_type">
								<option value="INTEGER" ${oidsub.oid_value_type=="INTEGER"?"selected = 'selected'":""}>INTEGER</option>
								<option value="IPADDRESS" ${oidsub.oid_value_type=="IPADDRESS"?"selected = 'selected'":""}>IPADDRESS</option>
								<option value="OCTET-STRING" ${oidsub.oid_value_type=="OCTET-STRING"?"selected = 'selected'":""}>OCTET-STRING</option>
						</select>
					</td>
				</tr>
				<tr> 
					<td>读权限</td> 
					<td>
						<select name="read">
								<option value="1" ${oidsub.read=="1"?"selected = 'selected'":""} >有</option>
								<option value="0" ${oidsub.read=="0"?"selected = 'selected'":""}>无</option>
						</select>
					</td>
				</tr>
				<tr> 
					<td>写权限</td> 
					<td> 
						<select name="write">
								<option value="1" ${oidsub.read=="1"?"selected = 'selected'":""}>有</option>
								<option value="0" ${oidsub.read=="0"?"selected = 'selected'":""}>无</option>
						</select>
					</td>
				</tr>
				<tr> <th colspan="2"><input type="submit" value="提交"/></th> </tr>
			</table>
		</form>
		</div>
	</article>
</body>
</html>