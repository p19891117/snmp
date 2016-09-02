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
     //条形图
        $('#container02').highcharts({                                           
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
    </script>
	</head>
	<body>    
		
	</body>
</html>
