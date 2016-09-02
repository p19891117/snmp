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
			<h3>全局配置:<span style="line-height:30px;">新增OID子项</span></h3>
		</div>
		<div style="background: none;width: 98%;">
		<form action="<%=request.getContextPath()%>/Global_configctrl/addOidSubResult">
			<input type="hidden" name="table_oid_id" value="${table_oid_id}" />
			<table  class="tablesorter_b border"  >
				<tr> <td>父oid</td> <td>${table_oid_id}</td></tr>
				<tr> <td>oid</td> <td><input type="text" name="sub_oid"/></td></tr>
				<tr> 
					<td>类型</td> 
					<td>
						<select name="oid_value_type">
								<option value="INTEGER">INTEGER</option>
								<option value="IPADDRESS">IPADDRESS</option>
								<option value="OCTET-STRING">OCTET-STRING</option>
						</select>
					</td>
				</tr>
				<tr> 
					<td>读权限</td> 
						<td> 
							<select name="read">
								<option value="1">有</option>
								<option value="0">无</option>
							</select>
						</td>
				</tr>
				<tr> 
					<td>写权限</td> 
					<td>
						<select name="write">
								<option value="1">有</option>
								<option value="0">无</option>
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