"ues strict";
function stackedAreaChart(config,showdata){
    var conf = config;
//分层面积图
    var stackedArea = {};

    var _width = conf.canvas.width,
        _height = conf.canvas.height,
        _margins = conf.canvas.margins,
        _x,_y,
        _data = dataTransition(showdata[0].da),//转换用户输入的数据 _data = dataTransition(showdata[0].da[0])
        _colors = d3.scale.category10(),
        _svg,
        _xAxisData = conf.xAxis.data,//x轴数据
        _bodyG,
        _line;

    //绘制坐标轴js
    var Axis = drawAxis(conf);

    //画堆积面积图方法
    stackedArea.render = function () {
        if (!_svg) {
            _svg = d3.select("body").append("svg")
                .attr("height", _height)
                .attr("width", _width);

            defineBodyClip(_svg);
        }

        //画坐标轴
        Axis.renderAxes(_svg,_xAxisData,_data);
        //获取比例尺
        var scale = Axis.getAxisScale();
        _x = scale[0];
        _y = scale[1];

        renderBody(_svg);
    };
    function defineBodyClip(svg) {
        var padding = 5;//内边距
        svg.append("defs")
            .append("clipPath")
            .attr("id", "body-clip")
            .append("rect")
            .attr("x", 0 - padding)
            .attr("y", 0)
            .attr("width", quadrantWidth() + 2 * padding)
            .attr("height", quadrantHeight());
    }

    function renderBody(svg) {
        if (!_bodyG)
            _bodyG = svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                    + xStart() + ","
                    + yEnd() + ")")
                .attr("clip-path", "url(#body-clip)");

        var stack = d3.layout.stack()
            .offset('zero');
        stack(_data);

        renderLines();

        renderAreas();

        //绘制图例
        var leg = legend(conf);
        console.log(showdata[0].da);
        leg.drawLegend(_svg,showdata[0].da);
    }

    function renderLines() {
        _line = d3.svg.line()
            .x(function (d) {
                return _x(d.x);
            })
            .y(function (d) {
                return _y(d.y + d.y0);
            });

        _bodyG.selectAll("path.line")
            .data(_data)
            .enter()
            .append("path")
            .style("stroke", function (d, i) {
                return _colors(i);
            })
            .attr("class", "line");

        _bodyG.selectAll("path.line")
            .data(_data)
            .on("click",function(d,i){// 鼠标单击某元素
                d3.select(this)
                    .style("stroke","red");
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("stroke","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("stroke",_colors(i));
            })
            .transition()
            .attr("d", function (d) {
                return _line(d);
            });
    }

    function renderAreas() {
        var area = d3.svg.area()
            .x(function (d) {
                return _x(d.x);
            })
            .y0(yStart())
//            .y0(function(d){ console.log(d.y0); return _y(d.y0);})

            .y1(function (d) {
                return _y(d.y + d.y0);
            });

        _bodyG.selectAll("path.area")
            .data(_data)
            .enter()
            .append("path")
            .style("fill", function (d, i) {
                return _colors(i);
            })
            .attr("class", "area");

        _bodyG.selectAll("path.area")
            .data(_data)
            .on("click",function(d,i){// 鼠标单击某元素
                d3.select(this)
                    .style("fill","red");
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("fill","blue");
            })
            .on("mouseout",function(d,i){//鼠标从某元素移开
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("fill",_colors(i));
            })
            .transition()
            .attr("d", function (d) {
                return area(d);
            });
    }

    /**
     *转换用户输入的数据
     * 输入为普通二维数组     例如[[1,2],[1,2]]
     * 转换结果                   [[{x:0,y:1},{x:1,y:2}],[{x:0,y:1},{x:1,y:2}]]
     */

    function dataTransition(data){
        var d = [];
        for (var j = 0; j < data.length; j++){
            d.push(d3.range(data[j].length).map(function (i) {
                return {x: i, y: data[j][i]};
            }));
        }
        return d;
    }

    //重新作图
    function update()
    {
        //重绘坐标轴
        Axis.updateYAxis(_data);
        //获取比例尺
        var scale = Axis.getAxisScale();
        _x = scale[0];
        _y = scale[1];

        renderBody(_svg);
//     d3.selectAll("g").remove();
//        _bodyG.selectAll("path.line")
//            .remove();

        for (var i = 0; i < _data.length; ++i) {
            var series = _data[i];
            series.length =0;
            for (var j = 0; j < 8; ++j)
                series.push({x: j, y: randomData()});
        }
        function randomData() {
            return Math.random() * 10 ;//定义（y轴）随机数值
        }
        renderBody();
    }
    /**
     *根据参数调用分层面积图方法
     */
    stackedArea.change = function(val){
//        for(var i = 0; i < 10; i++){
        if(val==="update"){
            console.log(_data);
            update(_data);
        }
//        console.log(val);
//            break;
//            continue;
//        }
    }

    function xStart() {
        return _margins.left;
    }

    function yStart() {
        return _height - _margins.bottom;
    }

    function xEnd() {
        return _width - _margins.right;
    }

    function yEnd() {
        return _margins.top;
    }

    function quadrantWidth() {
        return _width - _margins.left - _margins.right;
    }

    function quadrantHeight() {
        return _height - _margins.top - _margins.bottom;
    }

    stackedArea.width = function (w) {
        if (!arguments.length) return _width;
        _width = w;
        return stackedArea;
    };

    stackedArea.height = function (h) {
        if (!arguments.length) return _height;
        _height = h;
        return stackedArea;
    };

    stackedArea.margins = function (m) {
        if (!arguments.length) return _margins;
        _margins = m;
        return stackedArea;
    };

    stackedArea.colors = function (c) {
        if (!arguments.length) return _colors;
        _colors = c;
        return stackedArea;
    };

    stackedArea.x = function (x) {
        if (!arguments.length) return _x;
        _x = x;
        return stackedArea;
    };

    stackedArea.y = function (y) {
        if (!arguments.length) return _y;
        _y = y;
        return stackedArea;
    };

    stackedArea.addSeries = function (series) {
        _data.push(series);
        return stackedArea;
    };

    return stackedArea;
}
