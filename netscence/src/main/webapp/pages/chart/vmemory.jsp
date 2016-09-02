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
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="article" id="articlelink" content="/technology/javascript/20120823-gauge-justgage-js/" />
    <style>
    </style>
    
    <script>
    //动态曲线图-虚拟内存使用
    	$(document).ready(function () {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            var chart;
            $('#container08').highcharts({
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
                            }, 3000); //取值频率
                        }
                    }
                },
                title: {
                    text: '虚拟内存使用率'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150 //
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
                                this.x + '<br/>' +
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

                            for (i = -100; i <= 0; i++) {
                                data.push({
                                    x: time + i * 1000,//Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (time + i * 1000)),//
                                    y: 0
                                });
                            }
                            return data;
                        })()
                    }
                ]
            });
        });
    </script>
	</head>
	<body>    
		
	</body>
</html>
