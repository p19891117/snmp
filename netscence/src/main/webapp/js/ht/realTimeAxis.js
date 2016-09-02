"use strict";
var realTimeAxis = function () {
    
    var _start = 0,                 //坐标轴起始位置
        _end = 0;                   //坐标轴结束位置
    
    var _startTime,                 //开始时间，默认当前时间
        _endTime,                   //结束时间，默认当前时间
        _marks = [],                //标记数组
        _state = 1;                 //实验状态 1:创建  2:正在进行 3:暂停  4: 已完成 
    
    var _svg = {},                  //svg
        _scale,                //比例尺                
        _xAxis = {},                //坐标轴
        _hasEndTime = 0;            //是否设置了结束时间   
    
   
    function realTimeAxis(svg){
        svg.each(function(){
            
            _svg = d3.select(this)
                .attr("height",110);
            
            var width = svg.attr("width");
            _start = width * 0.05;
            _end = width * 0.95;
            
            //判断是否设置了结束时间
            _hasEndTime = _endTime ? 1 : 0; 
            
            //实验未开始
            if(_state === 1){
                //如果未设置结束时间，初始化结束时间
                _endTime = _hasEndTime ? _endTime : _startTime;
            }
            //实验正在进行
            if(_state === 2){
                //如果未设置结束时间
                _endTime = _hasEndTime ? _endTime : new Date();
            }
            
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
            
            if(_state != 1){
                //播放进度条
                g.append("g")
                    .attr("class","progress")
                    .call(render.progress);
            }
            
            //在坐标轴上标记事件点
            g.append("g")
                .attr("class","marks")
                .style("cursor", "hand")
                .call(render.marks);
        });
    };
    
    //==============================绘画播放轴========================================
    var render = {};
    //绘画坐标轴
    render.axis = function(g){
        //坐标轴    
        _xAxis = d3.svg.axis()
            .scale(_scale)
            .orient("bottom")
            .tickSize(14,0)
            .tickPadding(10);
        //绘画坐标轴
        g.call(_xAxis);
        
        //设置坐标轴样式
        g.selectAll("path")
            .attr("stroke","rgb(85,85,85)")
            .attr("stroke-width",20)
            .style("shape-rendering","crispEdges");

        g.selectAll(".tick line")
            .attr("stroke","rgb(85,85,85)")
            .attr("stroke-width",1)
            .style("shape-rendering","crispEdges");

        g.selectAll(".tick text")
            .style("font","12px 微软雅黑");
    };
    
    //在坐标轴上标记事件点
    render.marks = function(g){
        
        g.selectAll("line")
            .data(_marks)
            .enter()
            .append("line")
            .attr("x1",function(d){ return d.x })
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
                    .text("触发条件:"+((_marks[i].condition).split(":"))[0])
                    .attr("fill","White")
                    .attr("dx",-100)
                    .attr("dy",15)
                    .append("tspan")
                    .text(((_marks[i].condition).split(":"))[1])
                    .attr("fill","White")
                    .attr("dy",15)
                    .attr("dx",-150);
            })
            .on("mouseout",event.mouseout);
    };
    
    //绘画进度条
    render.progress = function(g){
        //进度条结束位置
        var x2 = _start;
        //初始化进度条结束位置
        //正在进行状态
        x2 = _state === 4 ? _end : ( _hasEndTime ? _scale(new Date()) : _end ); 
        
        var progress = g.append("line")
            .attr("x1",_start)
            .attr("stroke","rgb(0,128,200)")
            .attr("stroke-width",20)
            .attr("x2",_start);

        progress.transition()
            .duration(2000)
            .attr("x2",x2);
        
        if(_state === 4 ){
            return;
        }
        
        var interval = {};
        if(_hasEndTime) {
            //每移动0.1个像素点需要的时间
            var span = (_endTime.getTime() - new Date().getTime())/((_end - x2)*10);
            interval = setInterval(function(){
                var x = parseFloat(progress.attr("x2"));
                if(x + 0.1 > _end){
                    progress.attr("x2",_end);
                    clearInterval(interval);
                }
                else{
                    progress.attr("x2",x + 0.1);
                }
            },span);
        }
        else {
            //未设置结束时间，压缩坐标轴
            interval = setInterval(function(){
                _scale.domain([_startTime,new Date()]);
                _xAxis.scale(_scale);
                //更新坐标轴
                var axisG =  _svg.select(".axis");
                axisG.call(_xAxis);
                axisG.selectAll("path")
                    .attr("stroke","rgb(85,85,85)")
                    .attr("stroke-width",20)
                    .style("shape-rendering","crispEdges");
                axisG.selectAll(".tick line")
                    .attr("stroke","rgb(85,85,85)")
                    .attr("stroke-width",1)
                    .style("shape-rendering","crispEdges");
                axisG.selectAll(".tick text")
                    .style("font","12px 微软雅黑");
                
                _marks.map(function(d){
                    d.x = _scale(d.time);
                });
                
                //更新标记点位置
                var marksG = _svg.select(".marks");
                marksG.selectAll("line")
                    .attr("x1",function(d){ return d.x;})
                    .attr("x2",function(d){ return d.x + 3;});
            },1000);
        }
    };
    
    
     //======================================交互事件=======================================
    var event = {};
    event.mouseover = function(){
        var coo = d3.mouse(this);
        var g = _svg.append("g")
            .attr("class","tooltip")
            .attr("transform","translate("+coo+")");
        g.append("rect")
            .attr("x",20)
            .attr("y",0)
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
    
    //=========================================用户接口================================
    //添加标记点
    realTimeAxis.addMark = function(d){
        if(!arguments.length) {
            return;
        }
        if("string" === typeof d.time){
            d.time = new Date(d.time);
        }
        d.x = _scale(d.time);
        _marks.push(d);
        _svg.select(".marks").call(render.marks);
    }
    
    realTimeAxis.startTime = function(x) {
        if (!arguments.length){
            return _startTime;
        }
        //类型转换
        _startTime = "string" === typeof x ? new Date(x) : x
        return realTimeAxis;
    };
     
    realTimeAxis.endTime = function(x) {
        if (!arguments.length){
            return _endTime;
        }
        //类型转换
        _endTime = "string" === typeof x ? new Date(x) : x
        return realTimeAxis;
    };
    
    realTimeAxis.marks = function(x) {
        if (!arguments.length){
            return _marks;
        } 
        _marks = x;
        return realTimeAxis;
    };
    
    realTimeAxis.state = function(x) {
        if (!arguments.length){
            return _state;
        }
        //类型转换
        _state = "string" === typeof x ? parseInt(x) : x
        return realTimeAxis;
    };    
    
    return realTimeAxis;
    
}