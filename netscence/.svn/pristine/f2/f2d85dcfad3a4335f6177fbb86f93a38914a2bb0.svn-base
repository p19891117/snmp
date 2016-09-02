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
    <title>JustGage Demo By GBin1.com</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="article" id="articlelink" content="/technology/javascript/20120823-gauge-justgage-js/" />
    <style>
      body {
        text-align: left;
		font-family: Arial;
      }
      
      #g1 {
        algin=left;
        width:190px; height:156px;
        display: inline-block;
        margin-left: 5em;
		border: 1px soild #202020;
		border-radius: 8px;
		float:left;
      }
      
     /*  #g2 {
        algin=left;
        width:200px; height:150px;
        display: inline-block;
        margin: 1em;
		border: 1px soild #202020;
		margin-top: 70px;
		border-radius: 8px;
      } */
      #g3 {
        algin=left;
        width:200px; height:156px;
        display: inline-block;
        margin-left: 15em;
		border: 1px soild #202020;
		border-radius: 8px;
		float:left;
      }
      p {
        display: block;
        width: 400px;
        margin: 2em auto;
        text-align: center;
		border-top: 1px soild #CCC;
		border-bottom: 1px soild #CCC;
		background: #333333;
		padding:10px 0px;
		color: #CCC;
		text-shadow: 1px 1px 25px #000000;
		border-radius: 0px 0px 5px 5px;
		box-shadow: 0px 0px 10px #202020;
      }
    </style>
    
    <script src="<%=request.getContextPath()%>/js/gagejs/raphael.2.1.0.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/gagejs/justgage.1.0.1.min.js"></script>
    <script>
      var g1,g3;
     
      window.onload = function(){
        var g1 = new JustGage({
          id: "g1", 
          value: getRandomInt(0, 0), 
          min: 0,
          max: 100,
          title: "CPU使用率",
          label: "%",
			levelColors: [
			  "#222222",
			  "#555555",
			  "#CCCCCC"
			]    
        });
      /*  var g2 = new JustGage({
          id: "g2", 
          value: getRandomInt(0, 0), 
          min: 0,
          max: 100,
          title: "物理内存使用率",
          label: "%",
			levelColors: [
			  "#222222",
			  "#555555",
			  "#CCCCCC"
			]    
        }); */
      
       var g3 = new JustGage({
          id: "g3", 
          value: getRandomInt(0, 0), 
          min: 0,
          max: 100,
          title: "虚拟内存使用率",
          label: "%",
			levelColors: [
			  "#222222",
			  "#555555",
			  "#CCCCCC"
			]    
        });
        setInterval(function() {
          g1.refresh(changeTwoDecimal(cpuUsed_*100));
        }, 3000);
      /*   setInterval(function() {
          g2.refresh(changeTwoDecimal(pmUsed_*100));
        }, 3000); */
        setInterval(function() {
          g3.refresh(changeTwoDecimal(vmUsed_*100));
        }, 3000);
          
      };
      
      changeTwoDecimal= function changeTwoDecimal(floatvar)
	 {
	 var f_x = parseFloat(floatvar);
	 if (isNaN(f_x))
	 {
	    //alert('function:changeTwoDecimal->parameter error');
	    return 0;
	}
	    var f_x = Math.round(floatvar*100)/100;
	    return f_x;
	}
    </script>
	</head>
	<body>    
		<div id="g1"></div>
		<!-- <div id="g2"></div> -->
		<div id="g3"></div>
	</body>
</html>
