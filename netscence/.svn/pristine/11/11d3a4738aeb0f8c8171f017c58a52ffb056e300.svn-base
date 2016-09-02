"use strict";

var playAxis = function () {
    
    var _width = 0,
        _height = 110,
        _start = 0,                 //坐标轴起始位置
        _end = 0;                   //坐标轴结束位置
    
    var _svg = {},
        _scale = {},
        _date = new Date(),
        _speedLevel = 1,
        _speed = 0.5,
        _startTime = new Date(),    //开始时间，默认当前时间
        _endTime = new Date(),      //结束时间，默认当前时间
        _marks = [],                //事件数组
        _callBack = {};             //回调函数
   
    function playAxis(svg){
        
        svg.each(function(){
            
            _svg = d3.select(this)
                .attr("height",_height);
           
            _width = svg.attr("width");
            _start = _width * 0.05;
            _end = _width * 0.9;
            
            //坐标轴比例尺
            _scale = d3.time.scale()
                .domain([_startTime ,_endTime])
                .range([_start, _end]);
            
            //初始化标记在坐标轴上的位置
            _marks.map(function(d){
                if("string" === typeof d.time){
                    d.time = new Date(d.time);
                }
                d.x = _scale(d.time);
            });
            
            var g = _svg.append("g")
                .attr("transform","translate("+[0,20]+")");
            
            //绘画坐标轴
            g.append("g")
                .attr("class","axis")
                .call(render.axis);
            
            //播放进度条
            g.append("g")
                .attr("class","progress")
                .call(render.progress);
                
            //在坐标轴上标记事件点
            g.append("g")
                .attr("class","marks")
                .style("cursor", "hand")
                .call(render.marks);
            
            //绘画进度按钮
            g.append("g")
                .attr("class","progress")
                .call(render.progressBtn);
            
            //绘画播放按钮
//            g.append("g")
//                .attr("class","palyBtn")
//                .attr("transform","translate("+(_end + 20) +",0)")
//                .style("cursor", "hand")
//                .call(render.playBtn);
            
        })
    };
    //==============================绘画播放轴========================================
    //时间格式化方法
    Date.prototype.format =function(format)
    {
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }
    var render = {};
    //绘画坐标轴
    render.axis = function(g){
    		var format = d3.time.format("%Y-%m-%d %H:%M:%S");
        //坐标轴    
        var xAxis = d3.svg.axis()
            .scale(_scale)
            .orient("bottom")
            .tickSize(14,0)
            .tickPadding(10)
            .tickFormat(format);
        //绘画坐标轴
        g.call(xAxis);
        //点击事件
        g.on("click",function(){
            var x = d3.mouse(this)[0];
            _callBack(_scale.invert(x));
            event.moveTo(x);
        });
        
        //设置坐标轴样式
        g.selectAll("path")
            .attr("stroke","rgb(85,85,85)")
            .attr("stroke-width",20)
            .style("shape-rendering","crispEdges");

        g.selectAll(".tick line")
            .attr("stroke","rgb(85,85,85)")
            .attr("stroke-width",1)
            .style("shape-rendering","crispEdges");

        if((new Date(_endTime).getTime()-new Date(_startTime.getTime()))<(1000*24*3600)){
            g.selectAll(".tick text")
                .style("font","12px 微软雅黑")
                .text(function(d){
                    return new Date(d).format("yyyy-MM-dd hh:mm:ss").substring(11,16);
                })
        }else{
            g.selectAll(".tick text")
                .style("font","12px 微软雅黑")
                .text(function(d){
                    return new Date(d).format("yyyy-MM-dd hh:mm:ss").substring(5,10);
                })
                .append("tspan")
                .text(function(d){
                    return new Date(d).format("yyyy-MM-dd hh:mm:ss").substring(11,16);
                })
                .attr("dx",-33)
                .attr("dy",15);
        }
    };
    
    //在坐标轴上标记事件点
    render.marks = function(g){
        g.selectAll("line")
            .data(_marks)
            .enter()
            .append("line")
            .attr("x1",function(d){ return d.x;})
            .attr("x2",function(d){ return d.x + 3;})
            .attr("stroke","rgb(255,255,255)")
            .attr("stroke-width",15)
            .on("click",function(d){
                var x = d3.mouse(this)[0];
                _callBack(d.time);
                event.moveTo(x);
            })
            .on("mouseover",function(d,i){
                var coo = d3.mouse(this);
                var time = _marks[i].time.format("yyyy-MM-dd hh:mm:ss");
                var g = _svg.append("g")
                    .attr("class","tooltip")
                    .attr("transform","translate("+coo+")");
                g.append("rect")
                    .attr("x",20)
                    .attr("y",10)
                    .attr("rx",10)
                    .attr("ry",10)
                    .attr("width",250)
                    .attr("height",100)
                    .attr("fill","rgba(85,85,85,0.5)");
                    g.append("text")
                    .text("IP:"+_marks[i].ip)
                    .attr("fill","White")
                    .attr("dx",40)
                    .attr("dy",30)
                    .append("tspan")
                    .text("触发时间:"+time)
                    .attr("fill","White")
                    .attr("dx",-94)
                    .attr("dy",15)
                    .append("tspan")
                    .text("触发条件:"+((_marks[i].condition).split(":"))[0])
                    .attr("fill","White")
                    .attr("dx",-169)
                    .attr("dy",15)
                    .append("tspan")
                    .text(((_marks[i].condition).split(":"))[1])
                    .attr("fill","White")
                    .attr("dy",15)
                    .attr("dx",-158);
            })
            .on("mouseout",event.mouseout);
    };
    
    render.progress = function(g){
        g.append("line")
            .attr("x1",_start)
            .attr("x2",_start)
            .attr("stroke","rgb(0,128,200)")
            .attr("stroke-width",20)
            .on("click",function(){
                var x = d3.mouse(this)[0];
                _callBack(_scale.invert(x));
                event.moveTo(x);
            });
    };

    //绘画播放进度按钮
    render.progressBtn = function(g){
        //定义放射性渐变
        var grad = _svg.append("defs")
            .append("radialGradient")
            .attr("id","grey")
            .attr("cx","100%")
            .attr("cy","100%")
            .attr("r","100%")
            .attr("fx","100%")
            .attr("fy","100%");
        grad.append("stop")
            .attr("offset","0%")
            .style("stop-color","rgb(215,215,215)")
            .style("stop-opacity",1);
        grad.append("stop")
            .attr("offset","100%")
            .style("stop-color","rgb(250,250,250)")
            .style("stop-opacity",1);
        
        var drag = d3.behavior.drag()
            .on("drag", function(){
                var dx = d3.event.dx;
                event.move(dx,false);
            })
            .on("dragend", function(){
                var progressBtn = d3.select(".progress circle");
                var cx = parseFloat(progressBtn.attr("cx"));
                _callBack(_scale.invert(cx));
            });
        
        //绘画进度按钮
        g.append("circle")
            .attr("r",14)
            .attr("cx",_start)
            .attr("stroke","rgb(0,128,200)")
            .attr("stroke-width",3)
            .style("fill","url(#grey)")
            .style("cursor", "move")
            .call(drag);
    };
    
    //播放按钮
//    render.playBtn = function(g){
//        //播放按钮
//        g.on("click",event.playBtnClick);
//        g.append("polygon")
//            .attr("points","-6,-10 -6,10 14,0")
//            .attr("fill","rgb(0,128,200)");
//    }
    
    //======================================交互事件=======================================
    var event = {};
    event.mouseover = function(d,i){
        var coo = d3.mouse(this);
        
        var g = _svg.append("g")
            .attr("class","tooltip")
            .attr("transform","translate("+coo+")");
        g.append("rect")
            .attr("x",20)
            .attr("y",10)
            .attr("rx",10)
            .attr("ry",10)
            .attr("width",250)
            .attr("height",100)
            .attr("fill","rgba(85,85,85,0.5)");
            g.append("text")
            .text("名称:实验场景记录信息11")
            .attr("fill","White")
            .attr("dx",30)
            .attr("dy",30)
            .append("tspan")
            .text("IP:192.168.2.137")
            .attr("fill","White")
            .attr("dx",-130)
            .attr("dy",15)
            .append("tspan")
            .text("触发条件:trigger condition:")
            .attr("fill","White")
            .attr("dx",-100)
            .attr("dy",15)
            .append("tspan")
            .text("bigger than 0.60 of 60 which is 0.87")
            .attr("fill","White")
            .attr("dy",15)
            .attr("dx",-150);
    };
    
    event.mouseout = function(){
        _svg.select(".tooltip")
            .remove();
    };
    
    //点击播放按钮事件
    var state = 0,
        interval = {};
    event.playBtnClick = function(){
//        var playG = d3.select(this);
        
        if(state){
            pause();
        }
        else{
            play();
        }
        
        function play(){
             //改变按钮形状
//            playG.append("line")
//                .attr("x1","-5")
//                .attr("x2","1")
//                .attr("stroke","rgb(0,128,200)")
//                .attr("stroke-width",20);
//
//            playG.append("line")
//                .attr("x1","6")
//                .attr("x2","12")
//                .attr("stroke","rgb(0,128,200)")
//                .attr("stroke-width",20);
            
//            playG.selectAll("polygon").remove();
            state = 1;
            interval = setInterval(function(){
                //如果已经移动至播放轴尾部，调用暂停方法
                if(event.move(_speed*_speedLevel,true)){
                    event.moveTo(_start);
                    pause();
                }
            },100);
        }
        
        function pause(){
            //改变按钮形状
//            playG.append("polygon")
//                .attr("points","-6,-10 -6,10 14,0")
//                .attr("fill","rgb(0,128,200)");
//            playG.selectAll("line").remove();
            state = 0;
            clearInterval(interval);
        }
        
    }
    
    
    //移至事件
    event.moveTo = function(x){
        var progressBtn = d3.select(".progress circle"),
            progress = _svg.select(".progress line");
        //限制播放进度按钮移动区域
        x = x > _end ? _end : ( x < _start ? _start : x);
        progressBtn.attr("cx",x);
        progress.attr("x2",x);
    };
    //移动事件
    event.move = function(dx,isCallBack){
        var progressBtn = d3.select(".progress circle"),
            progress = _svg.select(".progress line");
        var cx = parseFloat(progressBtn.attr("cx"));
        //是否移动至播放轴尾部
        var isEnd = cx + dx > _end ? 1 : 0;
        //限制播放进度按钮移动区域
        dx = cx + dx > _end ? _end - cx : (cx + dx < _start ? _start - cx : dx );
        //调用回调函数
        if(isCallBack){
            _callBack(_scale.invert(cx),_scale.invert(cx+dx));
        }
        progressBtn.attr("cx",cx + dx);
        progress.attr("x2",cx + dx);
        return isEnd;
    };
    //供调用的改变播放轴播放速度的方法
    playAxis.changeSpeed = function(level){
    	_speedLevel = level;
//    	event.playBtnClick();
    };
    
    playAxis.startTime = function(x) {
        if (!arguments.length){
            return _startTime;
        }
        
        if("string" === typeof x){
            _startTime = new Date(x);
        }
        else{
            _startTime = x;
        }
        return playAxis;
    };
     
    playAxis.endTime = function(x) {
        if (!arguments.length){
            return _endTime;
        } 
        
        if("string" === typeof x){
            _endTime = new Date(x);
        }
        else{
            _endTime = x;
        }
        return playAxis;
    };
    
    playAxis.marks = function(x) {
        if (!arguments.length){
            return _marks;
        } 
        _marks = x;
        return playAxis;
    };
    
    playAxis.callBack = function(x) {
        if (!arguments.length){
            return _callBack;
        } 
        _callBack = x;
        return playAxis;
    };
    playAxis.playNow = function(x) {
        event.playBtnClick();
    };
    
    
    return playAxis;
    
}