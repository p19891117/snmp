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
			<h3>全局配置:<span style="line-height:30px;">编辑OID</span></h3>
		</div>
		<div style="background: none;width: 98%;">
		<form action="<%=request.getContextPath()%>/Global_configctrl/editOidSetResult">
			<input type="hidden" name="id" value="${oidset.id}" />
			<table  class="tablesorter_b border"  >
				<tr> <td>oid</td> <td><input type="text" name="oid" value="${oidset.oid}"/></td></tr>
				<tr> <td>name</td> <td><input type="text" name="name" value="${oidset.name}"/></td></tr>
				<tr> <th colspan="2"><input type="submit" value="提交"></th> </tr>
			</table>
		</form>
		</div>
	</article>
</body>
</html>