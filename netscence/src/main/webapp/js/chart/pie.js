"use strict";
function pie(option,piesvg,config) {
    var _config =  config;
    var _pie = {};
    var _option = option;
    var _svg = piesvg;
    var _pieDataArray = _option.series;
    var _series = [];
    var _tipSum  = [];
    var _legendArray = [];
    var _pieGs;
var count = 0;
    var pie;

    //合并option数据
    if(_option.canvas === null || _option.canvas === undefined ){
        var _width = _config.canvas.width,
            _height = _config.canvas.height;
    }else{
        var _width = _option.canvas.width,
            _height = _option.canvas.height;
    }

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function(d) {
            var dd = _tipSum.map(function(d){ return d.value;});
            var sum=eval(dd.join("+"));
            return "<span style='color:#ffffff;font-size: 12px;font-family: Microsoft YaHei, SimHei;'><p>访问来源</p><p>" + d.name+":"+ d.value+"("+(d.value/sum).toFixed(4).slice(2,4)+"."+(d.value/sum).toFixed(4).slice(4,6)+"%)"+ "</p></span>";
        });
    _svg.call(tip);//提示框

    //绘制饼图方法
    _pie.render = function(){
        //数据处理
        init(_pieDataArray);
        //画饼图
        renderPie(_svg,_pieDataArray);
        renderLabels(_pieDataArray,_pieGs);
        renderLine(_pieGs,_pieDataArray);
        //画标题
        var _title = title();
        _title.render(_svg,_config);
        console.log(_legendArray);

        //绘制图例
        var leg=legend(_svg,_config,_legendArray);
        leg.removeLegend();
        leg.render();
        //图例事件
        _config.EVENT.LEGEND_SELECTED = _legendClick;
        _config.EVENT.LEGEND_HOVERLINK = _hoverCallback;
        _config.EVENT.LEGEND_OUTLINK = _outCallback;
    };
    //饼图弧度生成器
    var arc = d3.svg.arc()
        .innerRadius(function(d){ return d.innerRadius;})
        .outerRadius(function(d){ return d.outerRadius;});

    //图例点击事件回调函数
    var _legendClick = function(name){
        _pieDataArray.map(function(d0){
            d0.data.map(function(d1){
                if(d1.name === name){
                    if(d1.state){
                        d1.state = 0;
                    }
                    else {
                        d1.state = 1;
                    }
                }
            });
        });
        _pieGs.data(_pieDataArray);
        _pieGs.selectAll(".path")
            .data(function(d){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType)
            })
            .transition().duration(2000)
            .attrTween("d", function (d) {
                var currentArc = this.__current__;//获取当前状态
                var interpolate = d3.interpolate(currentArc, d); //插针动画
                this.__current__ = interpolate(1);
                return function (t) {
                    return arc(interpolate(t));
                };
            });
        renderLabels(_pieDataArray,_pieGs);
        renderLine(_pieGs,_pieDataArray);

    };

    //鼠标移动到图例上悬停时回调函数
    var _hoverCallback = function (name){
        for(var t =0 ; t < _legendArray.length;t++){
            if(_legendArray[t] !== null){
                if(name === _legendArray[t].name){
                    var oldColor = d3.selectAll("#"+_legendArray[t].name).attr("fill");
                    var fillColor = d3.rgb(oldColor).brighter(0.2);
                    d3.selectAll("#"+_legendArray[t].name).attr("fill",fillColor);
                }
            }

        }
    };

    //鼠标离开图例时回调函数
    var _outCallback = function(name){
        for(var t =0 ; t < _legendArray.length;t++) {
            if(_legendArray[t] !== null) {
                if (name === _legendArray[t].name) {
                    d3.selectAll("#" + _legendArray[t].name).attr("fill", _legendArray[t].color);
                }
            }
        }
    };

    /**
     * 画饼图
     * @param svg 画布
     * @param con 所有属性设置和数据
     */
    function renderPie(svg,con) {


        svg.selectAll("g")
            .data(con)
            .enter()
            .append("g")
            .attr("id",function(d,i){ return "pie" + i;})
        _pieGs = svg.selectAll("g")
            .data(con)
            .attr("transform",function(d,i){
                return "translate("+ d.center[0]+","+ d.center[1]+")";
            });

        _pieGs.selectAll(".path")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType)
            })
            .enter()
            .append("path")
            .attr("class","path")
            .attr("id",function(d){
                return d.name;
            });
        _pieGs.selectAll(".path")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType)
            })
            .attr("id",function(d){
                return d.name;
            })
            .attr("clockWise",function(d,i,j){
                //为饼图填充颜色
                return con[j].clockWise;
            })
            .attr("fill",function(d,i,j){
                //为饼图填充颜色
                return d.color;
            })
            .attr("d",function(d){
                return arc(d);
            })
            .on("mouseover",function (d,i,j){
                //鼠标触发方法，移到饼图
                mouseOverEvent("#pie"+j,d,i,j);
                var oldColor = d3.select(this).style("fill");
                var fillColor = d3.rgb(oldColor).brighter(0.2);
                d3.select(this)
                    .attr("fill",fillColor);
                tip.show.call(this,d);

            })
            .on("mouseout",function(d,i,j){
                tip.hide.call(this,d);
                svg.selectAll(".textG"+i).remove();
                _pieGs.selectAll(".rect").remove();
                _pieGs.selectAll(".text").remove();
                d3.select(this)
                    .attr("fill",function(d){
                        return d.color;
                    });
            })
            .on("mousemove",function(){
                var ox, oy;

                if ("offsetX" in d3.event) {
                    ox = d3.event.offsetX - this.clientLeft+10;
                    oy = d3.event.offsetY - this.clientTop+10;
                } else {
                    ox = d3.event.layerX - this.clientLeft+10;
                    oy = d3.event.layerY - this.clientTop+10;
                }

                var name = d3.select(this).attr("id");

                _pieGs.select(".rect").remove();
                _pieGs.select(".text").remove();

                _pieGs.append("rect")
                    .attr("class", "rect")
                    .attr("width", 150)//矩形的宽
                    .attr("height", 65)//矩形的高
                    //.attr("position","absolute")
                    .attr("rx", 2)  // 设置菱角的弧度（做成圆角矩形使用），如果设置长方形宽度和长度相同就标识为一个圆
                    .attr("ry", 2)
                    //.attr("stroke", "blue") //边框线的颜色
                    .attr("stroke-width", 1)//边框线粗细
                    .attr("fill-opacity", 0.3)//透明度
                    //.attr("stroke-opacity", 0.8) //边框的透明度
                    .attr("fill", "rgba(0, 0, 0, 0.5)")
                    .attr("transform",function(d,i){
                        return "translate("+ (ox- d.center[0]) + ","+ (oy- d.center[1]) +")";
                    });
                _pieGs
                    .append("text")
                    .attr("class", "text")
                    //.attr("position","absolute")
                    .attr("dy", 15)
                    //.attr("text-anchor", "begin")
                    .attr("font-size", 16)
                    .attr("font-weight",200/*function(d){
                        return d.itemStyle.normal.label.textStyle.font_weight;
                    }*/)
                    .attr("font-family","Microsoft YaHei"/*function(d){
                        return d.itemStyle.normal.label.textStyle.font_family;
                    }*/)
                    .text(function(d){
                        var dd = _tipSum.map(function(d){ return d.value;});
                        var sum=eval(dd.join("+"));
                        //console.log(name);
                        //return "<span style='color:#ffffff;font-size: 12px;font-family: Microsoft YaHei, SimHei;'><p>访问来源</p><p>" +name+ "</p></span>";
                        return "访问来源 :" + name/*+":"+20+"("+10.0+"%)"*/;
                    }).attr("fill","white")
                    .attr("transform",function(d){
                        return "translate("+ (ox- d.center[0]) + ","+ (oy- d.center[1]) +")";
                    });


            })
            .on("click",function(d,i,j){
                var clickTime = con[j].clickTime;
                var selectedNode = d3.selectAll("#pie"+j).selectAll("#"+ d.name);
                var _selectedOffset = con[j].selectedOffset;
                if(con[j].selectedMode === false || con[j].roseType !== null){
                    selectedNode
                        .attr("transform","translate(0,0)");
                }else if(con[j].selectedMode === "single") {
                    d3.selectAll(".path")
                        .transition()
                        .duration(con[j].clickTime)
                        .attr("show",null)
                        .attr("transform","translate(0,0)");
                    clickEvent(selectedNode, _selectedOffset,clickTime);
                }else if(con[j].selectedMode === "multiple") {
                    clickEvent(selectedNode, _selectedOffset,clickTime);
                }
            })
            .transition()
            .duration(2000)
            .attrTween("d", function (d) {
                var clockWise = d3.select(this).attr("clockWise");
                var currentArc = this.__current__;//获取当前状态
                if (!currentArc){
                    if(clockWise === "true"){
                        currentArc = {startAngle:0,
                            endAngle:0};
                    }else{
                        currentArc = {startAngle: 2*Math.PI,
                            endAngle:2*Math.PI};
                    }
                }
                var interpolate = d3.interpolate(currentArc, d); //插针动画
                this.__current__ = interpolate(1);
                return function (t) {
                    return arc(interpolate(t));
                };
            });


        //画圆圈
        _pieGs.selectAll("circle")
            .data(/*con*/function(d,i,j){
                return d.data;
            })
            .enter().append("circle")
            .attr("fill", function(d,i,j){
                return con[j].itemStyle.normal.circleFill;
            })
            .attr("id",function(d,i){
                return "circle"+i;
            })
            .attr("stroke",function(d,i,j){
                return con[j].itemStyle.normal.circlestoke
            })
            .attr("stroke-width", function(d,i,j){
                return con[j].itemStyle.normal.circlestokewidth
            })
            .style("opacity",function(d,i,j){
                return con[j].itemStyle.normal.opacity
            })
            .transition().duration(2000)
            .style("opacity",function(d,i,j){
                return con[j].itemStyle.emphasis.opacity
            })
            .attr("cx", function(){
                return 0;
            })
            .attr("cy",function(){
                return 0;
            })
            .attr("r", function (d,i,j) {
                if(i === 0){
                    if(con[j].radius[0] === 0){
                        return con[j].radius[0];
                    }else{
                        return con[j].radius[0]-10;
                    }
                }else if(i === 1){
                    if(con[j].roseType === null){
                        return con[j].radius[1]+10;
                    }else{
                        return  con[j].radius[1]+10;
                    }
                }
            });
        _pieGs.data(con).exit().remove();
        _pieGs.selectAll(".path")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType)
            })
            .exit().remove();
    }


    //画文字   outer 或 inner
    function renderLabels(con,text){
        /* ------- TEXT INNERLABELS -------*/
        //进入
        text.selectAll(".lab")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType);
            })
            .enter()
            .append("text")
            .attr("class","lab")
            .attr("id",function(d,i){
                return d.name+"a"+i;
            });
        text.selectAll(".lab")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType);
            })
            .attr("id",function(d,i){
                return d.name+"a"+i;
            })
            .text(function(d,i,j) {
                if(d.state === 1){
                    if(con[j].itemStyle.normal.label.show === true){
                        if(con[j].itemStyle.normal.label.position === "outer"){
                            return d.name;
                        }else if(con[j].itemStyle.normal.label.position === "inner"){
                            return d.value;
                        }
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }

            })
            .attr("labelPosition",function(d,i,j){
                return con[j].itemStyle.normal.label.position;
            })
            .attr("outrad",function(d,i,j){
                return con[j].radius[1];
            })
            .attr("endinflexioLen",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.endinflexiolen;
            })
            .attr("fontLen",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.fontlen;
            })
            .attr("dy", ".35em")
            .style("fill",function(d,i,j){
                if(con[j].itemStyle.normal.label.position === "outer"){
                    return d.color;
                }else if(con[j].itemStyle.normal.label.position === "inner"){
                    return con[j].itemStyle.normal.label.textStyle.innerLabelFill;
                }
            })
            .transition().duration(function(d,i,j){
                return con[j].transDate;
            })
            .attrTween("transform", function(d,i) {
                var labelPosition = d3.select(this).attr("labelPosition");
                var _outrad=d3.select(this).attr("outrad");
                var _endinflexioLen = d3.select(this).attr("endinflexioLen");
                var _fontLen=d3.select(this).attr("fontLen");
                var   pos;
                var currentArc = this.__current__;//获取当前状态
                if (!currentArc){
                    currentArc = {startAngle: 2*Math.PI,
                        endAngle:2*Math.PI};
                }
                var interpolate = d3.interpolate(currentArc, d); //插帧动画
                this.__current__ = interpolate(0);
                //this._current = this._current || d;
                //var interpolate = d3.interpolate(this._current, d);
                //this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    if(labelPosition === "outer")
                    {
                        //计算文字位置，和指示线的终点位置一样计算
                        pos = arc.centroid(d2);
                        pos[0] = (_outrad-(-_endinflexioLen)) * Math.sin(d2.startAngle + ((d2.endAngle - d2.startAngle) / 2)) + _fontLen * (midAngle(d2) < Math.PI ? 1 : -1);
                        pos[1] = -(_outrad-(-_endinflexioLen)) * Math.cos(d2.startAngle + ((d2.endAngle - d2.startAngle) / 2));
                    }
                    if (labelPosition === "inner") {
                        pos = arc.centroid(d2);
                    }
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function(d){
                var currentArc = this.__current__;//获取当前状态
                if (!currentArc){
                    currentArc = {startAngle: 2*Math.PI,
                        endAngle:2*Math.PI};
                }
                var interpolate = d3.interpolate(currentArc, d); //插帧动画
                this.__current__ = interpolate(0);
                //this._current = this._current || d;
                //var interpolate = d3.interpolate(this._current, d);
                //this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start":"end";
                };
            });
        text.selectAll(".lab")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType);
            })
            .exit().remove();
    }

    //画指示线
    function renderLine(polylineg,con){
        /* ------- SLICE TO TEXT POLYLINES -------*/
        polylineg.selectAll("polyline")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType);
            })
            .enter()
            .append("polyline")
            .style("opacity", 0);

        polylineg.selectAll("polyline")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType);
            })
            .attr("roseType",function(d,i,j){
                return con[j].roseType;
            })
            .attr("lineShow",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.show ;
            })
            .attr("outrad",function(d,i,j){
                return con[j].radius[1];
            })
            .attr("endinflexioLen",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.endinflexiolen;
            })
            .attr("fontLen",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.fontlen;
            })
            .transition().duration(function(d,i,j){
                return con[j].transDate;
            })
            .style("opacity", 1)
            .attr("stroke",function(d,i,j){
                return d.color;
            })
            .attr("stroke-width",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.lineStyle.width;
            })
            .attr("fill",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.lineFill;
            })
            .attrTween("points", function(d){
                var arcOutRad = d3.select(this).attr("outrad");
                var _endinflexioLen = d3.select(this).attr("endinflexioLen");
                var _fontLen=d3.select(this).attr("fontLen");
                var roseType = d3.select(this).attr("roseType");
                var lineShow = d3.select(this).attr("lineShow");

                var currentArc = this.__current__;//获取当前状态
                if (!currentArc){
                    currentArc = {startAngle: 2*Math.PI,
                        endAngle:2*Math.PI};
                }
                var interpolate = d3.interpolate(currentArc, d); //插帧动画
                this.__current__ = interpolate(0);
                //this._current = this._current || d;
                //var interpolate = d3.interpolate(this._current, d);
                //this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var startPoint = arc.centroid(d2);
                    if( roseType === null) {
                        //指示线起始位置
                        startPoint[0] = arcOutRad * Math.sin(d2.startAngle + ((d2.endAngle - d2.startAngle) / 2));
                        startPoint[1] = -arcOutRad * Math.cos(d2.startAngle + ((d2.endAngle - d2.startAngle) / 2));
                    }else{
                        var roseOutRad = d.outerRadius;
                        //指示线起始位置
                        startPoint[0] = roseOutRad*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        startPoint[1] = - roseOutRad*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    }
                    //指示线转折点位置 pos[0] = pos[0]+100* (midAngle(d2) < Math.PI ? 1 : -1);
                    var  inflexio = arc.centroid(d2);
                    inflexio[0] =(arcOutRad-(-_endinflexioLen))*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    inflexio[1] =-(arcOutRad-(-_endinflexioLen))*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    //指示线结束位置
                    var pos = arc.centroid(d2);
                    pos[0] = (arcOutRad-(-_endinflexioLen)) * Math.sin(d2.startAngle + ((d2.endAngle - d2.startAngle) / 2)) + _fontLen * (midAngle(d2) < Math.PI ? 1 : -1);
                    pos[1] = -(arcOutRad-(-_endinflexioLen)) * Math.cos(d2.startAngle + ((d2.endAngle - d2.startAngle) / 2));
                    if(d.state === 1){
                        if(lineShow === "true"){
                            return [startPoint, inflexio,pos];
                        }else{
                            return [];
                        }
                    }else{
                        return [];
                    }
                };
            });

        polylineg.selectAll("polyline")
            .data(function(d,i){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType);
            })
            .exit().remove();
    }

    /**
     * 初始化数据，添加显示状态
     * @param d  画饼图需数据
     */
    function init(d){
        _legendArray = [];
        _series=[];

        if("undefined" === typeof _option || "undefined" === typeof _config){
            return false;
        }
        var util = utils(); //工具类对象

        //初始化饼图数据
        d.map(function(d){
            _tipSum = d.data;
            _series.push(util.merge(d,_config.pie,false));
        });
        //delete(_pieDataArray);

        _config =  util.merge(_config,_option,true);

        //饼图数据信息

        _series.map(function(d0,i){
            //格式化处理饼图配置
            init.formatSerie(d0,i);
            //格式化处理饼图数据
            init.formatData(d0);
        });

        var legLength=_legendArray.length;

        var cols=5;
        var rows=Math.ceil(legLength/cols);

        for(var i=0;i<rows;i++)
        {
            var index=(i*cols)+i;
            _legendArray.splice(index,0,null);
        }


        _legendArray.splice(0,1);
        return true;
    }

    //格式化处理饼图配置
    init.formatSerie = function(serie){
        //初始化饼图中心点X值
        if("number" !== typeof serie.center[0]){
            serie.center[0] = _width * parseFloat(serie.center[0])/100;
        }

        //初始化饼图中心点Y值
        if("number" !== typeof serie.center[1]){
            serie.center[1] = _height * parseFloat(serie.center[1])/100;
        }

        //初始化饼图半径
        if("number" !== typeof serie.radius[0]){
            serie.radius[0] =Math.min(_width,_height) * parseFloat(serie.radius[0])/100;
        }
        if("number" !== typeof serie.radius[1]){
            serie.radius[1] = Math.min(_width,_height) * parseFloat(serie.radius[1])/100;
        }

        //初始化饼图颜色
        if(null === serie.itemStyle.normal.color){
            serie.itemStyle.normal.color = _config.color;
        }

        else if(!(serie.itemStyle.normal.color instanceof Array)){
            serie.itemStyle.normal.color = [serie.itemStyle.normal.color];
        }

    };

    //格式化饼图数据
    init.formatData = function(serie){

        if(!serie.data instanceof Array){
            return;
        }
        var colorNum = serie.itemStyle.normal.color.length;


        for(var i = 0; i < serie.data.length; i++){

            var d = serie.data[i];
            if(!d.value instanceof Array){
                continue;
            }
            //初始化饼图  颜色
            d.color = serie.itemStyle.normal.color[i - Math.floor(i/colorNum)*colorNum];
            //初始化serie状态，1:显示，0:不显示
            d.state = 1;

            //图例数据
            var legend = {
                name:d.name,
                type:_config.CHART_TYPE_PIE,
                color:d.color
            };
            _legendArray.push(legend);
            //console.log(_legendArray.length)


        }

       // console.log("col%5========"+(col%5))

        //if(col>0 && col%5 === 0){
        //    count++;
        //    console.log("cccccccccccc=="+count);
        //    _legendArray.splice(5*count,0,null);
        //
        //}

    };
    /**
     *@param id
     * @param dd
     * @param n
     * @param len
     */


    //鼠标移动到饼图上的事件
    function mouseOverEvent(id,dd,n,len){
        //显示文字在饼图中间
        d3.selectAll(id).append("g")
            .attr("class","textG"+n)
            .append("text")
            .text(function(d,i){
                var textValue= dd.name;
                return textValue;
            })
            .attr("font-weight",function(d){
                return d.itemStyle.normal.label.textStyle.font_weight;
            })
            .attr("font-size",function(d,i){
                //console.log(d3.selectAll("text").node().getBBox());
                return d.itemStyle.normal.label.textStyle.font_size;
            })
            .attr("font-family",function(d){
                return d.itemStyle.normal.label.textStyle.font_family;
            })
            .attr("transform",function(d){
                var wid = parseInt(d3.select(this).style("width"));
                var hei = parseInt(d3.select(this).style("height"));
                if(d.radius[0] === 0){
                    return "translate("+(-(wid/2))+","+(-(d.radius[1]+hei/2))+")";
                }
                return "translate("+(-(wid/2))+","+hei/4+")";
            })
            .attr("fill",function(d){
                return dd.color;
            } );
    }

    //鼠标点击事件
    function clickEvent(node,offset,time){

        if(node.attr("show")===undefined || node.attr("show")===null)
        {
            node
                .transition()
                .duration(time)
                .attr("show",true)
                .attr("transform", function(d){
                    var startAng = d.startAngle;
                    var endAng = d.endAngle;
                    var ang = startAng+(endAng-startAng)/2;
                    //计算平移时坐标位置
                    var x =/*_width*cen1+*/ offset * Math.sin(ang);
                    var y =/*_height*cen2+*/(-offset * Math.cos(ang));
                    //返回平移时坐标位置
                    return "translate("+parseFloat(x)+","+parseFloat(y)+")";
                });
        }else{
            if(node.attr("show"))
            {
                node.transition()
                    .duration(time)
                    .attr("show",null)
                    .attr("transform","translate(0,0)");
                //.attr("transform","translate("+_width*cen1+","+_height*cen2+")");
            }
        }
    }

    //获取中间角度
    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    /**
     * 饼图加载数据
     * @param newDa
     */
    _pie.loadPieData = function(newDa){
        newDa.map(function(d){
            d.data.map(function(d0){
                _pieDataArray.map(function(d1){
                    d1.data.map(function(d2){
                        if(d0.name === d2.name){
                            d2.value = d0.value;
                        }
                    });
                })
            })
        });
        _pieDataArray.forEach(function(d,i){
            var nameData = d.data;
            for(var n = 0 ; n < nameData.length ; n++){
                var selected = d3.selectAll("#"+ nameData[n].name).attr("show");
                if(selected === "true"){
                    d3.selectAll("#"+nameData[n].name)
                        .attr("transform","translate(0,0)");
                }
            }
        });
        _pieGs.data(_pieDataArray);
        _pieGs.selectAll(".path")
            .data(function(d,i,j){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType)
            })
            .transition()
            .duration(2000)
            .attrTween("d", function (d) {
                var currentArc = this.__current__;//获取当前状态
                var interpolate = d3.interpolate(currentArc, d); //插帧动画
                this.__current__ = interpolate(1);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        //renderPie(_svg,op);
        renderLabels(_pieDataArray,_pieGs);
        renderLine(_pieGs,_pieDataArray);
    };

    /**
     * 饼图添加数据
     * @param newDa
     */

    _pie.addPieData = function(newDa){
        _pieDataArray.forEach(function(d,i){
            var nameData = d.data;
            for(var n = 0 ; n < nameData.length ; n++){
                var selected = d3.selectAll("#"+ nameData[n].name).attr("show");
                if(selected === "true"){
                    d3.selectAll("#"+nameData[n].name)
                        .attr("transform","translate(0,0)");
                }
            }
        });

        for(var i=0;i<newDa.length;i++)
        {
            var newArray=newDa[i].data;
            var oldArray=_pieDataArray[i].data;
            for(var n=0;n<newArray.length;n++)
            {
                var newObj=newArray[n];
                var flag=false;
                for(var j=0;j<oldArray.length;j++)
                {
                    var oldObj=oldArray[j];
                    if(newObj.name===oldObj.name)
                    {
                        oldObj.value=newObj.value;
                        flag=true;
                    }
                }
                if(!flag)
                {
                    oldArray.push(newObj);
                }
            }
        }

        init(_pieDataArray);
        var leg=legend(_svg,_config,_legendArray);
        leg.removeLegend();
        leg.render();
        var slice =  _pieGs.selectAll(".path")
            .data(function(d){
                pie = layout.pie()
                    .innerRadius(d.radius[0])
                    .outerRadius(d.radius[1]);
                return pie(d.data, d.roseType)
            });
        _pieGs.data(_pieDataArray);

        slice .enter()
            .append("path")
            .attr("class","path")
            .attr("id",function(d){
                return d.name;
            })
            .attr("fill",function(d){
                return d.color;
            }).on("mouseover",function (d,i,j){
                //鼠标触发方法，移到饼图
                mouseOverEvent("#pie"+j,d,i,j);
                var oldColor = d3.select(this).style("fill");
                var fillColor = d3.rgb(oldColor).brighter(0.2);
                d3.select(this)
                    .attr("fill",fillColor);
                tip.show.call(this,d);
            })
            .on("mouseout",function(d,i,j){
                tip.hide.call(this,d);
                _svg.selectAll(".textG"+i).remove();

                d3.select(this)
                    .attr("fill",function(d){
                        return d.color;

                    });
            })
            .on("click",function(d,i,j){
                var clickTime = _pieDataArray[j].clickTime;
                var selectedNode = d3.selectAll("#pie"+j).selectAll("#"+ d.name);
                var _selectedOffset = _pieDataArray[j].selectedOffset;
                if(_pieDataArray[j].selectedMode === false || _pieDataArray[j].roseType !== null){
                    selectedNode
                        .attr("transform","translate(0,0)");
                }else if(_pieDataArray[j].selectedMode === "single") {
                    d3.selectAll(".path")
                        .transition()
                        .duration(_pieDataArray[j].clickTime)
                        .attr("show",null)
                        .attr("transform","translate(0,0)");
                    clickEvent(selectedNode, _selectedOffset,clickTime);
                }else if(_pieDataArray[j].selectedMode === "multiple") {
                    clickEvent(selectedNode, _selectedOffset,clickTime);
                }
            });

        slice
            .transition()
            .duration(2000)
            .attrTween("d", function (d,i) {
                var startArc = {startAngle: 2*Math.PI,endAngle:2*Math.PI};
                var currentArc = this.__current__ || startArc;//获取当前数据
                var interpolate = d3.interpolate(currentArc, d); //插针动画
                this.__current__ = interpolate(1);
                return function (t) {
                    return arc(interpolate(t));
                };

               /* var currentArc = this.__current__;//获取当前状态
                if (!currentArc){
                    currentArc = {startAngle: 2*Math.PI,
                        endAngle:2*Math.PI};
                }
                var interpolate = d3.interpolate(currentArc, d); //插帧动画
                this.__current__ = interpolate(1);
                return function (t) {
                    return arc(interpolate(t));
                };*/

             /* 自己写的插值  function arcTween(outerRadius, delay) {
                    return function() {
                        d3.event.preventDefault();
                        d3.select(this).transition().delay(delay).attrTween("d", function(d) {
                            var i = d3.interpolate(d.outerRadius, outerRadius);
                            return function(t) { d.outerRadius = i(t); return arc(d); };
                        });
                    };
                }*/
            });

        renderLabels(_pieDataArray,_pieGs);
        renderLine(_pieGs,_pieDataArray);
    };

    return _pie;
}