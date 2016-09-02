<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>面向网络安全实验和设备测试的实验场景恢复原型系统</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/layout.css" type="text/css" media="screen" />
    <script src="<%=request.getContextPath()%>/js/jquery/jquery-1.9.0.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/js/jquery/jquery.tablesorter.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath()%>/js/highcharts/highcharts.js" type="text/javascript"></script>
    <style type="text/css">
    .divsize_scroll{overflow-y:scroll;height:112px;overflow-x:hidden}
    .divsize_scroll1{overflow-y:scroll;height:300px;overflow-x:hidden}
    .divsize2_scroll{overflow-y:scroll;height:400px;overflow-x:hidden}
    .divsize3_scroll{overflow-y:scroll;height:740px;overflow-x:hidden}
    .divsize{height:250px}
    .divsize2{height:400px}
    .divsize3{height:250px}
    </style>
    <script type="text/javascript">
    var tab = 1;
	$(document).ready(function() {
	tab = ${tabpage};
	//When page loads...
	//$("#tab_sbss1").show(); //Hide all content
	//$("ul.tab_sbss li:first").addClass("active").show(); //Activate first tab
	//$(".tab_content:first").show(); //Show first tab content
	if(tab == 1){
		$("#1").parent().addClass("active");
		$("#tab_sbss1").fadeIn();
	}else if(tab == 2){
		$("#2").parent().addClass("active");
		$("#tab_sbss2").fadeIn();
	}else if(tab == 3){
		$("#3").parent().addClass("active");
		$("#tab_sbss21").fadeIn();
	}else if(tab == 4){
		$("#4").parent().addClass("active");
		$("#tab_sbss3").fadeIn();
	}else if(tab == 5){
		$("#5").parent().addClass("active");
		$("#tab_sbss4").fadeIn();
	}else if(tab == 6){
		$("#6").parent().addClass("active");
		$("#tab_sbss5").fadeIn();
	}
	showTabPage();
	
	//On Click Event
	$("ul.tab_sbss li").click(function() {
		//$("ul.tab_sbss li").removeClass("active"); //Remove any "active" class
		//$(this).addClass("active"); //Add "active" class to selected tab
		//$(".tab_content").hide(); //Hide all tab content

		tab = $(this).find("a").attr("id");
		//var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		//$(activeTab).fadeIn(); //Fade in the active ID content
		window.location.href = '<%=basePath %>task/getNodeInfo?taskid=${taskid}&ip=${ip}&tabpage=' + tab ;
		//showTabPage();
		//return false;
	});

});
    </script>
    </head>

    <body>
<section id="main" class="column" style="width: 100%;">
  <article class="module width_full">
    <div class="clearfix"><h3 >设备实时采集信息展示 （IP：${ip}）</h3></div>
    <div style="background: none;">
      <ul class="tab_sbss clearfix">
        <li><a href="#tab_sbss1" id="1">基本信息</a></li>
        <li><a href="#tab_sbss2" id="2">网络信息</a></li>
        <li><a href="#tab_sbss21" id="3">流量信息</a></li>
        <li><a href="#tab_sbss3" id="4">TCP信息</a></li>
        <li><a href="#tab_sbss4" id="5">UDP信息</a></li>
        <li><a href="#tab_sbss5" id="6">进程信息</a></li>
      </ul>
      <div class="tab_container" style="margin:0px;">
        <div id="tab_sbss1" class="tab_content" style="display: none;">
          <div class="sbss_jbxx clearfix">
            <div class="sbss_jbxx1 divsize_scroll">
	            <table class="tablesorter_b border" cellspacing="0">
	              <thead><tr><th colspan="6">▼&nbsp;基本信息</th></tr></thead>
	              <tbody>
	                <tr><td width="300">系统描述</td><td width="50">主机名</td><td width="50">系统服务</td><td width="50">网络接口数量</td><td width="50">系统用户数</td><td width="50">系统运行进程数</td></tr>
	                <tr><td>${sysDescr}</td><td>${sysName}</td><td>${sysServices}</td><td>${ifNumber}</td><td>${hrSystemNumUsers}</td><td>${hrSystemProcesses}</td></tr>
	              </tbody>
	            </table>
            </div>
            <div class="sbss_jbxx2 divsize" style="float:right"><jsp:include page="../chart/speed.jsp" /></div>
            <div class="sbss_jbxx4 clearfix">
               <div class="sbss_jbxx5" style="height:130px;" id="cpu">
               </div>
               <div class="sbss_jbxx5" style="height:130px;" id="pm">
               </div>
               <div class="sbss_jbxx5" style="height:130px;" id="vm">
               </div>
            </div>
            <div class="sbss_jbxx3" id="hardinfo"></div>
          </div>
        </div>
        <div id="tab_sbss2" class="tab_content" style="display: none;">
          <div class="sbss_wlxx clearfix">
            <div class="divsize_scroll1 sbss_wlxx1">
            <table class="tablesorter_b border" cellspacing="0">
              <thead><tr><th colspan="4">▼&nbsp;IP地址</th></tr></thead>
              <tbody>
                <tr><td>IP地址</td><td>应用的接口的索引值</td><td>子网掩码</td><td>重组IP数据报分片的最大长度</td></tr>
                <c:forEach items="${ipAddrTable }" var="ip">
                	<tr><td>${ip.ipAdEntAddr }</td>
                		<td>${ip.ipAdEntIfIndex }</td>
                		<td>${ip.ipAdEntNetMask }</td>
                		<td>${ip.ipAdEntReasmMaxSize }</td></tr>
                </c:forEach>
              </tbody>
            </table>
            </div>
            <div class="sbss_wlxx1 divsize_scroll1" style="float:right;">
            <table class="tablesorter_b border" cellspacing="0" >
              <thead><tr><th colspan="6">▼&nbsp;接口信息</th></tr></thead>
              <tbody>
                <tr><td>接口索引</td><td>接口描述</td><td>接口类型</td><td>最大传输单元(bit/s)</td><td>当前带宽(bps)</td><td>状态</td></tr>
                <c:forEach items="${ifTable }" var="inter">
                	<tr><td width="50px;">${inter.ifIndex }</td>
                		<td width="250px;" style="word-break:break-all;">${inter.ifDescr }</td>
                		<td width="50px;">${inter.ifType }</td>
                		<td width="50px;">${inter.ifMtu }</td>
                		<td width="50px;">${inter.ifSpeed }</td>
                		<td width="50px;"> 
                		<c:if test="${inter.ifOperStatus == 1}">正常</c:if>
			                		<c:if test="${inter.ifOperStatus == 2}">故障</c:if>
			                		<c:if test="${inter.ifOperStatus == 3}">故障</c:if>
			                		<c:if test="${inter.ifOperStatus == 4}">未知</c:if>
			                		<c:if test="${inter.ifOperStatus == 5}">等待</c:if>
			                		<c:if test="${inter.ifOperStatus == 6}">无效</c:if>
			                		<c:if test="${inter.ifOperStatus == 7}">故障</c:if>
                		</td></tr> 
                </c:forEach>
              </tbody>
            </table>
            </div>
            <div class="clear"></div>
            <div class="sbss_wlxx1 divsize2_scroll">
            <table class="tablesorter_b border" cellspacing="0">
              <thead><tr><th colspan="6">▼&nbsp;路由表</th></tr></thead>
              <tbody>
                <tr><td>目的IP地址</td><td>本地接口的索引值</td><td>下一跳的IP地址</td><td>路由的类型</td><td>路由目的地子网掩码</td><!--<td>上次修正时间</td>  -->
                </tr>
                <c:forEach items="${ipRouteTable }" var="obj">
                	<tr><td width="50px;">${obj.ipRouteDest }</td>
                		<td width="50px;">${obj.ipRouteIfIndex }</td>
                		<td width="50px;">${obj.ipRouteNextHop }</td>
                		<td width="50px;">${obj.ipRouteType }</td>
                		<td width="50px;">${obj.ipRouteMask }</td>
                		<!--<td width="50px;">${obj.ipRouteAge }</td>  --></tr>
                </c:forEach>
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div id="tab_sbss21" class="tab_content" style="display: none;">
          <div class="sbss_wlxx clearfix">
            <div class="sbss_wlxx1 divsize3" id="wlxx_chart_s">
            </div>
            <div class="sbss_wlxx1 divsize3" style="float:right" id="wlxx_chart"></div>
            <div class="clear"></div>
            <div class="sbss_wlxx1 divsize3" id="wlxx_fscb">
            </div>
            <div class="sbss_wlxx1 divsize3" style="float:right" id="wlxx_jscb"></div>
            <div class="clear"></div>
            <div class="sbss_wlxx1 divsize3" id="wlxx_fsdb">
            </div>
            <div class="sbss_wlxx1 divsize3" style="float:right" id="wlxx_jsdb"></div>
            <div class="clear"></div>
          </div>
        </div>
        <div id="tab_sbss3" class="tab_content" style="display: none;">
          <div class="sbss_tcpxx clearfix">
            <div class="sbss_tcpxx1 divsize_scroll">
            <table class="tablesorter_b border" cellspacing="0">
              <thead><tr><th colspan="2">▼&nbsp;TCP信息</th></tr></thead>
              <tbody>
                <tr><td width="200">最大TCP连接数</td><td>动态设置</td></tr>
                <tr><td width="200">发送报文总数</td><td>${tcpOutSegs}</td></tr>
                <tr><td width="200">收到报文总数</td><td>${tcpInSegs}</td></tr>
                <tr><td width="200">接收错误报文总数</td><td>${tcpInErrs}</td></tr>
                <tr><td width="200">发送具有RST标志报文段总数</td><td>${tcpOutRsts}</td></tr>
              </tbody>
            </table>
            </div>
            <div class="sbss_tcpxx1 divsize_scroll" style="float:right;">
            <table class="tablesorter_b border" cellspacing="0">
              <thead><tr><th colspan="5">▼&nbsp;TCP连接表</th></tr></thead>
              <tbody>
                <tr><td>TCP连接状态</td><td>本地IP地址</td><td>本地端口</td><td>远端IP地址</td><td>远端端口</td></tr>
                <c:forEach items="${tcpConnTable }" var="obj">
                	<tr><td width="50px;">${obj.tcpConnState }</td>
                		<td width="50px;">${obj.tcpConnLocalAddress }</td>
                		<td width="50px;">${obj.tcpConnLocalPort }</td>
                		<td width="50px;">${obj.tcpConnRemAddress }</td>
                		<td width="50px;">${obj.tcpConnRemPort }</td></tr>
                </c:forEach>
              </tbody>
            </table>
            </div>
            <div class="clear"></div>
            <div class="sbss_udpxx4" id= "tcpPacket"></div>
          </div>
        </div>
        <div id="tab_sbss4" class="tab_content" style="display: none;">
          <div class="sbss_udpxx clearfix">
            <div class="sbss_udpxx1 divsize_scroll">
            <table class="tablesorter_b border" cellspacing="0">
              <thead><tr><th colspan="2">▼&nbsp;UDP信息</th></tr></thead>
              <tbody>
                <tr><td width="200">UDP输入报文统计</td><td>${udpInDatagrams }</td></tr>
                <tr><td width="200">在目的无接收的UDP数据包个数</td><td>${udpNoPorts }</td></tr>
                <tr><td width="200">丢弃的报文数</td><td>${udpInErrors }</td></tr>
                <tr><td width="200">数据包总数</td><td>${udpOutDatagrams }</td></tr>
              </tbody>
            </table>
            </div>
            <div class="sbss_udpxx1 divsize_scroll" style="float:right;">
            <table class="tablesorter_b border" cellspacing="0">
              <thead><tr><th colspan="5">▼&nbsp;UDP连接表</th></tr></thead>
              <tbody>
                <tr><td>本地IP地址</td><td>本地端口号</td></tr>
                <c:forEach items="${udpTable }" var="obj">
                	<tr><td width="50px;">${obj.udpLocalAddress }</td>
                		<td width="50px;">${obj.udpLocalPort }</td></td></tr>
                </c:forEach>
              </tbody>
            </table>
            </div>
            <div class="clear"></div>
            <div class="sbss_udpxx4" id = "udpPacket"></div>
            <div class="clear"></div>
          </div>
        </div>
        <div id="tab_sbss5" class="tab_content" style="display: none;">
          <div class="sbss_jcxx clearfix">
							<div class="sbss_jcxx1 divsize3_scroll">
								<table class="tablesorter_b border" cellspacing="0">
									<thead>
										<tr>
											<th colspan="7">▼&nbsp;运行进程列表</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td width="12%">运行程序名称</td>
											<td width="12%">cpu占用</td>
											<td width="12%">内存占用</td>
											<td width="25%">路径</td>
											<td width="15%">参数</td>
											<td width="12%">类型</td>
											<td width="12%">状态</td>
										</tr>
										<c:forEach items="${processTable }" var="obj">
											<tr>
												<td width="12%" style="word-break:break-all">${obj.hrSWRunName }</td>
												<c:if test="${processPerCPUTable!=null }">
													<c:forEach items="${processPerCPUTable }" var="obj1">
														<c:if test="${obj1.hrSWRunIndex==obj.hrSWRunIndex}">
															<td width="12%">${obj1.hrSWRunPerfCPU }</td>
														</c:if>
														<c:if test="${obj1.hrSWRunIndex==obj.hrSWRunIndex}">
															<td width="12%" style="word-break:break-all"><fmt:formatNumber
																	value="${obj1.hrSWRunPerfMem/1024 }"
																	pattern="#,###,###,###.##" />M</td>
														</c:if>
													</c:forEach>
												</c:if>
												<c:if test="${processPerCPUTable==null }">
													<td width="12%"></td>
													<td width="12%" style="word-break:break-all"></td>
												</c:if>
												
												<td width="25%" style="word-break:break-all">${obj.hrSWRunPath }</td>
												<td width="15%" style="word-break:break-all">${obj.hrSWRunParameters }</td>
												<td width="12%" style="word-break:break-all"><c:if
														test="${obj.hrSWRunType == 1}">未知类型</c:if> <c:if
														test="${obj.hrSWRunType == 2}">系统类型</c:if> <c:if
														test="${obj.hrSWRunType == 3}">设备驱动</c:if> <c:if
														test="${obj.hrSWRunType == 4}">应用类型</c:if>
												</td>
												<td width="12%" style="word-break:break-all"><c:if
														test="${obj.hrSWRunStatus == 1}">正在运行</c:if> <c:if
														test="${obj.hrSWRunStatus == 2}">可运行</c:if> <c:if
														test="${obj.hrSWRunStatus == 3}">不可运行</c:if> <c:if
														test="${obj.hrSWRunStatus == 4}">无效</c:if>
												</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
							<div class="sbss_jcxx2">
	            <div class="sbss_jcxx3 divsize_scroll1">
	            	<table class="tablesorter_b border" cellspacing="0">
		              <thead><tr><th colspan="5">▼&nbsp;设备列表</th></tr></thead>
		              <tbody>
		                <tr><td>设备类型</td><td>设备标识ID</td><td>设备描述</td><td>设备状态</td><td>设备错误信息</td></tr>
		                <c:forEach items="${deviceTable }" var="obj">
		                	<tr><td width="30px;" style="word-break:break-all">${obj.hrDeviceType }</td>
		                		<td width="40px;" style="word-break:break-all">${obj.hrDeviceID }</td>
		                		<td width="50px;" style="word-break:break-all">${obj.hrDeviceDescr }</td>
		                		<td width="50px;" style="word-break:break-all"> 
		                		    <c:if test="${obj.hrDeviceStatus == 1}">未知</c:if>
			                		<c:if test="${obj.hrDeviceStatus == 2}">运行</c:if>
			                		<c:if test="${obj.hrDeviceStatus == 3}">警告</c:if>
			                		<c:if test="${obj.hrDeviceStatus == 4}">测试</c:if>
			                		<c:if test="${obj.hrDeviceStatus == 5}">挂起</c:if>
		                		</td>
		                		
		                		<td width="50px;" style="word-break:break-all">${obj.hrDeviceErrors }</td></tr>
		                </c:forEach>
		              </tbody>
		            </table>
	            </div>
	            <!-- <div class="sbss_jcxx3 divsize2_scroll">
	            	<table class="tablesorter_b border" cellspacing="0">
		              <thead><tr><th colspan="5">▼&nbsp;安装程序表</th></tr></thead>
		              <tbody>
		                <tr><td>安装程序ID</td><td>安装程序名称</td><td>安装程序类型</td><td>安装日期</td></tr>
		                 <c:forEach items="${installedTable }" var="obj">
		                	<tr><td width="20px;" style="word-break:break-all">${obj.hrSWInstalledID }</td>
		                		<td width="70px;" style="word-break:break-all">${obj.hrSWInstalledName }</td>
		                		
		                		<td width="30px;" style="word-break:break-all"><c:if
														test="${obj.hrSWInstalledType == 1}">未知类型</c:if> <c:if
														test="${obj.hrSWInstalledType == 2}">系统类型</c:if> <c:if
														test="${obj.hrSWInstalledType == 3}">设备驱动</c:if> <c:if
														test="${obj.hrSWInstalledType == 4}">应用类型</c:if></td>
		                		<td width="50px;" style="word-break:break-all">${obj.hrSWInstalledDate }</td></tr>
		                </c:forEach>
		              </tbody>
		            </table>
	            </div> -->
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
          
      <!-- end of .tab_container --> 
    </div>
    <footer>
      <div class="submit_link"> <!--<a href="场景回溯.html"><input type="submit" value="上一步" class="alt_btn1"></a>&nbsp;--><a href="#"><input type="button" value="关闭" onclick="javascript:window.close();"></a>
      </div>
    </footer>
  </article>
</section>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<script>
	var cpuUsed_ = 0;
	var pmUsed_ = 0;
	var vmUsed_ = 0;
    function showTabPage(){
    	if(tab == 1){
	        //条形图
	        $('#hardinfo').highcharts({                                           
	            chart: {                                                           
	                type: 'bar'                                                    
	            },                                                                 
	            title: {                                                           
	                text: '硬盘使用情况'                    
	            },                                                                 
	            subtitle: {                                                        
	                text: ''                                  
	            },                                                                 
	            xAxis: {                                                           
	                categories: [${hardFlag}],
	                title: {                                                       
	                    text: null                                                 
	                }                                                              
	            },                                                                 
	            yAxis: {                                                           
	                min: 0,                                                        
	                title: {                                                       
	                    text: 'size (G)',                             
	                    align: 'high'                                              
	                },                                                             
	                labels: {                                                      
	                    overflow: 'justify'                                        
	                }                                                              
	            },                                                                 
	            tooltip: {                                                         
	                valueSuffix: ' G'                                       
	            },                                                                 
	            plotOptions: {                                                     
	                bar: {                                                         
	                    dataLabels: {                                              
	                        enabled: true                                          
	                    }                                                          
	                }                                                              
	            },                                                                 
	            legend: {                                                          
	                layout: 'vertical',                                            
	                align: 'right',                                                
	                verticalAlign: 'top',                                          
	                x: -40,                                                        
	                y: 100,                                                        
	                floating: true,                                                
	                borderWidth: 1,                                                
	                backgroundColor: '#FFFFFF',                                    
	                shadow: true                                                   
	            },                                                                 
	            credits: {                                                         
	                enabled: false                                                 
	            },                                                                 
	            series: [/**{                                                         
	                name: '剩余大小',                                             
	                data: [107, 31, 635, 203, 2]                                   
	            }, */{                                                               
	                name: '使用大小',                                             
	                data: [${hardUsed}]                                  
	            }, {                                                               
	                name: '总大小',                                             
	                data: [${hardStatic}]                                
	            }]                                                                 
	        });
        
	        //cpu
	        Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#cpu').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 10,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetCpuUserd();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '总CPU使用率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: 'cpu当前值',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
            
	            //内存
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#pm').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetPMemoryUsed();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '物理内存使用率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '物理内存使用比',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	            
	            //虚拟内存
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#vm').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetVMemoryUsed();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '虚拟内存使用率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '虚拟内存使用比',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	       }//tab = 1
           else if(tab == 3){ 
	            //流量1
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#wlxx_chart').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetOctsUserd();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '接收流量情况'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: 'Bps'
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '流量',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	            
	            //流量2
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#wlxx_chart_s').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetOctsSendUserd();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '发送流量情况'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: 'Bps'
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '流量',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	            
	            //发送错包率
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#wlxx_fscb').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetFscbUserd();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '发送错包率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '流量',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	            
	            //接收错包率
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#wlxx_jscb').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetJscbUserd();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '接收错包率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '流量',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	            
	            //发送丢包率
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#wlxx_fsdb').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetFsdbUserd();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '发送丢包率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '流量',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
	            
	            //接收丢包率
	            Highcharts.setOptions({
	                global: {
	                    useUTC: false
	                }
	            });
	
	            var chart;
	            $('#wlxx_jsdb').highcharts({
	                chart: {
	                    type: 'spline',
	                    animation: Highcharts.svg, // don't animate in old IE
	                    marginRight: 1,
	                    events: {
	                        load: function () {
	
	// set up the updating of the chart each second
	                            var series = this.series[0];
	                            setInterval(function () {
	                                var x = (new Date()).getTime(), // current time
	                                        y = ajaxGetJsdbUserd();//Math.random();
	                                series.addPoint([x, y], true, true);
	                            }, 5000); //取值频率
	                        }
	                    }
	                },
	                title: {
	                    text: '接收丢包率'
	                },
	                xAxis: {
	                    type: 'datetime',
	                    tickPixelInterval: 120 //
	                },
	                yAxis: {
	                    title: {
	                        text: ''
	                    },
	                    plotLines: [
	                        {
	                            value: 0,
	                            width: 1,
	                            color: '#808080'
	                        }
	                    ]
	                },
	                tooltip: {
	                    formatter: function () { //数据点的显示串
	                        return '<b>' + this.series.name + '</b><br/>' +
	                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                                Highcharts.numberFormat(this.y, 2);
	                    }
	                },
	                legend: {
	                    enabled: false
	                },
	                exporting: {
	                    enabled: false
	                },
	                series: [
	                    {
	                        name: '流量',
	                        data: (function () {
	// generate an array of random data
	                            var data = [],
	                                    time = (new Date()).getTime(),
	                                    i;
	
	                            for (i = -19; i <= 0; i++) {
	                                data.push({
	                                    x: time + i * 5000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
	                                    y: 0
	                                });
	                            }
	                            return data;
	                        })()
	                    }
	                ]
	            });
		    }//tab = 3
		    else if(tab == 4){
			    //tab3
			    $('#tcpPacket').highcharts({
			    	chart:{height:400, width:1447},
			        title: {
			            text: 'tcp数据包情况',
			            x: -20 //center
			        },
			        xAxis: {
			            categories: [${time}]
			        },
			        yAxis: {
			            title: {
			                text: 'byte'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: 'byte'
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        },
			        series: [{
			            name: '发送报文总数',
			            data: [${tcp_2}]
			        }, {
			            name: '接收报文总数',
			            data: [${tcp_1}]
			        }, {
			            name: '接收错误报文总数',
			            data: [${tcp_3}]
			        }, {
			            name: '具有RST标志报文总数',
			            data: [${tcp_4}]
			        }]
			    });
		    }//tab = 4
		    else if(tab == 5){
			    //tab4
			    $('#udpPacket').highcharts({
			        chart:{height:400, width:1447},
			        title: {
			            text: 'udp数据包情况',
			            x: -20 //center
			        },
			        xAxis: {
			            categories: [${time}]
			        },
			        yAxis: {
			            title: {
			                text: 'byte'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: 'byte'
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
			            borderWidth: 0
			        },
			        series: [{
			            name: '输入报文数',
			            data: [${udp_1}]
			        }, {
			            name: '无接收数据包数',
			            data: [${udp_2}]
			        }, {
			            name: '丢弃报文数',
			            data: [${udp_3}]
			        }, {
			            name: '数据包总数',
			            data: [${udp_4}]
			        }]
			    });
		     }//tab = 5
		     
     }
        
   	//ajax获取物理内存使用率
   	function ajaxGetPMemoryUsed(){
   	    var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"64"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.pmUsed;
            }
       	});
       	pmUsed_ = mUsed;
   		return mUsed;//Math.random();
   	}
   	
   	//ajax获取虚拟内存使用率
   	function ajaxGetVMemoryUsed(){
   	    var vUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"65"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                vUsed = result.vmUsed;
            }
       	});
       	vmUsed_ = vUsed;
   		return vUsed;//Math.random();
   	}
   	
   	//ajax获取cpu使用率
   	function ajaxGetCpuUserd(){
   	    var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"60"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.cpuUsed;
            }
       	});
       	cpuUsed_ = mUsed;
   		return mUsed;//Math.random();
   	}
   	
   	//ajax获取流量
   	function ajaxGetOctsUserd(){
   	    var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"104"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.octsUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	//ajax获取流量
   	function ajaxGetOctsSendUserd(){
   	    var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"105"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.octsSendUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	function ajaxGetJsdbUserd(){
   		var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"100"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.jsdbUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	function ajaxGetFsdbUserd(){
   		var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"101"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.fsdbUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	function ajaxGetJscbUserd(){
   		var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"102"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.jscbUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
   	
   	function ajaxGetFscbUserd(){
   		var mUsed = "";
   		$.ajax({
            url : 'getUserd',
            data:{"ip":'${ip }',"task_id":'${taskid}',"gather_id":"103"},
            type : 'post',
            async: false,//同步
            dataType:"json",
            success : function(data) {
                var result = eval(data);
                mUsed = result.fscbUsed;
            }
       	});
   		return mUsed;//Math.random();
   	}
</script>	
</body>
</html>