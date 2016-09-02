"use strict";

/**
 * 散点图的实现
 * @param opt
 * @param data 数据格式[{name:"女性",,color:"blue",type:"",data:[]},name"男性",color:"blue",type:"",data:[]]
 * @returns {{}}
 */
function bubble(opt, svg) {
    var _config = config();
    var _width = opt.canvas.width;
    var _height = opt.canvas.height;
    var _svg = svg;

    var padding = 40;
    var _bubble = {};
    var xScale, yScale, rScale;
    var _x, _y, _r;
    var _data = opt.series;
    var _utils = utils();
    var path = "M458,302.5c0-56.6-45.9-102.5-102.5-102.5S253,245.9,253,302.5  c0,21.7,6.7,41.7,18.2,58.3h0L355.5,499l84.3-138.2C451.3,344.2,458,324.2,458,302.5z";
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, i) {
            var info = _data[0].data;
            return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'><p>" + _data[0].name + "</p><p>" + info[i][0] + "cm &nbsp;&nbsp;" + info[i][1] + "kg" + "</p></span>";
        })

    var _point = point();//小水滴效果

    var _legendData = [];//组装图例数组
    _bubble.render = function () {

        mergeData(_config,opt);
        var newData = [];
        for (var i = 0; i < _data.length; i++) {


            var info = _data[i].data;
            if (info !== undefined) {
                for (var j = 0; j < info.length; j++) {
                    newData.push(info[j]);
                }    //_utils.merge(info, _config.scatter, false);


                //_legendArray.push({
                //    name: _data[i].name,
                //    color: _data[i].color,
                //    type: _data[i].type,
                //    symbol: "",
                //    symbolStyle: ""
                //})
            }else
            {
               // _legendArray.push(null);
            }



        }
        if (!_svg) {
            _svg = d3.select("body").append("svg") //创建画板（svg），并设置宽高
                .attr("height", _height)
                .attr("width", _width);
        }
        _svg.call(tip);
        renderAxes(_svg, newData);
        //画圆
        draw(_svg, _data);
        var leg = legend(_svg, _config, _legendData);
        leg.render();
    };

    function draw(svg, data) {


        data.forEach(function (d, i) {


            console.log(d.color);
            //画泡泡图
            drawPoint(svg, d, i);
            drawMaxPoint(svg, d);

        });
    }


    /***
     *
     * @param svg
     * @param data
     */
    function drawPoint(svg, data, ii) {
        var info = data.data;
        var _c = data.color;

        if (info != null && info.length != 0) {
            svg.selectAll(".circle" + ii)
                .data(info)
                .enter()
                .append('circle')
                .attr("class", "circle" + ii)
                .attr("stroke", function (d, i) {
                    return _c;
                })
                .attr("fill", function (d, i) {
                    return _c;
                })
                .attr("cx", function (d) {
                    return xScale(d[0]);

                })
                .attr("cy", function (d) {
                    return yScale(d[1]);
                })
                .attr("r", function (d) {

                    return rScale(d[1]);
                })
                .attr("opacity", .5)
                .on("mouseover", function (d, i) {
                    //tip.show;
                    d3.select(this)
                        .attr("opacity", .8)
                        .attr("style", "cursor: hand");
                    svg.selectAll(".circle" + ii)
                        .on("mouseover", tip.show)

                }).on("mouseout", function (d, i) {
                    d3.select(this).attr("opacity", .5)
                    svg.selectAll(".circle" + ii)
                        .on("mouseout", tip.hide)
                })
            ;
        }

    }

    /***
     *
     * @param svg
     * @param data
     */

    function drawMaxPoint(svg, data) {

        if(data.data!==undefined)
        {
            var maxX = d3.max(data.data, function (d) {
                return d[0]
            });
            var maxY = d3.max(data.data, function (d) {
                return d[1];
            })
            var minX = d3.min(data.data, function (d) {
                return d[0];
            });

            var minY = d3.min(data.data, function (d) {
                return d[1];
            })
            _point.render(xScale(minX), yScale(minY), data.color, minX + "kg");
        }

        //_point.render(xScale(maxX),yScale(maxY),data.color);





    }

    //
    function renderAxes(svg, data) {

        //创建坐标轴，这里需要调用陈浩的坐标轴的方法
        //console.log(svg);
        //console.log(opt);
        //var _axis = axis(opt,svg);
        //console.log(_axis);
        //axis.render();
        xScale = d3.scale.linear()
            .domain([140, d3.max(data, function (d) {
                return d[0] + 10;
            })])
            .range([padding, _width]);
        yScale = d3.scale.linear()
            .domain([20, d3.max(data, function (d) {
                return d[1] + 5;
            })])
            .range([_height - padding, padding]);

        rScale = d3.scale.linear()
            .domain([0, d3.max(data, function (d) {
                return d[1];
            })])
            .range([2, 6]);

        //声明x坐标轴
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom").ticks(xScale.ticks().length)


        //创建x轴
        svg.append("g")
            .attr("class", "axis")
            .attr("stroke", "black")
            .attr("transform", "translate(120," + (_height - padding) + ")")
            .call(xAxis)
            .selectAll("text").text(function (d, i) {
                return d + "cm";
            });
        //声明y轴
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left").ticks(yScale.ticks().length);
        //创建y轴
        svg.append("g").attr("class", "axis")
            .attr("transform", "translate(160,0)")
            .attr("stroke", "black")
            .call(yAxis)
            .selectAll("text").text(function (d, i) {
                return d + "kg";
            })
    }
    /**
     * 合并用户设定配置和默认配置
     * @param option
     * @param conf
     */
    function mergeData(conf,option){
        //保存xy轴数据
        var x = option.xAxis;
        var y = option.yAxis;
        //删除option中的xy轴和series数据
        delete option.xAxis;
        delete option.yAxis;
        delete option.series;
        //合并option数据
        _config = _utils.merge(conf,option,true);
        var index = 0;
        //合并series数据
        _data.forEach(function(d){
            d = _utils.merge(d,_config.bar,false);
            //判断用户属否设置颜色，如果未设置取柱体颜色
            if(d.itemStyle.normal.color===null){
                d.itemStyle.normal.color = conf.color[index];
            }
            if(d.itemStyle.emphasis.color===null){
                d.itemStyle.emphasis.color = conf.emphasisColor[index];
            }
            var legend = {};//图例样式
            //数据名称
            legend.name = d.name;
            //颜色
            legend.color = d.color;
            //图形标识
            legend.type = _config.CHART_TYPE_SCATTER;
            _legendData.push(legend);
            index++;
        });
        //复制一份完整数据保存
       // _cloneBars = _utils.cloneObject(_series);
    }
    return _bubble;
}
