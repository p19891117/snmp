'use strict';
var radarChart = function (svg,opt,config) {
    
    var _radar = {},         //图标对象
        _svg = svg,          //svg
        _opt = opt,          //雷达图用户数据
        _config = config;    //雷达图默认配置参数
        
    var _series = [],  //雷达图用户数据
        _legend = [];  //图例数据
    
    
    //=========================================数据初始化处理=================================================
    //数据初始化处理方法
    var init = function(){
        if("undefined" === typeof _opt || "undefined" === typeof _config){
            return false;
        }
        var util = utils(); //工具类对象
        console.log(_opt);
        
        //初始化雷达图数据
        _opt.series.map(function(d){
            _series.push(util.merge(d,_config.radar,false));
        });
        delete(_opt.series);
    
        util.merge(_opt,_config,false);
        //雷达图数据信息
        _series.map(function(d0,i){
            //格式化处理雷达图配置
            init.formatSerie(d0,i);
            //格式化处理雷达图数据
            init.formatData(d0);
        });
        
        return true;
    }
    
    
    //格式化处理雷达图配置
    init.formatSerie = function(serie,radarIndex){
        
        //初始化雷达图中心点X值
        if("number" !== typeof serie.center[0]){
            serie.center[0] = _opt.canvas.width * parseFloat(serie.center[0])/100;
        }
        
        //初始化雷达图中心点Y值
        if("number" !== typeof serie.center[1]){
            serie.center[1] = _opt.canvas.height * parseFloat(serie.center[1])/100;
        }
        
        //初始化雷达图半径
        if("number" !== typeof serie.radius){
            if(_opt.canvas.width < _config.canvas.height){
                serie.radius = _opt.canvas.width * parseFloat(serie.radius)/100;
            }
            else{
                serie.radius = _opt.canvas.height * parseFloat(serie.radius)/100;
            }
        }
        
        //初始化雷达图坐标轴数据
        serie.axis.map(function(d,i){
            d.x = getX(radarIndex,i);          //坐标轴顶点X值
            d.y = getY(radarIndex,i);          //坐标轴顶点Y值
            d.angle = getAngle(radarIndex,i);  //坐标轴角度
        });
        
        
        //初始化雷达图颜色
        if(null === serie.itemStyle.normal.color){
            serie.itemStyle.normal.color = _opt.color;
        }
        
        else if(!(serie.itemStyle.normal.color instanceof Array)){
            serie.itemStyle.normal.color = [serie.itemStyle.normal.color];
        }

        //获取雷达图坐标轴上点的位置
        function getPosition(radarIndex,axisIndex,value,max,func){
            if ("undefined" === typeof radarIndex || "undefined" === typeof axisIndex) { 
               return;
            }
            if ("undefined" === typeof value) { 
               value = 1;
            }
            if ("undefined" === typeof max ) { 
               max = 1;
            }
            var arc = getAngle(radarIndex,axisIndex)/360 * 2 * Math.PI;
            return 0 - _series[radarIndex].radius * value / max * func(arc);
        }

        //获取雷达图坐标轴上的点的X像素值
        function getX(radarIndex,axisIndex,value,max){
            return getPosition(radarIndex,axisIndex,value,max,Math.cos);
        }
        //获取雷达图坐标轴上点的Y像素值
        function getY(radarIndex,axisIndex,value,max){
            return getPosition(radarIndex,axisIndex,value,max,Math.sin);
        }
        //获取每个坐标轴角度
        function getAngle(radarIndex,axisIndex){
            var angle = axisIndex/_series[radarIndex].axis.length * 360 + _series[radarIndex].startAngle;
            //将角度变换至 0-360 范围内
            if(angle/360 > 1){
                angle = angle - Math.floor(angle/360)*360;
            }
            else if(angle/360 < -1){
                angle = angle + Math.floor(angle/360)*360;

            }
            return angle;
        }
 
    };
    
    //格式化雷达图数据
    init.formatData = function(serie){
        
        if(!serie.data instanceof Array){
            return;
        }
        //雷达图坐标轴数量
        var axisNum = serie.axis.length;
        var colorNum = serie.itemStyle.normal.color.length;
        
        for(var i = 0; i < serie.data.length; i++){
            
            var d = serie.data[i];
            if(!d.value instanceof Array){
                continue;
            }
            //初始化雷达图线  颜色
            d.color = serie.itemStyle.normal.color[i - Math.floor(i/colorNum)*colorNum];
            //初始化serie状态，1:显示，0:不显示
            d.state = 1;
            
            //图例数据
            var legend = {
                name:d.name,
                type:_opt.CHART_TYPE_BAR,
                color:d.color
            };
            _legend.push(legend);
            
            //雷达图数据格式转换
            var tmp = [];
            for(var j = 0; j < d.value.length; j++){
                //非数字数据，直接舍弃
                if("number" != typeof d.value[j]){
                    continue;
                }

                var axis = serie.axis[j]  //数据对应坐标轴
                var info = {};
                info.color = d.color;
                info.value = d.value[j];
                info.x = axis.x * info.value / axis.max;  //数据点X坐标
                info.y = axis.y * info.value / axis.max;  //数据点Y坐标
                tmp.push(info);
            }
            d.value = tmp;
        }
    };
    
    //===========================================绘画雷达图===================================================
    //雷达图主方法
    _radar.render = function() {
        //初始化
        var isSuccess = init();
        if (!isSuccess) { 
            return; 
        }
       
        //绘画标题
        title().render(_svg,_opt);
        
        //绘画图例
        legend(_svg,_opt,_legend).render();
        
        _opt.EVENT.LEGEND_SELECTED = events.legendSelected;
        _opt.EVENT.LEGEND_HOVERLINK = events.legendHoverLink;
        _opt.EVENT.LEGEND_OUTLINK = events.legendOutLink;
      
        //创建雷达图GROUP
        var radarGs = _svg.selectAll("g.radar")
            .data(_series)
            .enter()
            .append("g")
            .attr("class","g.radar")
            .attr("transform", function(d){
                return "translate("+d.center+")";
            });
        
        //画正多边形
        radarGs.append("g")
            .each(renderPolygon);
        //画坐标轴
        radarGs.append("g")
            .each(renderAxes);
        //画数据线
        radarGs.append("g")
            .each(renderRadarLine);
        //画数据拐点
        radarGs.append("g")
            .each(renderRadarDots);
    }
    
    
    //绘画雷达图多边形
    function renderPolygon(serie){
        
        //坐标轴数据
        var axis = serie.axis;
        //坐标轴样式
        var axisStyle = serie.axisStyle;
        
        if(!axisStyle.splitLine.show){
            return;
        }
        //雷达图坐标轴顶点信息
        var vertex = axis.slice(0);
        vertex.push(vertex[0]);
        
        //雷达图分隔数
        var splitNumber = serie.splitNumber;
        
        //循环画雷达图正多边形
        for(var i = splitNumber; i > 0; i--){
            var area = d3.svg.area()
                .x(function(d) { return d.x*i/splitNumber; })
                .y(function(d) { return d.y*i/splitNumber; });
            
            //如果隔行填充，设置填充区域
            if(axisStyle.splitLine.isStriped){
                area.x0(function(d){
                     return d.x*(i-1)/splitNumber
                })
                .y0(function(d){ 
                    return d.y*(i-1)/splitNumber
                })
            }
            
            d3.select(this).append("g")
                .append("path")
                .datum(vertex)
                .attr("d", area)
                .style("fill",function(){
                    if(i%2 === 0) return axisStyle.splitLine.areaStyle.color[1];
                    else return axisStyle.splitLine.areaStyle.color[0];
                })
                .style("stroke",function(){return axisStyle.splitLine.lineStyle.color})
                .style("stroke-width",function(){return axisStyle.splitLine.lineStyle.width});
        }

    }
    
    
    //绘画雷达图坐标轴
    function renderAxes(serie){
        //坐标轴数据
        var axis = serie.axis;
        //坐标轴样式
        var axisStyle = serie.axisStyle;
        
        //雷达图配置信息
        if(!axisStyle.axisLine.show && !axisStyle.axisName.show){
            return;
        }
        
        var axesG = d3.select(this).selectAll("g")
            .data(axis)
            .enter()
            .append("g");
        
         //画坐标线
        if(axisStyle.axisLine.show){
            axesG.append("line")
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', function(d,i){return axis[i].x})
                .attr('y2', function(d,i){return axis[i].y})
                .style("stroke",axisStyle.axisLine.lineStyle.color)
                .style("stroke-width",axisStyle.axisLine.lineStyle.width)
        }
     
        //画坐标名称
        if(axisStyle.axisName.show){
            axesG.append("text")
                .text(function(d,i){ return d.text;})
                .style("fill",axisStyle.axisName.textStyle.color)
                .style("font-Family",_opt.textStyle.fontFamily2)
                .style("font-Size",_opt.textStyle.fontSize)
                .attr('y', function(d,i){  return axis[i].y * 1.1; })
                .attr('x', function(d,i){  return axis[i].x * 1.1; })
                .attr("text-anchor",function(d,i){
                    if(axis[i].angle > 90 && axis[i].angle < 270)  return "start";   //水平居左
                    else if(axis[i].angle === 90 || axis[i].angle === 270)  return "middle"; //水平居中
                    else if(axis[i].angle < 90 || axis[i].angle > 270) return "end"; //水平居右
                })    
                .attr("dominant-baseline","middle");  //垂直居中
        }
    }
    
    //雷达图线条生成器 (动画前状态)
    var line1 = d3.svg.line()
        .x(function(d,i) { return 0; })
        .y(function(d,i) { return 0; });
    //雷达图线条生成器  (动画后状态)
    var line2 = d3.svg.line()
        .x(function(d,i) { return d.x; })
        .y(function(d,i) { return d.y; });
    
    //绘画雷达图雷达线
    function renderRadarLine(serie,radarIndex){
        
        //如果没有雷达图数据，直接返回
        if(!serie){
            return;
        }
        
        var itemStyle = serie.itemStyle;             //雷达图样式
        var lineG = d3.select(this).append("g");     //雷达图线 G
        
        var path = lineG.selectAll("path")           //雷达图线path路径
            .data(serie.data)
            .enter()
            .append("path")
            .datum(function(d,i){ return d.value})
            .attr("id",function(d,i){ return "radar"+radarIndex+"Line"+ i;})
            .style("stroke",function(d){ return d[0].color;})                //线条颜色
            .style("stroke-width",function(){ return itemStyle.normal.lineStyle.width}) //线条粗细
            .style("fill",function(d,i){          //path 填充
                if(!serie.isArea) return "none";  //无填充
                return d[0].color;    //有填充
            })
            .style("fill-opacity",function(){return itemStyle.normal.areaStyle.opacity})  //填充透明度
            .on("mouseover",function(d,i){ events.mouseOver(radarIndex,i); })  //鼠标移上事件
            .on("mouseout",function(d,i){ events.mouseOut(radarIndex,i); });    //鼠标移除事件
        
        path.attr("d", function(d){return line1(d) + "z";})
            .transition()
            .duration(1000)
            .attr("d", function(d){return line2(d) + "z";});
    }
    
    //绘画拐点
    function renderRadarDots(serie,radarIndex){
        
        var itemStyle = serie.itemStyle; //雷达图样式
    
        //绘画雷达图拐点
        if( "none" ===serie.symbol ){
            return;
        }
        var dotsG = d3.select(this).append("g"); //雷达图拐点 G   
        var dotG = dotsG.selectAll("g")
            .data(serie.data)
            .enter()
            .append("g")
            .attr("id",function(d,i){ return "radar"+radarIndex+"DotsG"+i});

        var dots = dotG.selectAll("dots")
            .data(function(d,i){ return d.value;})
            .enter()
            .append("circle")
            .attr("class","radar_dots")
            .attr("stroke",function(d,i){ return d.color})        //拐点线条颜色
            .attr("stroke-width",function(){return itemStyle.normal.symbolStyle.width}) //拐点线条粗细
            .attr("fill","rgb(255,255,255)");  //拐点填充
        
        //雷达图拐点动画
        dots.attr("cx",function(d,i){ return 0;}) //拐点圆心X坐标
            .attr("cy",function(d,i){ return 0;}) //拐点圆心Y坐标
            .attr("r",0)    //拐点大小
            .transition()
            .duration(1000)
            .attr("cx",function(d,i){ return d.x;}) //拐点圆心X坐标
            .attr("cy",function(d,i){ return d.y;}) //拐点圆心Y坐标
            .attr("r",itemStyle.normal.symbolStyle.symbolSize);    //拐点大小
    
    }
    
    //=====================================响应事件==============================================
    var events = {};
    //图例点击事件
    events.legendSelected = function (name){
        _series.map(function(d0,i){
            d0.data.map(function(d1,j){
                if(d1.name === name){
                    if(d1.state){
                        //鼠标点击事件   收缩动画
                        d3.select("#radar"+i+"Line"+j)
                            .transition()
                            .duration(1000)
                            .attr("d", function(d){return line1(d) + "z";});
                        
                        d3.select("#radar"+i+"DotsG"+j)
                            .selectAll(".radar_dots")
                            .transition()
                            .duration(1000)
                            .attr("cx",0) //拐点圆心X坐标
                            .attr("cy",0) //拐点圆心Y坐标
                            .attr("r",0);    //拐点大小
                        
                        d1.state = 0;
                    }
                    else{
                        //鼠标点击事件   展开动画
                        d3.select("#radar"+i+"Line"+j)
                            .transition()
                            .duration(1000)
                            .attr("d", function(d){return line2(d) + "z";});
                        
                        d3.select("#radar"+i+"DotsG"+j)
                            .selectAll(".radar_dots")
                            .transition()
                            .duration(1000)
                            .attr("cx",function(d,i){ return d.x;}) //拐点圆心X坐标
                            .attr("cy",function(d,i){ return d.y;}) //拐点圆心Y坐标
                            .attr("r",d0.itemStyle.normal.symbolStyle.symbolSize);    //拐点大小
                        d1.state = 1;
                    }
                }
            }); 
        });
    };
    
    //鼠标移上图例事件
    events.legendHoverLink = function(name){   
        _series.map(function(d0,i){
            d0.data.map(function(d1,j){
                if(d1.name === name){
                    events.mouseOver(i,j);
                }
            }); 
        });
        
    }

    //鼠标移出图例事件
    events.legendOutLink = function(name){
        _series.map(function(d0,i){
            d0.data.map(function(d1,j){
                if(d1.name === name){
                    events.mouseOut(i,j);  
                }
            }); 
        });  
    }
    
    
    //鼠标移动到雷达线上事件
    events.mouseOver = function(radarIndex,lineIndex){
         var serie = _series[radarIndex];
         var itemStyle = serie.itemStyle;
         d3.select("#radar"+radarIndex+"Line"+lineIndex)
            .style("stroke",function(d){return d3.rgb(d[0].color).brighter(0.2)})//线条强调颜色
            .style("stroke-width",function(){return itemStyle.emphasis.lineStyle.width}) //线条强调粗细 
            .style("fill",function(d){
                if(!serie.isArea) return "none";
                return d3.rgb(d[0].color).brighter(0.2);  //强调填充颜色
            })
           .style("fill-opacity",function(){return itemStyle.emphasis.areaStyle.opacity}); //强调透明度
    }
    
    //鼠标移出雷达线 
    events.mouseOut = function(radarIndex,lineIndex){
         var serie = _series[radarIndex];
         var itemStyle = serie.itemStyle;
         d3.select("#radar"+radarIndex+"Line"+lineIndex)
            .style("stroke",function(d){return d[0].color;}) //线条颜色
            .style("stroke-width",function(){return itemStyle.normal.lineStyle.width}) //线条粗细
            .style("fill",function(d){
                if(!serie.isArea) return "none"; //无填充
                return d[0].color; //填充色
            })
           .style("fill-opacity",function(){return itemStyle.normal.areaStyle.opacity}); //透明度
    } 


    return _radar;
};