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
<!--[if lt IE 9]>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/ie.css" type="text/css" media="screen" />
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
<script type="text/javascript">
//编辑场景记录
function edittask(taskid){
    window.location="edittask?taskid=" + taskid;
}
//删除场景记录
function deletetask(taskid){
    if(confirm("确定要删除此实验场景吗？")){
        window.location="deletetask?taskid=" + taskid;
    }
}

//展示场景记录
function showtask(taskid){
    window.location="showtask?taskid=" + taskid;
}

//设置场景记录
function configtask(taskid){
    window.location="configtask?taskid=" + taskid;
}

</script>
</head>

<body >

	<!-- end of header bar -->

	<section id="main">
		<div class="dw">
			<sf:form class="post_message" action="taskHis"
				modelAttribute="task" method="post">
                名称： <sf:input path="name"
					onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;"></sf:input>&nbsp;&nbsp;&nbsp;&nbsp;
               
                时间：
                <sf:input path="starTime"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
                 - 
                <sf:input path="endTime"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
                &nbsp;&nbsp;&nbsp;&nbsp;
				<input type="hidden" name="page" id ="page" value="1"/>
					 <input type="submit" value="搜索" id="sub" class="alt_btn">
                <input type="reset" value="重置" class="alt_btn" >
			</sf:form>
		</div>
		<article class="module width_full">
			<div class="clearfix">
				<h3>实验场景记录列表</h3>  <span class="mt10 fr mr30"></span>
				</div>
			<table class="tablesorter_b" cellspacing="0">
				<thead>
					<tr>
						<th>序号</th>
						<th class="header headerSortUp" style="width:200px;">场景记录名称</th>
						<th class="header">启动时间</th>
						<th class="header">停止时间</th>
						<th class="header">正常频率（秒）</th>
						<th class="header">预警频率（秒）</th>
						<th class="header">报警频率（秒）</th>
						<th class="header">前置窗口（秒）</th>
						<th class="header">后置窗口（秒）</th>
						<th class="header">拓扑状态</th>
						<th class="header">任务状态</th>
						<th class="header">操作</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${tasklist}" var="task" varStatus="status">
						<tr>
							<td class="txt_c">${status.count}</td>
							<td>${task.name }</td>
							<td><fmt:formatDate value="${task.starTime}" type="both"
									pattern="yyyy-MM-dd HH:mm:ss" /></td>
							<td><fmt:formatDate value="${task.endTime }" type="both"
									pattern="yyyy-MM-dd HH:mm:ss" /></td>
							<td>${task.normalRate }</td>
							<td>${task.warningRate }</td>
							<td>${task.exceptRate }</td>
							<td>${task.beforWin }</td>
							<td>${task.afterWin }</td>
							<td><c:if test="${task.topo_status == '1'}">已发现</c:if><c:if test="${task.topo_status == '0'}">未发现</c:if></td>
							<td>${task.statusName}</td>
							<td>
							    
								<a
								href="../verTaskctrl/listVerifyTask?id=${task.id }"><img
									src="<%=request.getContextPath()%>/images/icn_categories.png"
									title="查看"  style="vertical-align: middle;"> 场景回看</a></td>
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