"use strict";
/**
 * 画折线图方法
 * @param config    用户自定义的参数与config合并后的对象
 * @param showdata  用户输入的数据
 * @returns {{}}  返回方法
 * @author WangJing
 * @time 2014-12-9
 * 使用方法
 *
 */
function lineChart(config,showdata){
    var conf = config;

    var line = {};
    var _width = conf.canvas.width,
        _height = conf.canvas.height,
        _margins = conf.canvas.margins,
        _opacity = conf.line.opacity,//透明度
        _xAxisData = conf.xAxis.data,//x轴数据
        _colors =  d3.scale.category10(),
        _xScale,_yScale,//定义x轴比例尺、y轴比例尺
        _data = dataTransition(showdata[0].da),//转换用户输入的数据
        _svg,
        _bodyG,
        _line;

    //绘制坐标轴js
    var Axis = drawAxis(conf);
    console.log("Axis"+Axis);
    /**
     * 画折线图方法
     */
    line.render = function(){
        //初始化创建svg
        if(!_svg){
            _svg = d3.select("body").append("svg")//创建画板（svg），并设置宽高
                .attr("height",_height)
                .attr("width",_width);

        }
        //画坐标轴
        Axis.renderAxes(_svg,_xAxisData,_data);
        //获取比例尺
        var scale = Axis.getAxisScale();
        _xScale = scale[0];
        _yScale = scale[1];

        renderBody(_svg);
    }
    /**
     * 图表主体渲染函数
     * @param svg 绘制画布
     */
    function renderBody(svg){
        if(!_bodyG)
            _bodyG = svg.append("g")//生成g元素，该元素包含了图表主体中的所有元素
                .attr("class","body")
                .attr("transform", "translate(" + xStart() + "," + yEnd() + ")")
                .attr("clip-path","url(#body-clip)");

        renderLines();
        renderDots();
        //绘制图例
        var leg = legend(conf);
        console.log(showdata[0].da);
        leg.drawLegend(_svg,showdata[0].da);
    }
    /**
     *渲染数据序列函数
     */
    function renderLines(){
        _line = d3.svg.line()//为每一个数据序列创建svg:path元素
            .interpolate("cardinal")//设置或获取插值模式.
            .x(function(d){ return _xScale(d.x);})
            .y(function(d){ return _yScale(d.y);});

        _bodyG.selectAll("path.line")
            .data(_data)
            .enter()
            .append("path")//创建数据线段
            .style("opacity",_opacity)//线的透明度
            .style("stroke",function(d,i){
                return _colors(i);
            })
            .attr("class","line");


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
            .transition()//过渡样式
            .attr("d",function(d){ return _line(d);});
    }
    /**
     * 渲染小圆点函数
     */
    function renderDots(){
        _data.forEach(function(list,i){
            _bodyG.selectAll("circle._" + i)
                .data(list)
                .enter()
                .append("circle")
                .attr("class","dot _" + i);

            _bodyG.selectAll("circle._"+i)
                .data(list)
                .style("stroke",function(d){
                    return _colors(i);
                })
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
                        .style("fill","white");
                })
                .transition()//为其添加过渡效果，数据更新时，点会随着线条一起移动
                .attr("cx",function(d){return _xScale(d.x);})//折点cx
                .attr("cy",function(d){return _yScale(d.y);})//折点cy
                .attr("r",4.5);//折点的半径
        });
    }
    /**
     *转换用户输入的数据
     * 输入为普通二维数组
     * 转换结果
     */
    function dataTransition(data){
        var d = [];
        for (var j = 0; j < data.length; j++){
            console.log(data[j]);

            d.push(d3.range(data[j].length).map(function (i) {
                return {x: i, y: data[j][i]};
            }));
        }
        return d;
    }
    /**
     * 重新绘图
     */
    function update()
    {
        //重绘坐标轴
        Axis.updateYAxis(_data);
        //获取比例尺
        var scale = Axis.getAxisScale();
        _xScale = scale[0];
        _yScale = scale[1];

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
            return Math.random() * 15 ;//定义（y轴）随机数值
        }
        renderBody();
    }
    /**
     *根据参数调用线图方法
     */
    line.change = function(val){
//        for(var i = 0; i < 10; i++){
        if(val==="update"){
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
    function yEnd() {
        return _margins.top;
    }

    return line;

}

