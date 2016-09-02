"use strict";
var component = {}

component.arcAxis = function(){
    
    var _scale = d3.scale.linear(),        //弧形坐标轴比例尺
        _orient = "in";                    //坐标轴刻度方向，支持 in | out
    
    var _radius = 100,                     //半径
        _arcWidth = 2,                     //弧线宽度
        _ticks = 10,                       //坐标轴大刻度数
        _tickSize = 20,                    //坐标轴大刻度长度
        _subTicks = 10,                    //坐标轴小刻度数
        _subTickSize = 15;                 //坐标轴小刻度长度
    
    var _arcs = [],
        _tick = [],
        _subTick = [],
        _lable = [];
        
    function arcAxis(g){
        
        //数据初始化处理，生成绘图数据
        init();
        
        //绘画坐标轴弧线
        var arc = d3.svg.arc()
            .outerRadius(_radius)
            .innerRadius(_radius - _arcWidth);
               g.append("g")
            .attr("class","arcs")
            .selectAll("path")
            .data(_arcs)
            .enter()
            .append("path")
            .attr("d",function(d){
                return arc(d);
            });
        
        
        //绘画坐标轴大刻度线
        var x2 = _orient === "out" ? 0 - _tickSize : _tickSize,
            translate = _orient === "out" ? _arcWidth - _radius : 0 - _radius;
        g.append("g")
            .attr("class","ticks")
            .selectAll("line")
            .data(_tick)
            .enter()
            .append("line")
            .attr("x2",x2)
            .style("stroke","rgb(0,0,0)")
            .style("stroke-width",1)
            .attr("transform",function(d){
                return "rotate("+d.rotate+")translate("+translate+")";
            });
        
        
        //绘画坐标轴小刻度线
        var subX2 = _orient === "out" ? 0 - _subTickSize : _subTickSize,
            subTranslate = _orient === "out" ? _arcWidth - _radius : 0 - _radius;
        g.append("g")
            .attr("class","subTicks")
            .selectAll("line")
            .data(_subTick)
            .enter()
            .append("line")
            .attr("x2",subX2)
            .style("stroke","rgb(0,0,0)")
            .style("stroke-width",1)
            .attr("transform",function(d){
                return "rotate("+d.rotate+")translate("+subTranslate+")";
            });
        
 
        g.append("g")
            .attr("class","labels")
            .selectAll(".label")
            .data(_lable)
            .enter()
            .append("text")
            .text(function(d){ return d.text;})
            .attr('x', function(d){  return d.x; })
            .attr('y', function(d){  return d.y; })
            .attr("text-anchor","middle")    
            .attr("dominant-baseline","middle");  //垂直居中
    }
    
    
    function init(){
        var domain = _scale.domain(),            //定义域
            range = _scale.range();              //值域
        
        var startAngle = range[0],              //起始角度
            endAngle = range[range.length -1];  //结束角度
        
        var min = domain[0],                    //最小值
            max = domain[domain.length -1];     //最大值
        
        //坐标轴弧线数据初始化
        var pre = (range[0] - 90)/180 * Math.PI;
        for(var i = 1;i < range.length; i++){
            var end = (range[i] -90)/180 * Math.PI;
            _arcs.push({startAngle: pre,endAngle: end});
            pre = end;
        }
        
        //坐标轴大刻度数据初始化
        for(var i = 0; i <= _ticks; i++){
            _tick.push({
                rotate: (endAngle - startAngle)/_ticks * i + startAngle,
            });
        }
        
        //坐标轴小刻度数据初始化
        for(var i = 0; i < _ticks; i++){
            for(var j = 1; j < _subTicks; j++){
                _subTick.push({
                    rotate:(endAngle - startAngle)/(_ticks * _subTicks) * (i * _subTicks + j) + startAngle
                });
            }
        };
    
        //坐标轴标签文字
        var length = _orient === "out" ? (_radius - _arcWidth + _tickSize) * 1.1 : (_radius - _tickSize ) * 0.9;
        _tick.map(function(d,i){
            _lable.push({
                text: (max - min)/_ticks * i + min,
                x: 0 - Math.cos(d.rotate/360 * 2 * Math.PI) * length,
                y: 0 - Math.sin(d.rotate/360 * 2 * Math.PI) * length
            });
        });
    }
    
    arcAxis.scale = function(x) {
      if (!arguments.length) return _scale;
      _scale = x;
      return arcAxis;
    };
     
    arcAxis.orient = function(x) {
      if (!arguments.length) return _orient;
      _orient = x;
      return arcAxis;
    };
    
    arcAxis.radius = function(x) {
      if (!arguments.length) return _radius;
      _radius = x;
      return arcAxis;
    };
    
    arcAxis.arcWidth = function(x) {
      if (!arguments.length) return _arcWidth;
      _arcWidth = x;
      return arcAxis;
    };
      
    arcAxis.ticks = function(x) {
      if (!arguments.length) return _ticks;
      _ticks = x;
      return arcAxis;
    };
    
    arcAxis.tickSize = function(x) {
      if (!arguments.length) return _tickSize;
      _tickSize = x;
      return arcAxis;
    };
    
    arcAxis.subTicks = function(x) {
      if (!arguments.length) return _subTicks;
      _subTicks = x;
      return arcAxis;
    };
    
    arcAxis.subTickSize = function(x) {
      if (!arguments.length) return _subTickSize;
      _subTickSize = x;
      return arcAxis;
    };
    
    return arcAxis;

}