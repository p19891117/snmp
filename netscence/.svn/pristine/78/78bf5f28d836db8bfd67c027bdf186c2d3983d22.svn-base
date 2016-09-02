<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layout.css" type="text/css" media="screen" />
<script src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js" type="text/javascript"></script>
<title>展示列表</title>
</head>
<body>
	<article class="module width_full">
		<div class="clearfix">
			<h3>全局配置:OID SET 配置（table）</h3>
			<a href="<%=request.getContextPath()%>/Global_configctrl/addOidSet"  style="float:right; margin:3px 10px;"><input type="submit" value="新增" class="alt_btn1"> </a>
		</div>
		<table  class="tablesorter_b" >
			<thead><tr> <th>oid</th><th>name</th> <th>操作</th> </tr></thead>
			<tbody>
			<c:forEach var="oidset" items="${oidsetlist}">
				<tr> 
					<td>${oidset.oid}</td> 
					<td>${oidset.name}</td> 
					<td>
						<a href="<%=request.getContextPath()%>/Global_configctrl/oidSubList?id=${oidset.id}">列出子项</a> 
						<a href="<%=request.getContextPath()%>/Global_configctrl/editOidSet?id=${oidset.id}">修改</a>
						<a href="<%=request.getContextPath()%>/Global_configctrl/deleteOidSet?id=${oidset.id}">删除</a>
					</td> 
				</tr>
			</c:forEach>
			</tbody>
		</table>
		</div>
	</article>
</body>
</html>