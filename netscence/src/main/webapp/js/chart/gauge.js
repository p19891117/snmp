"use strict";
function gauge(svg,opt,config) {
    
    var _gauge = {},         //图标对象
        _svg = svg,          //svg
        _opt = opt,          //仪表盘用户配置
        _config = config;    //仪表盘默认配置参数
        
        
    var _series = [],       //仪表盘用户数据
        _axis = [];     //仪表盘坐标轴线数据
    
    _gauge.render = function(){
        //初始化
        var isSuccess = _init();
        
        if (!isSuccess) { 
            return; 
        }
        
        var gaugeGs = _svg.selectAll("g")
            .data(_series)
            .enter()
            .append("g")
            .attr("id",function(d,i){ return "gauge" + i;})
            .attr("transform", function(d){
                return "translate("+d.center+")";
            });
        
        
        gaugeGs.append("g")
            .attr("class","axis")
            .each(renderAxis);
        
        gaugeGs.append("g")
            .attr("class","pointer")
            .each(renderPointer);
        
    };
    
    
    //==========================绘画仪表盘坐标轴==============================
    function renderAxis(serie){
        
        var gaugeG = d3.select(this);
        
        var scale = d3.scale.linear()
            .domain(serie.axisArc.domain)
            .range(serie.axisArc.range);
        
        var arcAxis = component.arcAxis()
            .scale(scale)
            .radius(serie.radius)
            .arcWidth(serie.axisArc.width)
            .ticks(serie.axisTick.tickNumber)
            .tickSize(serie.axisTick.length)
            .subTicks(serie.subTick.tickNumber)
            .subTickSize(serie.subTick.length);
        
        gaugeG.call(arcAxis);
        
        //设置坐标轴线颜色
        if(serie.axisArc.show){
            gaugeG.selectAll(".arcs path")
                .attr("fill",function(d,i){ return serie.axisArc.color[i]});
        }
        else{
            gaugeG.selectAll(".arcs path")
                .attr("fill","rgba(0,0,0,0)");
        }
        //设置坐标轴大刻度线颜色
        if(serie.axisTick.show){
            gaugeG.selectAll(".ticks line")
                .style("stroke",function(d,i){ return serie.axisTick.color[i];})
                .style("stroke-width",serie.axisTick.width);
        }
        else{
            gaugeG.selectAll(".ticks line")
                .style("stroke","rgba(0,0,0,0)");   
        }
        //设置坐标轴小刻度线颜色
        if(serie.subTick.show){
            gaugeG.selectAll(".subTicks line")
                .style("stroke",function(d,i){ return serie.subTick.color[i]})
                .style("stroke-width",serie.subTick.width);
        }
        else{
            gaugeG.selectAll(".subTicks line")
                .style("stroke","rgba(0,0,0,0)");
        }
        //设置坐标轴文本标签颜色以及字体
        if(serie.axisLabel.show){
             gaugeG.selectAll(".labels text")
                .attr("fill",function(d,i){ return serie.axisLabel.color[i];})
                .style("font-Family",_opt.textStyle.fontFamily2)
                .style("font-Size",_opt.textStyle.fontSize);
        }
        else{
             gaugeG.selectAll(".labels text")
                .attr("fill","rgba(0,0,0,0)");
        }
    };
    
    //绘画指针
    function renderPointer(serie){
        
        var pointerG = d3.select(this);
        //多边形指针
        pointerG.append("polygon")
            .attr("points",serie.pointer.point);
        //指针固定圆
        pointerG.append("circle")
            .attr("r",2)
            .style("fill","rgb(255,255,255)");
        //初始化动画
        pointerG.style("fill",serie.pointer.color)
            .transition()
            .duration(1000)
            .attrTween("transform",function(){
                var startAngle = serie.startAngle;
                var currentAngle = this.__current__ || startAngle;//获取当前数据
                var interpolate = d3.interpolate(currentAngle, serie.pointer.rotate); //插针动画
                this.__current__ = interpolate(1);
                return function (t) {
                    return "rotate("+interpolate(t)+")";
                };
            });
    }
    
    
    //==================loadData接口==============================
    _gauge.loadData = function(series){
        
        if(!series instanceof Array){
            return;
        }
        
        series.map(function(d,i){
            if(i >= series.length){
               return;
            }
            var serie = _series[i];
            if("number" === typeof d.data && d.data < serie.max && d.data > serie.min){
                //更新数据
                serie.data = d.data;
                //重新计算角度
                _init.pointer(serie);
                
                d3.select("#gauge" + i + " .pointer")
                    .transition()
                    .duration(1000)
                    .style("fill",serie.pointer.color)
                    .attrTween("transform",function(){
                        var startAngle = serie.startAngle;
                        var currentAngle = this.__current__ || startAngle;//获取当前数据
                        var interpolate = d3.interpolate(currentAngle, serie.pointer.rotate); //插针动画
                        this.__current__ = interpolate(1);
                        return function (t) {
                            return "rotate("+interpolate(t)+")";
                        };
                    });
            }
        });
    };

    //====================数据初始化============================
    
    var _init = function(){
        if("undefined" === typeof _opt || "undefined" === typeof _config){
            return false;
        }
        var util = utils(); //工具类对象
        
        //初始化仪表盘数据
        _opt.series.map(function(d){
            _series.push(util.merge(d,_config.gauge,false));
        });
        
        util.merge(_opt,_config,false);
        
        _series.map(function(serie,i){
            //初始化仪表盘圆心、仪表盘半径
            _init.general(serie);
            //初始化仪表盘坐标轴信息
            _init.axis(serie);
            //初始化仪表盘指针
            _init.pointer(serie);
            
        });
        return true;
    };
    
    
    _init.general = function(serie){
        //初始化仪表盘中心点X值
        if("number" !== typeof serie.center[0]){
            serie.center[0] = _opt.canvas.width * parseFloat(serie.center[0])/100;
        }

        //初始化仪表盘中心点Y值
        if("number" !== typeof serie.center[1]){
            serie.center[1] = _opt.canvas.height * parseFloat(serie.center[1])/100;
        }

        //初始化仪表盘半径
        if("number" !== typeof serie.radius){
            if(_opt.canvas.width < _config.canvas.height){
                serie.radius = _opt.canvas.width * parseFloat(serie.radius)/100;
            }
            else{
                serie.radius = _opt.canvas.height * parseFloat(serie.radius)/100;
            }
        }
        
        //初始化仪表盘标题X值
        if("number" !== typeof serie.title.offsetCenter[0]){
            serie.title.x = serie.radius * parseFloat(serie.title.offsetCenter[0])/100;
        }
        //初始化仪表盘标题Y值
        if("number" !== typeof serie.title.offsetCenter[1]){
            serie.title.y = serie.radius * parseFloat(serie.title.offsetCenter[1])/100;
        }
    };

    _init.axis = function(serie){
        
        //初始化仪表盘坐标轴线数据
        var preAngle = serie.startAngle,
            preValue = serie.min;
            
        var arcsColor = [],
            domain = [preValue],            //弧形坐标轴比例尺  定义域
            range = [preAngle];             //弧形坐标轴比例尺  值域
        
        serie.color.map(function(d,i){
            //为了解决不精确小数问题，当遍历最后一个数据时，直接将endAngle插入数组
            preAngle = (i === serie.color.length - 1) ?
                serie.endAngle : (serie.endAngle - serie.startAngle) * d.percent + preAngle;
            //为了解决不精确小数问题，当遍历最后一个数据时，直接将max插入数组
            preValue = (i === serie.color.length - 1) ?
                serie.max : (serie.max - serie.min) * d.percent + preValue;
            arcsColor.push(d.color);
            domain.push(preValue);
            range.push(preAngle);
        });
        serie.axisArc.color = arcsColor;
        serie.axisArc.domain = domain;
        serie.axisArc.range = range;
        
        
        //仪表盘坐标轴大刻度颜色
        var tickColor = [];
        //仪表盘文本标签颜色
        var lableColor = [];
        var tickNum = serie.axisTick.tickNumber;
        for(var i = 0; i <= tickNum; i++){
            //坐标轴大刻度颜色
            var tickC = serie.axisTick.color ? 
                serie.axisTick.color : _init.getColor(serie.color,i/tickNum);
            //坐标轴文本标签颜色
            var lableC = serie.axisLabel.color ? serie.axisLabel.color : tickC;
            tickColor.push(tickC);
            lableColor.push(lableC);
            
        }
        serie.axisTick.color = tickColor;
        serie.axisLabel.color = lableColor;
        

        //仪表盘坐标轴小刻度
        var subTickColor = [];
        var subTickNum = serie.subTick.tickNumber;
        for(var i = 0; i < tickNum; i++){
            for(var j = 1; j < subTickNum; j++){
                //坐标轴小刻度颜色
                var color = serie.subTick.color ? serie.subTick.color :
                    _init.getColor(serie.color,(i * subTickNum + j)/(tickNum * subTickNum));
              
                subTickColor.push(color);
            }
        };
        serie.subTick.color = subTickColor;
        
    };
    
    //初始化仪表盘指针
    _init.pointer = function(serie){
        //指针旋转角度
        serie.pointer.rotate = (serie.data - serie.min)/(serie.max - serie.min) * 
            (serie.endAngle - serie.startAngle) + serie.startAngle;
        //指针颜色
        serie.pointer.color =  _init.getColor(serie.color,(serie.data - serie.min)/(serie.max - serie.min));
        //指针长度
        if("number" !== typeof serie.pointer.length){
            serie.pointer.length = serie.radius * parseFloat(serie.pointer.length)/100;
        }
        //指针宽度
        if("number" !== typeof serie.pointer.width){
            serie.pointer.width = serie.radius * parseFloat(serie.pointer.width)/100;
        }
        
        serie.pointer.point = [0 - serie.pointer.length, 0] +" "+ [ 0, 0 - serie.pointer.width] +" "+ 
            [serie.pointer.length/10, 0] +" "+ [0, serie.pointer.width];
        
        
    };
    //初始化仪表盘颜色
    _init.getColor = function(colorArr,percent){
        var ppc = 0;
        for(var i = 0; i < colorArr.length; i++){
            if(percent <= ppc + colorArr[i].percent){
                return colorArr[i].color;
            }
            else{
                ppc += colorArr[i].percent;
            }
        }
    };
     
    return _gauge;
    

}