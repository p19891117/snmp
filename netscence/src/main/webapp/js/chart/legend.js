"use strict";

/**
 * 实现画图例的方法，需要图例本身的data，即图例所要描述的信息，
 * @param svg  画布
 * @param config  配置信息
 * @param data data为画图例的数组 格式[{name:"图例1"，color"blue",type:"bar", symbol:"", symbolStyle:""}]
 *                    name：图例的名字，color:颜色，type:类型，symbol:符号图例，symbolStyle：样式
 * @returns {{_legend}}
 */
function legend(svg, opt, data) {
    var _legend = {};
    var _config=opt;
    var _utils = utils();
    var _gWidthArray = [],//存放每个legendG的宽  用于计算平移
        _gHeightArray = [],//高的数组 用于计算平移
        _allHeightArray = [],//存放每组图例g的高度 ；用于计算gobalG的平移
        _allWidthArray = []; //存放每组图例g的宽度；用于计算gobalG的平移
    var _rowWidth; //记录正行的宽度
    var _gWidth, _gHeight;//记录每个legend g容器的宽，高

    _legend.render = function () {

        var gGlobal = svg.append("g").attr("class", "gGlobal");

        if (_config.legend.show)   //设置图例是否显示
        {
            gGlobal.attr("visibility", "visible");
        } else {
            gGlobal.attr("visibility", "hidden");
        }
        var  newData= filterData(data); //校对以后的数组
        if (newData !== undefined && newData !== null && newData.length > 0) {
            var textWidth, //文本的宽
                textHeight, //文本的高
                legWidth, //图例的宽
                legHeight,//图例的高
                classes = "", //图例指向的class名
                textWidthArray=[],//存放图例文字的宽度 用于平移计算
                textHeightArray=[]; //存放图例文字的高度
            var g = gGlobal.selectAll(".legendG").data(newData).enter().append("g").attr("class", "legendG");// //定义一个g存放rect，及text
            g.each(function (d, i) {
                if (d !== null) {
                    legWidth = _config.legend.itemWidth;
                    legHeight = _config.legend.itemHeight;
                    if (d.type === _config.CHART_TYPE_BAR)//画直方图图例
                    {
                        classes = ".rect";
                        d3.select(this).append("rect").
                            attr("class", "rect" + i)
                            .attr("width", legWidth)//矩形的宽
                            .attr("height", legHeight)//矩形的高
                            .attr("rx", _config.legend.rx)  // 设置菱角的弧度（做成圆角矩形使用），如果设置长方形宽度和长度相同就标识为一个圆
                            .attr("ry", _config.legend.ry)
                            .attr("stroke", _config.legend.borderColor) //边框线的颜色
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("fill", d.color)
                            .attr("type", _config.CHART_TYPE_BAR);
                        _legend.mouseEvent(".rect" + i, ".text" + i);
                    } else if (d.type === _config.CHART_TYPE_SCATTER) //画散点图图例
                    {
                        classes = ".legCircle";
                        var r = 10;//圆的半径
                        if (legHeight < legWidth) {
                            r = legWidth / 2;
                        } else {
                            r = legHeight / 2;
                        }
                        legHeight = 2 * r;
                        legWidth = 2 * r;
                        d3.select(this).append("circle").
                            attr("class", "legCircle" + i)
                            .attr("cx", function () {
                                return r;
                            })
                            .attr("cy", r)
                            .attr("r", r)
                            .attr("stroke", _config.legend.borderColor) //边框线的颜色
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//矩形的透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("fill", d.color)
                            .attr("type", _config.CHART_TYPE_SCATTER);
                        _legend.mouseEvent(".legCircle" + i, ".text" + i);
                    } else if (d.type === _config.CHART_TYPE_PIE)  //饼图
                    {
                        classes = ".arc";
                        var outerR = 30, innerR = 10;//扇形的外半径及内半径 默认30,10
                        if (legWidth > legHeight) { //宽大于高 外半径设置宽长
                            outerR = legWidth;
                            innerR = legWidth / 2;
                        } else {  //外半径设置高长
                            outerR = legHeight;
                            innerR = legHeight / 2;
                        }

                        var pieData = {startAngle: 0, endAngle: Math.PI * 0.5};////扇形的数组
                        var arc = d3.svg.arc().outerRadius(outerR)
                            .innerRadius(innerR);
                        d3.select(this).append("path")
                            .attr("class", "arc" + i)
                            .attr("fill", d.color)
                            .attr("stroke", _config.legend.borderColor) //边框线的颜色
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("transform", "translate(15,25)rotate(-45)scale(1)")
                            .attr("d", arc(pieData, 0))
                            .attr("type", _config.CHART_TYPE_PIE);

                        _legend.mouseEvent(".arc" + i, ".text" + i);//添加鼠标移动上事件
                    } else if (d.type === _config.CHART_TYPE_LINE) //折线图图例
                    {
                        classes = ".line";
                        var lineData = [{"x": 0, "y": 7}, {"x": 30, "y": 7}];
                        //线生成器
                        var lineFunction = d3.svg.line()
                            .x(function (d) {
                                return d.x;
                            })
                            .y(function (d) {
                                return d.y;
                            })
                            .interpolate("linear");

                        d3.select(this).append("path") //把path放到容器中，并给d赋属性  画虚线
                            .attr("d", lineFunction(lineData))
                            .attr("class", "line" + i)
                            .attr("stroke", function (d) { //边框线的颜色
                                if (d.color == undefined) {
                                    return _config.legend.borderColor
                                }
                                return d.color;
                            })
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("stroke-dasharray", "10 10")
                            .attr("type", _config.CHART_TYPE_LINE);

                        //在线的中间位置画一个圆形
                        var lineD = lineFunction(lineData);
                        var endPoint = lineD.split("L")[1];
                        var endX = endPoint.split(",")[0];
                        var endY = endPoint.split(",")[1];
                        var cx = endX / 2, cy = endY, cr = 4;//圆的圆心及半径
                        d3.select(this).append("circle")
                            .attr("class", "line" + i)
                            .attr("cx", cx)
                            .attr("cy", cy)
                            .attr("r", cr)
                            .attr("stroke", function (d, i) { //边框线的颜色
                                if (d.color == undefined) {
                                    return _config.legend.borderColor
                                }
                                return d.color;
                            })
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("fill", "none");

                        legWidth = 30;
                        _legend.mouseEvent(".line" + i, ".text" + i);
                    }
                    d3.select(this).append("text")//g容器添加text文本
                        .attr("class", "text" + i)
                        .text(function (d) {
                            if (d.name !== undefined && d.name != null) {
                                return d.name;
                            }
                        })
                        .attr("font-family", _config.legend.textStyle.font_family)
                        .attr("font-size", _config.legend.textStyle.font_size)
                        .attr("type", d.type)
                        .attr("fill", function () {
                            return _config.legend.textStyle.color;
                        })
                        .attr("transform", function () { //平移字的位置
                            var tw = d3.select(this).node().getBBox().width,
                                th = d3.select(this).node().getBBox().height;

                            textWidth = tw;
                            textHeight = th;
                            textWidthArray.push(tw);
                            textHeightArray.push(th);
                            var translate = textPosition(legWidth, legHeight, textWidth, textHeight);
                            return translate;
                        });
                    _legend.mouseEvent(".text" + i, classes + i); //文本加移动事件
                }


            });


            var index=0; //增加一个index是为了获取换行之后实际的索引值
            g.attr("transform", function (d, i) {//每个一个legend对应的g容器进行平移
                if (d === null) {

                    var translate = gPosition(0, 0, "br");
                    return translate;
                } else {
                    var tw=textWidthArray[index];
                    var th=textHeightArray[index];
                    index++;
                    var translate = gPosition(tw, th, "");
                    return translate;
                }

            });

        }
        gGlobal.attr("transform", function () {//最外层的gGlobal整体平移
            var translate = globalPosition();
            return translate;
        })

    };
    _legend.removeLegend=function()
    {
        svg.select(".gGlobal").remove();
        return _legend;
    };

    /**
     * 根据用户自定义数据与程序中传送的图例数组进行比对整合
     * @param data  接收到的图例data数组
     * @return newData
     */
    function filterData(data)
    {
        var newData=[];
        var customerData=_config.legend.data; //_config中用户自定义数组
        if(customerData===undefined || customerData===null || customerData.length==0)//如果没有定义则按照接收到的数据为准
        {
            newData=data;
        }
        else //根据用户自定义的查找，若有则按照规则画，若无则按照默认
        {

            for(var i=0;i<customerData.length;i++)
            {
                var cusData=customerData[i].toString();

                if(cusData===null || cusData==="\n")
                {
                    newData.push(null); //若有为空则为换行
                }else
                {
                    var flag=0; //在接收的数据组中是否有 若有则为1；
                    for(var j=0;j<data.length;j++)
                    {
                        var serverData=data[j];
                        if(serverData!==undefined && serverData!==null)
                        {
                            if(cusData===serverData.name) //若找到
                            {
                                newData.push(serverData);
                                flag=1;
                                break;
                            }
                        }

                    }
                    if(flag===0)
                    {
                        var color=d3.rgb('gray');
                        newData.push({
                            name: cusData,
                            color: color,
                            type: "bar",
                            symbol: "",
                            symbolStyle: ""
                        })

                    }
                }

            }
        }


        return newData;

    }
    /**
     * 鼠标移动上去的事件
     * @param thisClasses  当前鼠标移动上去的组件
     * @param thatClasses  随着变化的组件
     */
    _legend.mouseEvent = function (thisClasses, thatClasses) {

        var type = d3.select(thisClasses).attr("type");
        var pieData = [{startAngle: 0, endAngle: Math.PI * 0.5}];
        var rectWidth, rectHeight, r, outerR, innerR, lineWidth, cr;
        d3.selectAll(thisClasses)
            .on("mouseover", function (d) {
                switch (type) {
                    case  _config.CHART_TYPE_BAR://直方图

                        if (thisClasses.indexOf("text") > 0) {
                            rectWidth = d3.select(thatClasses).attr("width"); //当前的宽
                            rectHeight = d3.select(thatClasses).attr("height");//当前的高
                        } else {
                            rectWidth = d3.select(thisClasses).attr("width"); //当前的宽
                            rectHeight = d3.select(thisClasses).attr("height");//当前的高
                        }

                        break;
                    case _config.CHART_TYPE_SCATTER: //散点图

                        if (thisClasses.indexOf("text") > 0) {
                            r = d3.select(thatClasses).attr("r");
                        } else {
                            r = d3.select(thisClasses).attr("r");
                        }

                        break;
                    case _config.CHART_TYPE_PIE: //饼图

                        var itemWidth = _config.legend.itemWidth, //图例的宽
                            itemHeight = _config.legend.itemHeight; //图例的高

                        if (itemWidth > itemHeight) {
                            outerR = itemWidth;
                            innerR = itemWidth / 2;
                        } else {
                            outerR = itemHeight;
                            innerR = itemHeight / 2;
                        }
                        break;
                    case _config.CHART_TYPE_LINE: //折线图
                        var nodes;
                        if (thisClasses.indexOf("text") > 0) {
                            nodes = d3.selectAll(thatClasses);
                        } else if (thisClasses.indexOf(type) > 0) {
                            nodes = d3.selectAll(thisClasses);
                        }
                        nodes.forEach(function (d) {

                            var line = d3.select(d[0]);
                            lineWidth = line.attr("stroke-width");
                            var circle = d3.select(d[1]);
                            cr = circle.attr("r");


                        });
                        break;

                }

                //var fillColor = d.color;
                var fillColor=d3.rgb(d.color).brighter(0.9);

                if (thisClasses.indexOf("text") > 0) //鼠标移动到文本上时
                {
                    d3.selectAll(thisClasses).attr("style", "cursor: hand").attr("fill", fillColor);//.attr("oldColor", d.color);
                    d3.selectAll(thatClasses)
                        .attr("style", "cursor: hand")
                        .attr("fill",fillColor); //.attr("fill-opacity", .5)

                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            var blowW = parseInt(rectWidth) + 1;
                            var blowH = parseInt(rectHeight) + 1;
                            d3.select(thatClasses).attr("width", blowW).attr("height", blowH);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图
                            var blowR = parseInt(r) + 1;
                            d3.select(thatClasses).attr("r", blowR);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图
                            d3.select(thatClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR + 1)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                });
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thatClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);
                                line.attr("stroke-width", parseInt(lineWidth) + 1)
                                var circle = d3.select(d[1]);
                                circle.attr("r", (parseInt(cr) + 1))
                                    .attr("fill", "none");
                            });
                            break;
                    }

                }
                else {
                    d3.selectAll(thisClasses)
                        .attr("style", "cursor: hand")
                        .attr("fill",fillColor)

                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            var blowW = parseInt(rectWidth) + 1;
                            var blowH = parseInt(rectHeight) + 1;
                            d3.select(thisClasses).attr("width", blowW).attr("height", blowH);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图

                            var blowR = parseInt(r) + 1;
                            d3.select(thisClasses).attr("r", blowR);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图
                            d3.select(thisClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR + 1)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                });
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thisClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);

                                var lw=parseInt(lineWidth)+1;

                                line.attr("stroke-width",lw)
                                var circle = d3.select(d[1]);

                                var crr=parseInt(cr)+1;
                                circle.attr("r", crr)
                                    .attr("fill", "none");
                            });
                            break;
                    }
                    d3.select(thatClasses).attr("fill", fillColor);
                }

                if(_config.EVENT.LEGEND_HOVERLINK!==undefined && _config.EVENT.LEGEND_HOVERLINK!==null)
                {
                    _config.EVENT.LEGEND_HOVERLINK(d.name);
                }

            }).on("mouseout", function (d) {

                var fillColor = d.color;
                var visible = d3.select(this).attr("visible");
                if (thisClasses.indexOf("text") > 0) //鼠标离开文本
                {

                    if (visible === null || visible === "true") {
                        d3.select(thisClasses).attr("fill", _config.legend.textStyle.color);
                        d3.select(thatClasses).attr("fill", fillColor);

                    } else {
                        fillColor=d3.rgb('gray').brighter(0.9);
                        d3.select(thisClasses).attr("fill",fillColor );
                       d3.select(thatClasses).attr("fill",fillColor);
                    }
                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            d3.select(thatClasses)
                                .attr("width", rectWidth)
                                .attr("height", rectHeight)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图

                            d3.select(thatClasses).attr("r", r)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图
                            d3.select(thatClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                })
                                .attr("stroke", _config.legend.borderColor);
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thatClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);
                                line.attr("stroke-width", parseInt(lineWidth))
                                    .attr("stroke", fillColor);
                                var circle = d3.select(d[1]);
                                circle.attr("r", (parseInt(cr)))
                                    .attr("stroke", _config.legend.borderColor)
                                    .attr("fill", "none");
                            });
                            break;
                    }

                } else {


                    if (visible === null || visible === "true") {
                        d3.select(thatClasses).attr("fill", _config.legend.textStyle.color);
                        d3.select(thisClasses).attr("fill",fillColor);
                    } else {
                        fillColor=d3.rgb('gray').brighter(0.9);
                        d3.select(thatClasses).attr("fill", fillColor);
                        d3.select(thisClasses).attr("fill", fillColor);

                    }

                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            d3.select(thisClasses).attr("width", rectWidth)
                                .attr("height", rectHeight)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图

                            d3.select(thisClasses).attr("r", r)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图

                            d3.select(thisClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                })
                                .attr("stroke", _config.legend.borderColor);
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thisClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);
                                line.attr("stroke-width", parseInt(lineWidth)).attr("stroke", fillColor);
                                var circle = d3.select(d[1]);
                                circle.attr("fill", "none")
                                    .attr("r", (parseInt(cr)))
                                    .attr("stroke", _config.legend.borderColor);

                            });
                            break;
                    }

                }

                if(_config.EVENT.LEGEND_OUTLINK!==undefined &&_config.EVENT.LEGEND_OUTLINK!==null)
                {
                    _config.EVENT.LEGEND_OUTLINK(d.name);
                }

            }).on("click", function (d, i) {

                var visible = d3.select(this).attr("visible");
                var type = d3.select(this).attr("type");
                if (visible == null || visible === "true") {
                    d3.select(this).attr("visible", "false"); //设置不可用
                    d3.select(thatClasses).attr("visible", "false");

                    if(_config.EVENT.LEGEND_SELECTED!==undefined && _config.EVENT.LEGEND_SELECTED!==null)
                    {
                        _config.EVENT.LEGEND_SELECTED(d.name);
                    }

                } else {
                    d3.select(this).attr("visible", "true"); //设置可用
                    d3.select(thatClasses).attr("visible", "true");

                    if(_config.EVENT.LEGEND_SELECTED!==undefined && _config.EVENT.LEGEND_SELECTED!==null)
                    {
                        _config.EVENT.LEGEND_SELECTED(d.name);
                    }
                }
            });
    };

    //确定gGlobal容器的位置
    var globalPosition = function () {
        var rx, ry; //偏移量
        var orient = _config.legend.orient; //图例的排放位置
        var _x = _config.legend.x; //图例在x轴方向的位置
        var _y = _config.legend.y;//图例在y轴方向的位置

        if (orient === undefined || orient === null || orient === "") //若未定义 设置默认值
        {
            orient = "horizontal";
        }
        if (_x === undefined || _x === null || _x === "") {
            _x = "center";
        }

        if (_y === undefined || _y === null || _y === "") {
            _y = "top";
        }

        if (typeof _x === "number") {
            rx = _x;
        } else {
            var maxWidth; //获取行的最大宽度
            if (_allWidthArray.length > 0) //有换行
            {
                maxWidth = d3.max(_allWidthArray);
            } else {
                if (_gWidthArray.length > 0) {
                    maxWidth = eval(_gWidthArray.join("+"));
                } else {
                    maxWidth = _gWidth;  //一列的情况 宽为每组图例的宽
                }

            }
            switch (_x) {
                case "left":

                    if (_config.legend.textStyle.align === "left") {
                        rx = _gWidth;
                    } else {
                        rx = 25;
                    }

                    break;
                case "center":
                    rx = (_config.canvas.width - maxWidth) / 2;
                    break;
                case "right":
                    rx = (_config.canvas.width - maxWidth);
                    break;
            }
        }
        if (typeof _y === "number") //若是一个数值
        {
            ry = _y;
        } else {
            var maxHeight;
            if (_allHeightArray.length > 0) //有换列
            {
                maxHeight = d3.max(_allHeightArray);//获取列的最大高度
            } else {

                if (_gHeightArray.length > 0) {
                    maxHeight = eval(_gHeightArray.join("+")); //多行多列
                } else {
                    maxHeight = _gHeight;//多行一列
                }

            }
            switch (_y) {
                case "top":

                    if (_config.legend.textStyle.align === "top") {
                        ry = _gHeight;
                    } else {
                        ry = 10;
                    }

                    break;
                case "center":

                    ry = (_config.canvas.height - maxHeight) / 2;
                    break;
                case "bottom":
                    ry = (_config.canvas.height - maxHeight) + 20;
                    break;
            }
        }
        return "translate(" + rx + "," + ry + ")"
    };
    /***
     * 定位每一个图例对应的g的位置
     * @param textWidth 文本文字的宽
     * @param textHeight 文本文字的高
     * @returns {*} translate(" + rx + "," + ry + ")
     */
    var rx = 0, ry = 0;
    var gPosition = function (textWidth, textHeight, mark) {

        var translate;
        var orient = _config.legend.orient; //图例是水平排列还是垂直排列
        var textAlign = _config.legend.textStyle.align;
        var itemGap = _config.legend.itemGap;//各个item之间的间隔
        var itemWidth = _config.legend.itemWidth;//图例的宽
        var itemHeight = _config.legend.itemHeight;//图例的高
        var gw = eval(_gWidthArray.join("+")); //计算每一行图例的宽
        if (orient === undefined || orient === null || orient === "") {
            orient = "horizontal"; //默认水平排列
        }
        if (textAlign === "right" || textAlign === "left") {
            _gWidth = parseInt(itemWidth) + parseInt(textWidth) + parseInt(itemGap);

            _gHeight = parseInt(itemHeight) + parseInt(itemGap);
        } else if (textAlign === "top" || textAlign === "bottom") {
            _gWidth=parseInt(itemWidth) + parseInt(textWidth) + parseInt(itemGap);
            _gHeight = parseInt(itemHeight) + parseInt(textHeight) + parseInt(itemGap);
            if (parseInt(itemWidth) > parseInt(textWidth)) {
                _gWidth = parseInt(itemWidth)+parseInt(itemGap);
            } else {
                _gWidth = textWidth+parseInt(itemGap);
            }
        }

        if (orient === "horizontal") //水平
        {

            //首先判断是否有换行符，若没有则默认水平方向一行排列
            if ((typeof (mark)) === "undefined" || mark === null || mark === "") {
                if ((typeof gw) === "undefined" || gw === 0) {
                    rx = 0;
                } else {
                    rx = gw;
                }
                _rowWidth = gw;
                _gWidthArray.push(_gWidth);


            } else if (mark === "br") //换行
            {
                _gHeightArray.push(_gHeight); //g的高放入数组
                rx = 0; //rx重置为0
                ry = eval(_gHeightArray.join("+"));//ry进行叠加
                _allWidthArray.push(eval(_gWidthArray.join("+")));//如果换行，把没一行的宽放入_allWidthArray中
                _allHeightArray.push(eval(_gHeightArray.join("+")));
                _gWidthArray = [];//宽的数组置为空
            }


        } else if (orient === "vertical")//垂直
        {

            var gh = eval(_gHeightArray.join("+"));
            if (typeof (mark) === "undefined" || mark === null || mark === "") {


                if ((typeof (gh)) === "undefined" || gh === 0) {
                    ry = 0;
                } else {
                    ry = gh;
                }
                _gHeightArray.push(_gHeight);
            } else if (mark === "br") {
                _gWidthArray.push(_gWidth);
                ry = 0;
                _allHeightArray.push(eval(_gHeightArray.join("+")));
                _allWidthArray.push(eval((_gWidthArray.join(("+")))));
                _gHeightArray = [];
                rx = eval(_gWidthArray.join("+"));

            }

            _rowWidth = gw;
        }

        translate = "translate(" + rx + "," + ry + ")";

        return translate;
    };
    /**
     * 定位text文本的位置
     * @param legWidth  图例的宽度
     * @param legHeight 图例的高度
     * @param textWidth  文本文字的宽度
     * @param textHeight 文本文字的高度
     * @returns {string} translate(" + rx + "," + ry + ")
     */
    var textPosition = function (legWidth, legHeight, textWidth, textHeight) {

        var rectWidth = legWidth;
        var rectHeight = legHeight;
        var textAlign = _config.legend.textStyle.align;
        var textSpace = _config.legend.textStyle.space;
        var rx, ry;
        switch (textAlign) {
            case "right": //文字在图例的右侧  居中
                rx = rectWidth + parseInt(textSpace) + 5;
                ry = (rectHeight + parseInt(textHeight)) / 2.5;
                break;
            case "left":  //文字字图例左侧
                rx = -(parseInt(textWidth) + parseInt(textSpace) + 2);
                ry = (rectHeight + parseInt(textHeight)) / 2.5;
                break;
            case "top": //文字在图例顶部
                rx = (rectWidth - parseInt(textWidth)) / 2;
                //ry =( (rectHeight + parseInt(textHeight) + parseInt(textSpace)));
                ry=-(textHeight)+parseInt(textSpace);
                break;
            case "bottom"://文字在图例底部
                rx = (rectWidth - parseInt(textWidth)) / 2;
                ry = (rectHeight + parseInt(textHeight) + parseInt(textSpace));
                break;
        }

        return "translate(" + rx + "," + ry + ")";
    };
    return _legend;
}



