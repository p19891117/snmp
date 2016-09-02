<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layout.css" type="text/css" media="screen" />
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<article class="module width_full" >
		<div class="clearfix">
			<h3>全局配置:OID SET 子项配置</h3>
			<a href="<%=request.getContextPath()%>/Global_configctrl/addOidSub?table_oid_id=${table_oid_id}"  style="float:right; margin:3px 10px;"><input type="submit" value="新增" class="alt_btn1"> </a>
		</div>
		<table  class="tablesorter_b border"  cellspacing="0">
			<thead><tr> <th>子oid</th><th>oid类型</th><th>写权限</th><th>读权限</th> <th>操作</th> </tr></thead>
			<tbody>
			<c:forEach var="oidsub" items="${oidSubList}">
				<tr> 
					<td>${oidsub.sub_oid}</td> 
					<td>${oidsub.oid_value_type}</td> 
					<td>${oidsub.write=="1"?"有":"无"}</td> 
					<td>${oidsub.read=="1"?"有":"无"}</td>
					<td>
						<a href="<%=request.getContextPath()%>/Global_configctrl/editOidSub?id=${oidsub.id}">修改</a>
						<a href="<%=request.getContextPath()%>/Global_configctrl/deleteOidSub?id=${oidsub.id}&table_oid_id=${table_oid_id}">删除</a> 
					</td> 
				</tr>
			</c:forEach>
			</tbody>
		</table>
		</div>
	</article>
</body>
</html>