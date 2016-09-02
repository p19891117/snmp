<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/task.css" type="text/css" media="screen" />
<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/jquery.min.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery/unicorn.js"></script>
</head>

<body>
<header id="header" class="clearfix">
  <h2 class="section_title" >面向网络安全实验和设备测试的实验场景恢复原型系统</h2> <!-- <span><a href="全局配置.html">全局配置</a></span> -->
</header>
<!-- end of header bar -->

<div id="sidebar">
  <ul>
    <li><a href="<%=request.getContextPath()%>/task/tasklist" target="maincontent">实验场景记录</a></li>
    <li> <a href="<%=request.getContextPath()%>/task/taskHis"  target="maincontent"><span>场景回看</span></a> </li>
    <li> <a href="<%=request.getContextPath()%>/task/taskBack"  target="maincontent"><span>场景回溯</span></a> </li>
    <li class="submenu"> <a href="#"><span>配置管理</span> <span class="label"></span></a>
      <ul>
        <li><a href="<%=request.getContextPath()%>/Global_configctrl/listGlobalConfig" target="maincontent">全局配置</a></li>
        <li><a href="<%=request.getContextPath()%>/task/filebacklist" target="maincontent">备份文件配置</a></li>
        <li><a href="<%=request.getContextPath()%>/task/vmbacklist" target="maincontent">虚拟机快照配置</a></li>
        <li><a href="<%=request.getContextPath()%>/Global_configctrl/oidsetlist" target="maincontent">OID SET配置</a></li>
      </ul>
    </li>
   </ul>
</div>
<div id="content">
<iframe name="maincontent" width="99%" height="100%" src="tasklist" style="border:none;">
 
  </iframe>
</div>
</body>
</html>