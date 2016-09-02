"use strict";

/**
 * 弦图
 * @param option 弦图数据
 * @param svg svg标签
 * @param config 默认属性值
 *
 *                  matrix: [
 *
 *                     北京    上海   广州   深圳  香港
 *
 *              北京   [10,     5871, 8916, 2868,  12],
 *              上海   [ 1951, 10048, 2060, 6171,   0],
 *              广州   [ 8010, 16145,  8888, 8045,   8],
 *              深圳   [ 1013, 990,  940, 6907,    5666] ,
 *              香港   [ 4666, 6612,  4643, 6907,   5666]
 *
 *                       ]
 *
 *
 * chord使用后可以返回两个数组:chord.groups跟chord.chords
 *
 * chord.groups：
 *    外弧数据，即每一行的数据总和，表示本组类别占总圆的权重
 *
 * chord.chords：
 *    内弧数据，每个数据表示在该类别上所占比重
 * 分为source和target  两个数据相比较，max为source ，min为target
 *
 *.sortSubgroups 类别上每个内弧的排列，默认为按照数据排列(顺时针)，ascending升序排列descending倒序排列
 *.sortGroups    类别的排列，即外弧的排列，其余同上。
 */

function chord (option,svg,config){

    var _config = config,
        _utils = utils(),

        _chord = {};
    var _option = option,
        _series = option.series;

    var _legendData=[];

    var _width=_config.canvas.width,
        _height= _config.canvas.height;

    var series;
    var sourceSeries ;
    var gChord,gOUT,gInner,gTick,gOUTName;
    var groupPath;
   /**
    *
    *画和弦图
    *
    */
        _chord.render = function(){

            _series.forEach(function(d,i){

                //处理弦图数据,并克隆一个备用
                series = initDate(_series[i]);
                sourceSeries= _utils.cloneObject(series);

                //封装图例数据
                series.arcs.forEach(function(d){
                    var le ={};
                    le.name = d.name;
                    le.color = d.itemStyle.borderColor;
                    le.type = _config.CHART_TYPE_PIE; //图例没有chord,暂时用pie
                    _legendData.push(le);
                });

                //图例回调函数
                _config.EVENT.LEGEND_SELECTED = clickLegend;
                _config.EVENT.LEGEND_HOVERLINK = hoverLegend;
                _config.EVENT.LEGEND_OUTLINK = outLegend;
                //画图例
                var _legend = legend(svg,_config,_legendData);
                    _legend.render();

                //添加标题
                _utils.merge(_option.title,_config.title,false);
                var _title = title();
                _title.render(svg,_option);


                //因为圆形绘制的时候是以原点为中心绘制的，因此用原点坐标位置确定图的圆心坐标
                gChord =svg.selectAll(".gChord")
                    .data([1])
                    .enter()
                    .append("g")
                    .attr("class","gChord")
                    .attr("transform", "translate(" + series.center[0] + "," +series.center[1] + ")");

                gOUT = gChord.selectAll(".gOUT")
                    .data([1])
                    .enter()
                    .append("g")
                    .attr("class","gOUT");

                gOUTName = gChord.selectAll(".gOUTName")
                    .data([1])
                    .enter()
                    .append("g")
                    .attr("class","gOUTName");

                gInner = gChord.selectAll(".gInner")
                    .data([1])
                    .enter()
                    .append("g")
                    .attr("class","gInner");

                gTick = gChord.selectAll(".gTick")
                    .data([1])
                    .enter()
                    .append("g")
                    .attr("class","gTick");

                update(series);

            });

        };

    /**
     *
     *1.render,将图画出来
     *2.更新数据
     *3.重新绑定数据d .重新计算startAngle ，
     *4.更新那个属性，就用动画过度 groupPath.transition().duration(_config.animation.dur)
     *
     *
     * @param series
     */

    function render(){

    }

    function update(series){

        //初始化弦
        var chord = d3.layout.chord()
            .padding(series.padding)
            .sortSubgroups(getSortType(series.sortSub))
            .sortGroups(getSortType(series.sort))
            .matrix(series.matrix);


        // 创建外部弦
        groupPath = gOUT
            .selectAll("path")
            .data(chord.groups);
        groupPath.enter().append("path");

        //更新外部弦样式
        groupPath
            .attr("stroke", function(d) { return series.arcs[d.index].itemStyle.borderColor; })
            .attr("fill", function(d) { return series.arcs[d.index].itemStyle.borderColor })
        /*groupPath.transition().duration(_config.animation.dur)*/
            .attr("d", d3.svg.arc().innerRadius(series.radius[0]).outerRadius(series.radius[1]))//画圆环，设置圆环半径大小
            .on("mouseover", fade(0))//为path添加鼠标事件
            .on("mouseout", fade(0.3));

        groupPath.exit().remove();

        //为圆环添加类别名称
        var text =gOUTName.selectAll("text")
            .data(chord.groups);
        text.enter()
            .append("text");
        text.each( function(d,i) {
                d.angle = (d.startAngle + d.endAngle) / 2;
                d.name = series.arcs[i].name;
            })
            .attr("dy",".35em")
            .attr("transform", function(d){
                return "rotate(" + ( d.angle * 180 / Math.PI ) + ")" +
                    "translate(0,"+ -1.0*(series.radius[1]+40) +")" +
                    ( ( d.angle > Math.PI*3/4 && d.angle < Math.PI*5/4 ) ? "rotate(180)" : "");
            });
        text.text(function(d){
                return d.name;
            });
        text.exit().remove();


        //创建内部弦
        var innerPath =gInner
            .selectAll("path")
            .data(chord.chords);
        innerPath.enter().append("path");
        innerPath.attr("d", d3.svg.chord().radius(series.radius[0]))//指定内径
            .attr("stroke", function(d) {return series.arcs[d.target.index].itemStyle.borderColor; })
            .attr("fill", function(d) {  return series.arcs[d.target.index].itemStyle.borderColor; })//玄链接两个圆环节点，得到她的编号,颜色和target颜色相同
            .attr("opacity", 0.3);

        innerPath.exit().remove();

        //创建刻度
        var ticks = gTick
            .selectAll("g")
            .data(chord.groups)//第一次分组,依据是chord.groups 圆环分组
            .enter().append("g")
            .attr("class","innerTick")
            .selectAll("g")
            .data(groupTicks);//第二次分组，依据是刻度对象

        ticks.enter().append("g");
        ticks.attr("transform", function(d) {//对刻度进行旋转变换   ----需要研究
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                    + "translate(" + series.radius[1] + ",0)";
            });

        //加刻度线
        ticks.append("line")
            .attr("x1", 1)
            .attr("y1", 0)
            .attr("x2", 5)
            .attr("y2", 0)
            .style("stroke", "#000");
        //添加刻度文字 
        ticks.append("text")
            .attr("x", 8)
            .attr("dy", ".35em")
            .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
            .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .text(function(d) { return d.label; });

        ticks.exit().remove();

    }

    /**
     * 获取弦排序方式
     * @param sortType 用户自定义排序方式
     */
    function getSortType(sortType){

        var sort;

        if("ascending"===sortType){
            sort=d3.ascending;
        }
        if("descending"===sortType){
            sort=d3.descending;
        }
        if("none"===sortType){
            sort=null;
        }

        return sort;

    }

    /**
     * 删除指定数据
     *
     * matrix: [
     *
     *                     北京    上海   index   深圳    香港
     *
     *              北京   [10,     5871,  8916,  2868,   12],
     *              上海   [ 1951,  10048, 2060,  6171,    0],
     *              index  [ 8010,  16145, 8888,  8045,    8],
     *              深圳   [ 1013,  990,   940,   6907,    5666] ,
     *              香港   [ 4666,  6612,  4643,  6907,    5666]
     *
     *                       ]
     * @param index 要删除的数据位置
     * @param matrix 数据矩阵
     */

    function deleteMatrix(index,matrix){

        console.log("删除之前的数据矩阵："+index);
        console.log(matrix);

        //删除指定行
        matrix.splice(index,1);
        //删除指定列
        matrix.map(function(d){
            d.splice(index,1);
        });

        console.log("删除之后的数据矩阵：");
        console.log(matrix);

    }

    /**
     * 添加指定数据
     * @param index 要添加的数据位置
     * @param matrix 数据矩阵
     */

    function addMatrix(index,matrix){

        var column=[];
        var row = sourceSeries.matrix[index].slice(0,matrix.length+1);

        sourceSeries.matrix.map(function(d,i){
            if(i!=index){
                column.push(d[index]);
            }

        });

        //添加指定列
        matrix.map(function(d,i){
            d.splice(index, 0, column[i]);
        });

        //添加指定行
        matrix.splice(index,0,row);

        console.log("增加之后的数据矩阵：");
        console.log(matrix);


    }


    /**
     * 鼠标点击图例回调函数
     * @param name 图例名称
     */
    var clickLegend= function (name) {
        var flag = true;
        //如果存在就删除
        series.arcs.map(function(d,i){
            if(d.name===name){
                series.arcs.splice(i,1);
                deleteMatrix(i,series.matrix);
                flag=false;
            }

        });

        //如果不存在，则从源数组中重新取出添加上
        if(flag){
            sourceSeries.arcs.map(function(d,i){
                if(d.name===name){
                    series.arcs.splice(i,0,d);
                    addMatrix(i,series.matrix);
                    flag=true;
                }
            })

        }
        update(series); //


    };

    /**
     * 鼠标移入图例回调函数
     * @param name 图例名称
     */
    var hoverLegend = function(name){
        var d = svg.selectAll(".gOUT path").data();
        var index;
        d.map(function(d){
            if(name=== d.name){
                index= d.index;
            }
        });
        svg.selectAll(".gOUT path")
            .filter(function(d) {
                return d.index === index;
            })
            .attr("opacity", 0.7);

    };

    /**
     *鼠标移出图例回调函数
     * @param name 图例名称
     */
    var outLegend = function(name){

        var d = svg.selectAll(".gOUT path").data();
        d.map(function(d){
            if(name=== d.name){
                svg.selectAll(".gOUT path").attr("opacity",1);
            }
        });

    };



    /**
     *初始化数据
     * series.arcs:[{name,…}]，描述和弦图外圆上的类别；为必须提供参数
     * series.matrix:[]，描述和弦图的弦；为必须提供参数
     *  其余均有默认值
     * @param series 弦图用户提供的所有数据
     */
    function initDate(series){

        //将config默认属性赋给series
        _utils.merge(series,_config.chord,false);

        //为arcs取得默认属性，如果节点不设置样式，则使用默认样式
        series.arcs.map(function(d,i){
            _utils.merge(series.arcs[i].itemStyle,series.itemStyle.normal.chordStyle,false);
        });

        //处理数据中的百分比
        series.radius =[transformPercentage(series.radius[0]),transformPercentage(series.radius[1])];
        series.center =[transformPercentage(series.center[0]),transformPercentage(series.center[1])];

        //处理matrix中的数据
        series.matrix = standardMatrix(series.matrix,series.arcs.length);

        return series;

    }

    /**
     * 转换百分数
     * @param percentage 百分数
     */
    function transformPercentage(percentage){

        //如果是一个数字，则直接返回
        if(!isNaN(percentage)){

            return percentage;
        }else{
            var str = percentage.split("");
            if("%"===str[str.length-1]){
                var num = parseInt(str)*0.01;
                percentage =Math.min(_width,_height)*num;
                return percentage;
            }else{


            }
        }

    }

    /**
     *规范matrix数据，缺少填充0，不为数字也用0替换
     * @param matrix  用户自定义的matrix数据
     * @param arcNum 弧的类别个数
     */
    function standardMatrix(matrix,arcNum) {

        for(var i in arcNum){
            for(var j in arcNum){

                if(isNaN(matrix[i][j])||typeof matrix[i][j]==="undefined"){
                    matrix[i][j]=0;
                }

            }
        }


        return matrix;

    }

    // 阴影函数
    function fade(opacity) {

        return function(g, i) {
            svg.selectAll(".gInner path")
                .filter(function(d) { //过滤器，过滤掉没选中的
                    return d.source.index != i && d.target.index != i; //
                        })
                        .transition().duration(100)//过渡
                        .style("opacity", opacity);//不透明度
                };
            }

    //(5)刻度函数
    function groupTicks(d) {
        var k = (d.endAngle - d.startAngle) / d.value;//把圆环平均化，以便于后面乘上每个

        return d3.range(0, d.value, 1000).//起点 终点 分隔段大小
            map(function(v, i) {//首先创建一个刻度的数组，map遍历之
                return {
                    angle: v * k //一刻度的长度
                        + d.startAngle,//加完上面偏移量得到最终坐标
                    label: i % 5 ? null : v / 1000 + "k"//每个5个刻度标记一下
                };
            });
    }



    return _chord;

}
