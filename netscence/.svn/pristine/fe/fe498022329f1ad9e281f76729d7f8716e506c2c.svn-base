"use strict";

function scatter(option, svg, config) {
    var _scatter = {};
    var _svg = svg;

    var _series = option.series;
    var _filterData;
    var _axis;//坐标轴
    var _config = config;
    var _option = option;
    var _axisData = {};//绘制坐标轴参数
    var _legendData = []; //绘制图例所需要的数组
    var _utils = utils();

    var _xAxis, _yAxis; //x、y坐标轴
    var _xScale, //x轴比例尺
        _yScale; //y轴比例尺
       // _rScale; //r半径比例尺
    var _tip = d3.tip() //鼠标移动上去tip提示框显示
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, i) {
            var sex, height, weight, maxmin;

            sex = d3.select(this).attr("sex");
            maxmin = d3.select(this).attr("maxmin");
            if (d instanceof Array) {
                height = d[0];
                weight = d[1];
            } else {
                height = d.value[0];
                weight = d.value[1];
            }

            if (maxmin === "normal") {
                return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'>" +
                    "<p>" + sex + ":" + "</p><p>" + height + "cm &nbsp;&nbsp;" + weight + "kg" + "</p></span>";
            }
            else if (maxmin === "max") {
                return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'>" +
                    "<p>" + sex + ":" + "</p><p>" + "最大值：" + weight + "kg" + "</p></span>";
            } else if (maxmin === "min") {
                return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'>" +
                    "<p>" + sex + ":" + "</p><p>" + "最小值：" + weight + "kg" + "</p></span>";
            }

        });
    _svg.call(_tip);


    //呈现图形
    _scatter.render = function () {
        var _title = title();//画标题
        _title.render(_svg, _config);
        _filterData = checkout(_series); // 进行数据校验

        mergeData(_config, _option);//合并config
        //初始化画坐标轴
        initAxis();
        draw(_svg, _filterData);
        var leg = legend(_svg, _config, _legendData);
        leg.render();


        _config.EVENT.LEGEND_HOVERLINK = _mouseOverLink;
        _config.EVENT.LEGEND_OUTLINK = _mouseOutLink;
        _config.EVENT.LEGEND_SELECTED = _legendClickLink;
    };

    /***
     * svg画一系列图形
     * @param svg
     * @param data
     */
    function draw(svg, data) {
        //进入
        svg.selectAll(".groupG").data(data, function (d) {
            return d.name
        })
            .enter().append("g")
            .attr("class", "groupG")
            .attr("id", function (d, i) {
                return "groupG" + i
            });
        //更新
        var g = svg.selectAll(".groupG").data(data, function (d) {
            return d.name
        });

        ////画最大值，最小值
        g.each(function (d, index) {

            if (d.data !== undefined && d.data !== null && d.data.length > 0) {

                var symbolSize=d.symbolSize;
                var _rScale = d3.scale.linear() //定义r半径的比例尺
                    .domain([0, 200])
                    .range([symbolSize, 10]);

                if(d.symbol===null || d.symbol===undefined)//设置为空或者未定义 则默认画圆点
                {
                    drawCircle(svg,d3.select(this),data,index,_rScale);
                }else
                {
                    drawStarPoint(svg,d3.select(this),data,index,_rScale);
                }
                if (d.itemStyle.normal.label.show) {
                    drawText(d3.select(this), d,_rScale);
                }

                var markPoint= d.markPoint;
                //判断是否显示最大最小值
                if(markPoint!==undefined && markPoint!==null && markPoint.length!==0)
                {
                    var markPointData= markPoint.data;

                    for(var i=0;i<markPointData.length;i++)
                    {
                        var obj=markPointData[i];

                        if(obj.type==="max")
                        {
                            drawMaxPoint(svg, d, index,_rScale);
                        }
                        if(obj.type==="min")
                        {
                            drawMinPoint(svg,d,index,_rScale);
                        }
                    }



                }

              //  drawAverageLine(svg,d);
            }

        });

    }

    /***
     * 画圆点
     * @param g
     * @param data
     */
    function drawCircle(svg,g,data,index,rScale)
    {

        //进入画圆点
        g.selectAll("circle").data(function (d, i) {
            return d.data
        }).enter()
            .append("circle")
            .attr("class", function(){
                return "circle"+index;
            })
            .attr("id", function (d, i) {
                return "circle" + i;
            })
            .attr("sex", function () {
                return data[index].name;
            });

        //更新
        g.selectAll("circle").data(function (d) {
            return d.data;
        })
            .attr("maxmin", "normal")
            .attr("stroke", function (d,i,j) {
               return data[index].itemStyle.normal.color;
            })
            .attr("fill", function (d,i,j) {
                return data[index].itemStyle.normal.color;
            })
            .attr("cx", function (d) { //圆心坐标 x 根据比例尺计算出的数据要加上margins.left
                var x, cx;
                if (d instanceof Array) {
                    x = _xScale(d[0]) + parseFloat(_config.canvas.margins.left);
                } else {
                    x = _xScale(d.value[0]) + parseInt(_config.canvas.margins.left);
                }
                cx = x;
                return cx;
            })
            .attr("cy", function (d) {//圆心坐标y 根据y坐标轴的比例尺计算出的数据加上margins.top
                var y, cy;
                if (d instanceof Array) {
                    y = _yScale(d[1]) + parseFloat(_config.canvas.margins.top);

                } else {
                    y = _yScale(d.value[1]) + parseFloat(_config.canvas.margins.top);
                }
                cy = y;
                return cy;
            })
            .attr("r", function (d) {//散点图圆心半径，根据数据[a,b,c] 中的c来获取比例尺对应的圆的大小  c若缺省则取默认值0对应的比例尺

                var r = rScale(0);

                if (d instanceof  Array) {
                    if (d.length === 3) {
                        r = rScale(d[2]);
                    }
                } else {
                    if (d.value.length === 3) {
                        r = rScale(d.value[2]);
                    }
                }
                return r;
            })
            .on("mouseover", function (d, i) {
                var dcolor = d3.rgb(data[index].itemStyle.normal.color).brighter(0.2);
                d3.select(this)
                    .attr("fill", dcolor)
                    .attr("style", "cursor: hand");
                d3.select("#text"+i).attr("fill",dcolor);
                if(d instanceof Array)
                {
                    _tip.show.call(this, d);
                }
            }).on("mouseout", function (d, i) {
                d3.select(this).attr("fill", data[index].itemStyle.normal.color);
                d3.select("#text"+i).attr("fill",data[index].itemStyle.normal.color);
                if(d instanceof  Array)
                {
                    _tip.hide.call(this, d);
                }

            });
        //groupG退出
        svg.selectAll(".groupG")
            .data(data, function (d) {
                return d.name
            }).exit();
        //圆点退出
        g.selectAll("circle")
            .data(function (d) {
                return d.data;
            }).exit();
    }

    /***
     * 画文本
     * @param g
     * @param data
     */
    function drawText(g, data,rScale) {

        //判断d.itemStyle.normal.label.show
        if (data.itemStyle.normal.label.show) {
            //进入画文本
            g.selectAll("text").data(function (d, i) {
                return d.data;
            }).enter().append("text")
                .attr("class", "text")
                .attr("id", function (d, i) {
                    return "text" + i;
                });

            //更新文本
            g.selectAll("text").data(function (d) {
                return d.data;
            }).text(function (d) {
                if (d.name !== undefined && d.name != null) {
                    return d.name;
                }
            }).attr("fill", function (d,i,j) {

                return data.itemStyle.normal.color;
            })
                .attr("transform", function (d) { //平移字的位置

                    var tw = d3.select(this).node().getBBox().width,
                        th = d3.select(this).node().getBBox().height;
                    var x, y, r;
                    var position = data.itemStyle.normal.label.position;//文字位置
                    if (d instanceof  Array) //如果是普通的数组
                    {
                        if (d.length === 2) {
                            x = _xScale(d[0]) + parseFloat(_config.canvas.margins.left);
                            y = _yScale(d[1]) + parseFloat(_config.canvas.margins.top);
                            r = rScale(0);
                        }
                        if (d.length === 3) {
                            x = _xScale(d[0]) + parseFloat(_config.canvas.margins.left);
                            y = _yScale(d[1]) + parseFloat(_config.canvas.margins.top);
                            r = rScale(d[2]);
                        }
                    } else //如果是对象数组
                    {
                        if (d.value.length === 2) {
                            x = _xScale(d.value[0]) + parseFloat(_config.canvas.margins.left);
                            y = _yScale(d.value[1]) + parseFloat(_config.canvas.margins.top);
                            r = rScale(0);
                        }
                        if (d.value.length === 3) {
                            x = _xScale(d.value[0]) + parseFloat(_config.canvas.margins.left);
                            y = _yScale(d.value[1]) + parseFloat(_config.canvas.margins.top);
                            r = rScale(d.value[2]);
                        }
                    }
                    switch (position) {
                        case  "top":
                            y = y - r;
                            x = x - (tw / 2);
                            break;
                        case "bottom":
                            y = y + r;
                            x = x - (tw / 2)
                            break;
                        case "left":
                            x = x - (tw + r);
                            y = y + r;
                            break;
                        case "right":
                            x = x + r;
                            y = y + r;
                            break;
                    }
                    return "translate(" + x + "," + y + ")";
                });

        }
    }

    /***
     * 画四角星散点图
     * @param svg
     * @param data
     */
    function drawStarPoint(svg,g, data,index,rScale) {

        //画星点  进入模式
        g.selectAll("polygon").data(function (d, i) {
            return d.data
        }).enter()
            .append("polygon")
            .attr("class", function () {
                return "circle" + index;
            }).attr("sex", function () {
                return data[index].name;
            });
        //更新模式
        g.selectAll("polygon").data(function (d) {
            return d.data;
        })
            .attr("points", function (d) {
                var x, y,r;
                if(d instanceof  Array)
                {
                     x = _xScale(d[0]) + parseFloat(_config.canvas.margins.left);
                     y = _yScale(d[1]) + parseFloat(_config.canvas.margins.top);
                    if (d.length === 3) {
                        r = rScale(d[2]);
                    } else {
                        r = rScale(0);
                    }
                }else
                {
                    x = _xScale(d.value[0]) + parseFloat(_config.canvas.margins.left);
                    y = _yScale(d.value[1]) + parseFloat(_config.canvas.margins.top);
                    if (d.value.length === 3) {
                        r = rScale(d.value[2]);
                    } else {
                        r = rScale(0);
                    }
                }
                var points = calStarPath(x, y, r);
                return points;
            })
            .attr("maxmin", "normal")
            .attr("stroke", function () {
                return data[index].itemStyle.normal.color;
            })
            .attr("stroke-width", 0)
            .attr("fill", function () {
                return data[index].itemStyle.normal.color;
            })
            .on("mouseover", function () {

                var dcolor = d3.rgb(data[index].itemStyle.normal.color).brighter(0.2);
                d3.select(this)
                    .attr("fill", dcolor)
                    .attr("style", "cursor: hand");
                _tip.show.call(this, d);


            }).on("mouseout", function () {
                d3.select(this).attr("fill", data[index].itemStyle.normal.color);
                _tip.hide.call(this, d)
            });

        svg.selectAll(".groupG")
            .data(data, function (d) {
                return d.name
            }).exit();
        //星点退出
        g.selectAll("path")
            .data(function (d) {
                return d.data;
            }).exit();
    }

    /**
     * 画四角星的点集合
     */
    function calStarPath(x, y, r) {

        var points = [];
        var pointsStr = "";
        var xi = 6, yi = 6;
        //points.push([(x - r), (y - r)], [x, (y - (3 * r))],
        //    [(x + r), (y - r)],
        //
        //    [(x + 2 * r), y], [(x + r), (y + r)],
        //    [x, (y + 3 * r)], [(x - r), (y + r)], [(x - 2 * r), y]);

        pointsStr = "" + (x - (r / xi)) + "," + (y - (r / yi)) + "  " + x + "," + (y - r) + "  " + (x + (r / xi) + "," + (y - (r / yi)) + "  " + (x + r) + "," + (y)) + " " + (x + (r / xi)) + "," + (y + (r / yi)) + "  " + x + ", " + (y + r) + "  " + (x - (r / xi)) + "," + (y + (r / yi)) + " " + (x - r) + "," + y + "";
        return pointsStr;


    }

    /***
     * 更新data.data中的数据
     * @param newData
     */
    _scatter.loadData = function (newData) {

        if (newData !== null && newData.length != 0) {
            //接收的新数据进行数据验证
            var newData = checkout(newData);
            //将newData放入_filterData中  若则更新数据，若没有则新增一列
            for (var i = 0; i < newData.length; i++) {
                var newObject = newData[i];
                if(newObject.name===undefined) //name若未定义则按照对象处理
                {
                    _filterData[i]=newObject;
                }else
                {
                    //var flag = 0; //0 ：表示需要新增一组数据，1表示更新已有的data
                    for (var j = 0; j < _filterData.length; j++) //查找_filterData中是否有此数据
                    {
                        var object = _filterData[j];

                        if (newObject.name === object.name) {
                            object.data = newObject.data;
                            //flag = 1;
                            break;
                        }

                    }
                }


                //if (flag === 0) //新增数据 放入_filterData
                //{
                //    var legObj = {};//图例样式
                //    //数据名称
                //    legObj.name = newObject.name;
                //    //颜色
                //    legObj.color = newObject.color;
                //    //图形标识
                //    legObj.type = _config.CHART_TYPE_SCATTER;
                //    _legendData.push(legObj);
                //    _config.legend.data.push(newObject.name)
                //    var leg = legend(_svg, _config, _legendData);
                //    leg.removeLegend();
                //    leg.render();
                //    _filterData.push(newObject);
                //}
            }
        }
        d3.selectAll("#maxmin").remove();
        draw(_svg, _filterData);
    };

    /***
     * 增加点
     * @param newData
     */
    _scatter.addData = function (newData) {
        if (newData !== null && newData.length != 0) {
            //接收的新数据进行数据验证
            var newData = checkout(newData);
            //将newData放入_filterData中  若则更新数据，若没有则新增一列
            for (var i = 0; i < newData.length; i++) {
                var newObject = newData[i];

                if(newObject.name===undefined) //name若未定义则按照对象处理
                {

                    for(var k=0;k<newObject.data.length;k++)
                    {
                        _filterData[i].data.push(newObject.data[k]);
                    }
                }else
                {
                    for (var j = 0; j < _filterData.length; j++) //查找_filterData中是否有此数据
                    {
                        var object = _filterData[j];
                        if (newObject.name === object.name) {
                            for (var t = 0; t < newObject.data.length; t++) {
                                object.data.push(newObject.data[t]);
                            }
                            break;
                        }

                    }
                }


            }
        }


        d3.selectAll("#maxmin").remove();
        draw(_svg, _filterData);
    };
    /**
     * 画最大值特效图
     * @param svg
     * @param data
     */
    function drawMaxPoint(svg, data, index,rScale) {

        console.log("index==="+index)
        var dataArray = data.data;
        if (dataArray !== null) {
            var maxWeightHeight; //体重最大值对应的身高
            var maxR = 0; //对应的半径
            var maxWeight = d3.max(dataArray, function (d) {
                if(d instanceof Array)
                {
                    return d[1];
                }else
                {
                    return d.value[1];
                }

            });

            //根据体重的最大值或者最小值 找到对应的身高
            for (var i = 0; i < dataArray.length; i++) {
                var da = dataArray[i];
                if(da instanceof  Array)
                {
                    if (maxWeight === da[1]) {
                        maxWeightHeight = da[0];
                        if (da.length === 3) {
                            maxR = da[2];
                        }
                        break;
                    }
                }else
                {
                    if (maxWeight === da.value[1]) {
                        maxWeightHeight = da.value[0];
                        if (da.value.length === 3) {
                            maxR = da.value[2];
                        }
                        break;
                    }
                }

            }

            var maxWidth = _xScale(maxWeightHeight) + parseFloat(_config.canvas.margins.left);
            var maxHeight = _yScale(maxWeight) + parseFloat(_config.canvas.margins.top);
            var maxR = rScale(maxR);

            //最大值
            var maxTooltip = tooltip(svg, maxWeight, maxWidth, (maxHeight - maxR));
            maxTooltip.tooltipG.attr("class", "maxmin"+index).attr("id","maxmin");
            maxTooltip.text.attr("fill", "#ffffff");
            maxTooltip.sweat.attr("fill", data.itemStyle.normal.color);
            maxTooltip.sweat.on("mouseover", function () {

                maxTooltip.mouseOverSweat();
                var color = d3.rgb(data.itemStyle.normal.color).brighter(0.2);
                d3.select(this)
                    .attr("maxmin", "max")
                    .attr("sex", data.name)
                    .attr("style", "cursor: hand")
                    .attr("fill", color);
                _tip.show.call(this, [maxWeightHeight, maxWeight]);
            });

            maxTooltip.sweat.on("mouseout", function () {
                maxTooltip.mouseOutSweat();
                d3.select(this)
                    .attr("fill", data.itemStyle.normal.color);
                _tip.hide.call(this, [maxWeightHeight, maxWeight])
            });
            maxTooltip.sweatTooltip();

        }
    };



    /**
     * 画最小值的特效图
     * @param svg
     * @param data
     */
    function drawMinPoint(svg, data, index,rScale) {

        var dataArray = data.data;
        if (dataArray !== null) {
            var minWeightHeight;//体重最小值对应的身高
            var minR = 0;//对应的半径

            var minWeight = d3.min(dataArray, function (d) {
                if(d instanceof Array)
                {
                    return d[1];
                }else
                {
                    return d.value[1];
                }

            });
            for (var i = 0; i < dataArray.length; i++) {
                var da = dataArray[i];
                if(da instanceof Array)
                {
                    if (minWeight === da[1]) {
                        minWeightHeight = da[0];
                        if (da.length == 3) {
                            minR = da[2];
                        }
                        break;
                    }
                }else
                {
                    if (minWeight === da.value[1]) {
                        minWeightHeight = da.value[0];
                        if (da.value.length == 3) {
                            minR = da.value[2];
                        }
                        break;
                    }
                }

            }
            var minWidth = _xScale(minWeightHeight) + parseFloat(_config.canvas.margins.left);
            var minHeight = _yScale(minWeight) + parseFloat(_config.canvas.margins.top);
            var minR = rScale(minR);

            //最小值
            var minTooltip = tooltip(svg, minWeight, minWidth, (minHeight - minR));
            minTooltip.tooltipG.attr("class", "maxmin" +index).attr("id","maxmin");
            minTooltip.text.attr("fill", "#ffffff");
            minTooltip.sweat.attr("fill", data.itemStyle.normal.color);
            minTooltip.sweat.on("mouseover", function () {
                minTooltip.mouseOverSweat();
                var color = d3.rgb(data.itemStyle.normal.color).brighter(0.2);
                d3.select(this)
                    .attr("maxmin", "min")
                    .attr("sex", data.name)
                    .attr("style", "cursor: hand")
                    .attr("fill", color);
                _tip.show.call(this, [minWeightHeight, minWeight]);
            });
            minTooltip.sweat.on("mouseout", function () {
                minTooltip.mouseOutSweat();
                d3.select(this).attr("fill", data.itemStyle.normal.color);
                _tip.hide.call(this, [minWeightHeight, minWeight])
            });
            minTooltip.sweatTooltip();

        }
    };
    /**
     * 平均值画一条直线未实现
     * @param svg
     * @param data
     */
    function drawAverageLine(svg, data) {

        var dataArray = data.data;
        var average = d3.mean(dataArray, function (d, i) { //获取体重的平均值
            return d[1];
        });
        var averageY = _yScale(average); //获取在y轴的位置
        var xTicks = _xScale.ticks();
        var xStart = xTicks[0];
        var xEnd = xTicks[xTicks.length - 1];
    }

    /**
     * 鼠标点击图例联动事件
     */
    var _legendClickLink = function (name) {
        var index = null;
        var object;//每一组对象
        for (var i = 0; i < _filterData.length; i++) {
            var obj = _filterData[i];
            if (obj !== null && obj.name !== undefined) {
                if (obj.name === name) {
                    object = obj;
                    index = i;
                    break;
                }
            }
        }
        if (index !== null) {
            var g = d3.selectAll("#groupG" + index);
            g.each(function (d, i) {

                var symbolSize=d.symbolSize;
                var _rScale = d3.scale.linear() //定义r半径的比例尺
                    .domain([0, 200])
                    .range([symbolSize, 10]);

                var visible = g.attr("visibility");
                if (visible === null || visible === "visible") {
                    g.attr("visibility", "hidden");
                    d3.selectAll(".maxmin" + index).remove()
                } else {
                    g.attr("visibility", "visible");


                    var markPoint= d.markPoint;
                    //判断是否显示最大最小值
                    if(markPoint!==undefined && markPoint!==null && markPoint.length!==0)
                    {
                        var markPointData= markPoint.data;

                        for(var i=0;i<markPointData.length;i++)
                        {
                            var obj=markPointData[i];

                            if(obj.type==="max")
                            {
                                drawMaxPoint(_svg, d, index,_rScale);
                            }
                            if(obj.type==="min")
                            {
                                drawMinPoint(_svg,d,index,_rScale);
                            }
                        }
                    }
                }
            })
        }
    };
    /***
     * 鼠标移动上图例
     * @param name
     */
    var _mouseOverLink = function (name) {
        var index = null;
        for (var i = 0; i < _filterData.length; i++) {
            var obj = _filterData[i];
            if (obj !== null && obj.name !== undefined) {
                if (obj.name === name) {
                    index = i;
                    break;
                }
            }
        }
        if (index !== null) //鼠标移动图例关联效果
        {
            var circle = d3.selectAll(".circle" + index); //获取一组的散点
            var circles = circle[0];
            circles.forEach(function (d, i) {
                var cr = d3.select(d).attr("r");
                var color = d3.select(d).attr("fill");
                var colorBrighter = d3.rgb(color).brighter(0.2);
                var r = parseFloat(cr) + 1;
                d3.select(d).attr("r", r).attr("fill", colorBrighter);
            });

            var maxmin = d3.selectAll(".maxmin" + index) //获取一组的最大值最小值
            var maxmins = maxmin[0];
            maxmins.forEach(function (d, i) {
                var path = d.children[0];
                var color = d3.select(path).attr("fill");
                var colorBrighter = d3.rgb(color).brighter(0.2);
                d3.select(path).attr("fill", colorBrighter);
            });
        }
    };

    /**
     * 鼠标移出图例关联事件
     * @param name
     * @private
     */
    var _mouseOutLink = function (name) {
        var index = null;
        var object;
        for (var i = 0; i < _filterData.length; i++) {
            var obj = _filterData[i];
            if (obj !== null && obj.name !== undefined) {
                if (obj.name === name) {
                    object = obj;
                    index = i;
                    break;
                }
            }
        }
        if (index !== null) //鼠标移动图例关联效果
        {
            var circle = d3.selectAll(".circle" + index);
            var circles = circle[0];
            circles.forEach(function (d, i) {
                var cr = d3.select(d).attr("r");
                var color = object.itemStyle.normal.color;
                var r = parseFloat(cr) - 1;
                d3.select(d).attr("r", r).attr("fill", color);
            });

            var maxmin = d3.selectAll(".maxmin" + index); //获取一组的最大值最小值
            var maxmins = maxmin[0];
            maxmins.forEach(function (d, i) {
                var path = d.children[0];
                d3.select(path).attr("fill", object.itemStyle.normal.color);
            });
        }
    };
    //数据校验
    function checkout(series) {
        var newData = [];
        if (series !== null && series.length > 0) {
            for (var i = 0; i < series.length; i++) {
                var obj = series[i];
                var dataArray = [];
                if (obj !== undefined && obj !== null) {
                    var nodeData = obj.data; //散点图点的数组集合

                    for (var j = 0; j < nodeData.length; j++) {
                        var node = nodeData[j]; //每一个具体的点
                        var nodeArray = [];
                        if (node instanceof  Array) //是否为普通的数组
                        {
                            if (node !== null && node.length === 1)//不合法值
                            {
                                continue;
                            }
                            if (node !== null && node.length === 2)  //[a ,b,c] c缺省时使用默认
                            {
                                var a = node[0];
                                var b = node[1];
                                if (a === undefined || a === null || a === "") {//不是数字用"-"代替，不绘制此图
                                    continue;
                                } else {
                                    if (typeof (a) === "number") {
                                        nodeArray.push(a);
                                    } else {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    }
                                }
                                if (b === undefined || b === null || b === "") {
                                    continue;
                                } else {
                                    if (typeof (b) === "number") {
                                        nodeArray.push(b);
                                    } else {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    }
                                }
                            }
                            if (node !== null && node.length === 3) //[a ,b,c] c缺省时使用默认
                            {
                                var a = node[0];
                                var b = node[1];
                                var c = node[2];
                                if (a === undefined || a === null || a === "") {//不是数字用"-"代替，不绘制此图
                                    continue
                                } else {
                                    if (typeof (a) === "number") {
                                        nodeArray.push(a);
                                    } else {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    }
                                }
                                if (b === undefined || b === null || b === "") {//不是数字用"-"代替，不绘制此图
                                    continue;
                                } else {
                                    if (typeof (b) === "number") {
                                        nodeArray.push(b);
                                    } else {
                                        //不是数字用"-"代替，不绘制此图
                                        continue;
                                    }
                                }
                                if (c === undefined || c === null || c === "") {//不是数字用"-"代替，不绘制此图
                                    continue;
                                } else {
                                    if (typeof (c) === "number") {
                                        nodeArray.push(c)
                                    } else {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    }
                                }
                            }
                            dataArray.push(nodeArray);
                        } else  //若是一个对象数组
                        {
                            var nodeArray = [];

                            if (node.value !== undefined) //取对象所对应的value数组
                            {
                                var valueArray = node.value;

                                if (valueArray !== null && valueArray.length === 1)//不合法值
                                {
                                    continue;
                                }

                                if (valueArray !== null && valueArray.length === 2) {
                                    var a = valueArray[0];
                                    var b = valueArray[1];
                                    if (a === undefined || a === null || a === "") {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    } else {
                                        if (typeof (a) === "number") {
                                            nodeArray.push(a);
                                        } else {//不是数字用"-"代替，不绘制此图
                                            continue;
                                        }
                                    }
                                    if (b === undefined || b === null || b === "") {
                                        continue;
                                    } else {
                                        if (typeof (b) === "number") {
                                            nodeArray.push(b);
                                        } else {//不是数字用"-"代替，不绘制此图
                                            continue;
                                        }
                                    }
                                }

                                if (valueArray !== null && node.valueArray === 3) //[a ,b,c] c缺省时使用默认
                                {
                                    var a = valueArray[0];
                                    var b = valueArray[1];
                                    var c = valueArray[2];
                                    if (a === undefined || a === null || a === "") {//不是数字用"-"代替，不绘制此图
                                        continue
                                    } else {
                                        if (typeof (a) === "number") {
                                            nodeArray.push(a);
                                        } else {//不是数字用"-"代替，不绘制此图
                                            continue;
                                        }
                                    }
                                    if (b === undefined || b === null || b === "") {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    } else {
                                        if (typeof (b) === "number") {
                                            nodeArray.push(b);
                                        } else {
                                            //不是数字用"-"代替，不绘制此图
                                            continue;
                                        }
                                    }
                                    if (c === undefined || c === null || c === "") {//不是数字用"-"代替，不绘制此图
                                        continue;
                                    } else {
                                        if (typeof (c) === "number") {
                                            nodeArray.push(c)
                                        } else {//不是数字用"-"代替，不绘制此图
                                            continue;
                                        }
                                    }
                                }
                            }
                            node.value = nodeArray;
                            dataArray.push(node);
                        }
                    }
                }
                obj.data = dataArray;
                newData.push(obj);
            }
        }
        return newData;
    }

    /**
     * 初始化坐标轴
     * @private
     */
    function initAxis() {
        _axisData.xAxis = _xAxis;
        _axisData.yAxis = _yAxis;
        _axis = axis(_axisData, _svg, _config);//创建轴
        _axis.render();//呈现坐标轴

        _xScale = _axis.xAxis[0].getScale; //获取x轴的比例尺
        _yScale = _axis.yAxis[0].getScale; //获取y轴的比例尺

    }

    /**
     * 合并用户设定配置和默认配置
     * @param option
     * @param config
     */
    function mergeData(config, option) {
        //保存xy轴数据
        var x = option.xAxis;
        var y = option.yAxis;
        _xAxis = option.xAxis;
        _yAxis = option.yAxis;
        //删除option中的xy轴和series数据
        delete option.xAxis;
        delete option.yAxis;
        delete option.series;
        //合并option数据
        _config = _utils.merge(config, option, true);
        var index = 0;
        //合并series数据
        _series.forEach(function (d) {
            d = _utils.merge(d, _config.scatter, false);
            //判断用户属否设置颜色，如果未设置取颜色
            if (d.itemStyle.normal.color === null) {
                d.itemStyle.normal.color = _config.color[index];
            }
            if (d.itemStyle.emphasis.color === null) {
                d.itemStyle.emphasis.color = _config.emphasisColor[index];
            }
            var legend = {};//图例样式
            //数据名称
            legend.name = d.name;
            //颜色
            legend.color = d.itemStyle.normal.color;
            //图形标识
            legend.type = _config.CHART_TYPE_SCATTER;
            _legendData.push(legend);
            index++;
        });
    }

    return _scatter;

}
