"use strict";
/**
 *
 * @param svg 画图所在的svg标签
 * @param opt json格式数据（包含xy轴信息，柱子数据用户设置的信息）
 * @param config 默认配置数据
 * @returns {{}}
 */
function bar(svg,opt,config){
    var _bar = {};

    var _option = opt;
    var _svg = svg;

    var _barType;//标记是柱状图或条形图 pillar柱状图 strip条形图
    var _axis;//坐标轴
    var _categoryStep;//类目轴轴刻度长度
    var _categoryNum;//类目轴轴刻度数
    var _axisData = {};//绘制坐标轴参数
    var _maxmin;//柱子数据最大值最小值

    var _config = config;
    var _utils = utils();

    var _layer;
    var _rect;
    var _layerText;
    var _text;
    var _series;//柱体数据及样式参数
    var _cloneBars = [];//数据隐藏是备用恢复数据
    var _legendData = [];//图例需要的参数
    var _barsNum;//每个刻度中柱子数

    var _barWidth;//柱子宽度
    var _outer;//柱子组与组之间间隔
    var _inner;//刻度内柱子之间间隔

    var _tempData = [];

    var _barOpacity = 1,//特殊柱体透明度
        _barHeight = 15,//特殊柱体高度备
        _strokeWidth = 2,//特殊柱体边线宽
        _strokeColor = "red",//边线颜色
        _specialBarColor = "white";
    var _tag = 0;//标识第几次调用addNewRect方法
    var _userName = "";//标识调用renderRect方法的方法名


    //图例点击回调函数
    var _onClickCallback = function(name){
        //根据name更新要显式的数据
        setShowData(name);
        //所有数据都被隐藏掉时
        if(_series.length<=0){
            _maxmin=[0,0];
            //更新坐标轴,重新获取比例尺，
            var axisUpdate = {type:1,max:_maxmin[0],min:_maxmin[1]};
            if(_barType==="pillar"){
                _axis.updateYAxis(_cloneBars[0].yAxisIndex,axisUpdate);
            }else{
                _axis.updateXAxis(_cloneBars[0].yAxisIndex,axisUpdate);
            }
            //重绘柱状图
            _svg.selectAll(".layer").remove();
            _layerText.select("text").remove();
//            _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);
        }else{
            //计算最大最小值
            _maxmin = getMaxMin(_series);
            //更新坐标轴,重新获取比例尺，
            var axisUpdate = {type:1,max:_maxmin[0],min:_maxmin[1]};
            if(_barType==="pillar"){
                _axis.updateYAxis(_cloneBars[0].yAxisIndex,axisUpdate);
            }else{
                _axis.updateXAxis(_cloneBars[0].yAxisIndex,axisUpdate);
            }

            //清空画布上的柱子
            _svg.selectAll(".layer").remove();
            _layerText.selectAll("text").remove();
            //重绘柱状图
            _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);
        }
        _layer.exit().remove();
        _rect.exit().remove();
        _text.exit().remove();

    }
    var _quondamColor;
    //鼠标移动到图例上悬停时回调函数
    var _hoverCallback = function (name){
        _quondamColor = [];
        var groupData;
        for(var i=0;i<_series.length;i++){
            if(_tempData[i].name===name){
                groupData = _tempData[i];
            }
        }
        _svg.selectAll("#"+name).style("fill",function(d,n){
            if(typeof((groupData.data)[n].y)==="number"){
                return groupData.itemStyle.emphasis.color;
            }else{
                return _specialBarColor;
            }
        })
    }
    var _mouseOutCallback = function (name){
        var groupData;
        for(var i=0;i<_series.length;i++){
            if(_tempData[i].name===name){
                groupData = _tempData[i];
            }
        }
        _svg.selectAll("#"+name).style("fill",function(d,n){
            if(typeof((groupData.data)[n].y)==="number"){
                return groupData.itemStyle.normal.color;
            }else{
                return _specialBarColor;
            }
        })
    }
    /**
     *根据图类型是柱状图还是条形图，判读要修改的属性，返回属性名称
     * 柱状图时返回height，条形图时返回width
     * @returns {string}需要更新的属性名称
     */
    var attributeName = function(){
        if(_barType==="pillar"){
            return "height";
        }else{
            return "width";
        }
    };
    /**
     * 根据图类型是柱状图还是条形图，判读要修改的属性，返回属性名称
     * 柱状图时返回width，条形图时返回height
     * @returns {string}
     */
    var otherAttributeName = function(){
        if(_barType==="pillar"){
            return "width";
        }else{
            return "height";
        }
    };
    /**
     *根据图类型是柱状图还是条形图，判读要修改的属性，返回属性名称
     * 柱状图时返回x，条形图时返回y
     * @returns {string}需要更新的属性名称
     * @constructor
     */
    var getXY = function(){
        if(_barType==="pillar"){
            return "y";
        }else{
            return "x";
        }
    };
    /**
     *根据图类型是柱状图还是条形图，判读要修改的属性，返回属性名称
     * 柱状图时返回y，条形图时返回x
     * @returns {string}需要更新的属性名称
     * @constructor
     */
    var getYX = function(){
        if(_barType==="pillar"){
            return "x";
        }else{
            return "y";
        }
    };
    /**
     * 加载用户新的数据方法 只改变数据数值,
     * @param newData 用户重新传入的数据 格式为[{name:xx,data:1},{name:yy,data:22}]
     *               name值应与初始化时相同，name少：只改变newData中与初始化相同的name的值
     *                                      name多：不处理多余name
     */
    _bar.loadData = function(newData){
        updateSeries(newData);
        renderLoadData();
    }
    /**
     * 向现有展示的数据中添加新数据
     * @param data
     */
    _bar.addData = function(data){
        addForSeries(data);
        renderAddData();
    }
    /**
     *向series中添加用户add的数据
     * @param data
     */
    function addForSeries(data){
        //将用户要添加的数据填入到_series中
        for(var i=0;i<_series.length;i++){
            for(var j=0;j<data.length;j++){
                if(_series[i].name===data[j].name){
                    _series[i].data.splice(0,1);
                    _series[i].data.push(data[j].data);
                }
            }
        }
        //改变_cloneBars数据
        for(var i=0;i<_cloneBars.length;i++){
            for(var j=0;j<data.length;j++){
                if(_cloneBars[i].name===data[j].name){
                    _cloneBars[i].data.splice(0,1);
                    _cloneBars[i].data.push(data[j].data);
                }
            }
        }
    }

    /**
     * loadData方法调用，将新数据更换进原有数组
     * @param newData
     */
    function updateSeries(newData){
        //将Load方法传入的数据放置到_series中准备展示
        for(var i=0;i<_series.length;i++){
            for(var n=0;n<newData.length;n++){
                if(_series[i].name===newData[n].name){
                    _series[i].data = newData[n].data;
                }
            }
        }
        //将Load方法传入的数据放置到_cloneBars中，用于图例点击恢复柱子使用
        for(var i=0;i<_cloneBars.length;i++){
            for(var n=0;n<newData.length;n++){
                if(_cloneBars[i].name===newData[n].name){
                    _cloneBars[i].data = newData[n].data;
                }
            }
        }
    }
    /**
     *loadData方法调用，处理用户传入数据，获取新的最大最小值，设置坐标轴，重画柱子
     */
    function renderLoadData(){
        //处理数据中data格式长度
        _series = pretreatment(_series,_categoryNum);
        //获取最大最小值,将最大值最小值，更新y轴
        _maxmin = getMaxMin(_series);
        var axisUpdate = {type:1,max:_maxmin[0],min:_maxmin[1]};
        if(_barType === "pillar"){
            _axis.updateYAxis(_series[0].yAxisIndex,axisUpdate);
        }else{
            _axis.updateXAxis(_series[0].xAxisIndex,axisUpdate);
        }
        //画柱子
        loadNewRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);
    }

    /**
     * addData方法调用，重新设置坐标轴，画柱子
     */
    function renderAddData(){
        var textWidth,
            textHeight;
        var oldX,
            oldY;
        //获取最大最小值,将最大值最小值，更新y轴
        _maxmin = getMaxMin(_series);
        var axisUpdate = {type:1,max:_maxmin[0],min:_maxmin[1]};
        if(_barType === "pillar"){
            _axis.updateYAxis(_series[0].xAxisIndex,axisUpdate);
        }else{
            _axis.updateXAxis(_series[0].xAxisIndex,axisUpdate);
        }
        _userName = "renderAddData";
        //根据新比例尺绘制add后的柱子
        _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);

        _rect.transition()
            .duration(_config.animation.dur)
            .attr("x",function(d){
                if(_barType === "pillar"){
                    return this.getBBox().x-_categoryStep;
                }else{
                    if(typeof(d.y)!=="number"){
                        if(d.y0>0){
                            return _axis.xAxis[0].getScale(d.y0);
                        } else if(d.y0<0){
                            return _axis.xAxis[0].getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                        } else {
                            //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                            if(_maxmin[0]>0&&_maxmin[0]>=Math.abs(_maxmin[1])){
                                return _axis.xAxis[0].getScale(d.y0);
                            }else{
                                return _axis.xAxis[0].getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            }
                        }
                    }else{
                        return d.y>=0?_axis.xAxis[0].getScale(d.y0):_axis.xAxis[0].getScale(d.y0+ d.y);
                    }
                }
            })
            .attr("y", function(d) {
                if(_barType === "pillar"){
                    if(typeof(d.y)!=="number"){
                        if(d.y0>0){
                            return _axis.yAxis[0].getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                        } else if(d.y0<0){
                            return _axis.yAxis[0].getScale(d.y0)+_barHeight*parseFloat(d.y);
                        } else {
                            //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                            if(_maxmin[0]>0&&_maxmin[0]>=Math.abs(_maxmin[1])){
                                return _axis.yAxis[0].getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            }else{
                                return _axis.yAxis[0].getScale(d.y0)+_barHeight*(parseFloat(d.y));
                            }
                        }
                    }else{
                        return  d.y>=0?_axis.yAxis[0].getScale(d.y0 + d.y):_axis.yAxis[0].getScale(d.y0);
                    }
                }else{
                    return this.getBBox().y+_categoryStep;
                }
            })
            .attr(attributeName(),function(d) {
                if(_barType === "pillar"){
                    if(typeof(d.y)!=="number"){
                        return _barHeight;
                    }else if(d.y<0){
                        return Math.abs(_axis.yAxis[0].getScale(d.y)-_axis.yAxis[0].getScale(0));
                    }else{
                        return _axis.yAxis[0].getScale(0) - _axis.yAxis[0].getScale(d.y);
                    }
                }else{
                    if(typeof(d.y)!=="number"){
                        return _barHeight;
                    }else if(d.y<0){
                        return Math.abs(_axis.xAxis[0].getScale(0)-_axis.xAxis[0].getScale(d.y));
                    }else{
                        return _axis.xAxis[0].getScale(d.y)-_axis.xAxis[0].getScale(0);
                    }
                }
            });
        _text.transition()
            .duration(_config.animation.dur)
            .attr("x", oldX = function(d,i,j){
                if(_barType==="pillar"){
                    textWidth = this.getBBox().width;
                    textHeight = this.getBBox().height;
                    return this.getBBox().x-_categoryStep;
                }else{
                    if(_tempData[j].itemStyle.normal.label.position==="inside"){
                        return d.y>=0?_axis.xAxis[0].getScale(d.y+ d.y0)-(_axis.xAxis[0].getScale(d.y)-this.getBBox().width)/2:_axis.xAxis[0].getScale(d.y0)-(_axis.xAxis[0].getScale(d.y)-this.getBBox().width)/2;
                    }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                        return d.y>=0?_axis.xAxis[0].getScale(d.y0)-this.getBBox().width:_axis.xAxis[0].getScale(d.y+d.y0)-this.getBBox().width;
                    }else{
                        return d.y>=0?_axis.xAxis[0].getScale(d.y+ d.y0):_axis.xAxis[0].getScale(d.y0);
                    }
                }
            })
            .attr("y",oldY = function(d,i,j) {
                if(_barType==="pillar"){
                    if(typeof(d.y)!=="number"){
                        return _axis.yAxis[0].getScale(0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="top"||_tempData[j].itemStyle.normal.label.position==="right"){
                        return d.y>=0?_axis.yAxis[0].getScale(d.y0 + d.y):_axis.yAxis[0].getScale(d.y0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                        return d.y>=0?_axis.yAxis[0].getScale(d.y0)+this.getBBox().height:_axis.yAxis[0].getScale(d.y0+ d.y)+this.getBBox().height;
                    }else if(_tempData[j].itemStyle.normal.label.position==="inside"){
                        return _axis.yAxis[0].getScale(d.y0+ d.y/2)/*-this.getBBox().height*/;
                    }
                }else{
                    return parseFloat(this.getAttribute("oldY"))+parseFloat(_categoryStep);
                }
            })
            //将当前的x坐标和字符宽度赋给标签属性，为下一次位置调整使用
            .attr("oldX",oldX)
            .attr("oldY",oldY)
            .attr("oldWidth",function(d){return this.getBBox().width;})
            .attr("oldHeight",function(d){return this.getBBox().height;});
        _layer.exit().remove();
        _rect.exit().remove();
        _text.exit().remove();
    }

    /**
     *  调用loadData方法时，画柱子的方法，原有柱子基础上改变柱子参数动画效果
     * @param conf 合并后的config
     * @param svg    画板
     * @param series 柱子数据
     * @param xAxis  x轴信息，包含刻度步长，刻度数，比例尺
     * @param yAxis  y轴信息，包含刻度步长，刻度数，比例尺
     * @returns {boolean} 当数据长度为0时，直接返回false
     */
    function loadNewRect(conf,series,svg,xAxis,yAxis){
        var textWidth,
            textHeight;
        //获取最大最小值,将最大值最小值，更新y轴
        _userName = "loadNewRect";
        //根据新比例尺绘制add后的柱子
        _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);

        //延时动画效果，改变图形x,y,width,height属性，展现用户load的新数据
        _rect.transition()
            .duration(_config.animation.dur)
            .attr("x",function(d,i,j){
                if(_barType === "pillar"){
                    if(typeof(d.y)!=="number"){
                        return xAxis.getScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-3*_categoryStep/2+_strokeWidth/2;//右移白框线宽
                    }else{
                        return xAxis.getScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-3*_categoryStep/2;
                    }
                }else{
                    if(typeof(d.y)!=="number"){
                        if(d.y0>0){
                            return xAxis.getScale(d.y0);
                        } else if(d.y0<0){
                            return xAxis.getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                        } else {
                            //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                            if(_maxmin[0]>0&&_maxmin[0]>=Math.abs(_maxmin[1])){
                                return xAxis.getScale(d.y0);
                            }else{
                                return xAxis.getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            }
                        }
                    }else{
                        return d.y>=0?xAxis.getScale(d.y0):xAxis.getScale(d.y0+ d.y);
                    }
                }

            })
            .attr("y", function(d,i,j) {
                if(_barType === "pillar"){
                    if(typeof(d.y)!=="number"){
                        if(d.y0>0){
                            return yAxis.getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                        } else if(d.y0<0){
                            return yAxis.getScale(d.y0)+_barHeight*parseFloat(d.y);
                        } else {
                            //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                            if(_maxmin[0]>0&&_maxmin[0]>=Math.abs(_maxmin[1])){
                                return yAxis.getScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            }else{
                                return yAxis.getScale(d.y0)+_barHeight*(parseFloat(d.y));
                            }
                        }
                    }else{
                        return  d.y>=0?yAxis.getScale(d.y0 + d.y):yAxis.getScale(d.y0);
                    }
                }else{
                    if(typeof(d.y)!=="number"){
                        return yAxis.getScale(0)-_categoryStep*i-_outer- d.x0*_inner- (d.x0+1)*_barWidth+3*_categoryStep/2+_strokeWidth/2;
                    }else{
                        return yAxis.getScale(0)-_categoryStep*i-_outer- d.x0*_inner- (d.x0+1)*_barWidth+3*_categoryStep/2;
                    }
                }
            })
            .attr(attributeName(),function(d) {
                if(_barType === "pillar"){
                    if(typeof(d.y)!=="number"){
                        return _barHeight;
                    }else if(d.y<0){
                        return Math.abs(yAxis.getScale(d.y)-yAxis.getScale(0));
                    }else{
                        return yAxis.getScale(0) - yAxis.getScale(d.y);
                    }
                }else{
                    if(typeof(d.y)!=="number"){
                        return _barHeight;
                    }else if(d.y<0){
                        return Math.abs(xAxis.getScale(0)-xAxis.getScale(d.y));
                    }else{
                        return xAxis.getScale(d.y)-xAxis.getScale(0);
                    }
                }
            })
            .attr(otherAttributeName(),function(d){
                return _barWidth;
            })
            //设置透明度
            .style("opacity", function(d,i,j){
                //判断特殊柱子，设置透明度
                if(typeof(d.y)==="number"){
                    return _series[j].opacity;
                }else{
                    return _barOpacity;
                }
            })
            .style("stroke",function(d,i,j){
                //判断特殊柱子，设置边线颜色
                if(typeof(d.y)==="number"){
                    return _series[j].itemStyle.normal.barBorderColor;
                }else{
                    return _strokeColor;
                }
            })
            .style("stroke-width",function(d,i,j){
                //判断特殊柱子，设置边线宽度
                if(typeof(d.y)==="number"){
                    return _series[j].itemStyle.normal.barBorderWidth;
                }else{
                    return _strokeWidth;
                }
            })
            .style("fill",function(d,i,j){
                //判断特殊柱子，设置柱子颜色
                if(typeof(d.y)!=="number"){
                    return _specialBarColor;
                }else{
                    return _series[j].itemStyle.normal.color;
                }
            });
        _text.text(function(d){return d.y;});
        _text.transition()
            .duration(_config.animation.dur)
            //设置字符标签x坐标，通过当前字符宽度与之前的字符宽度比较，在之前x坐标位置偏移
            .attr("x", function(d,i,j){
                if(_barType === "pillar"){
                    return parseFloat(this.getAttribute("oldX"))-(parseFloat(this.getBBox().width)-parseFloat(this.getAttribute("oldWidth")))/2;
                }else{
                    if(_tempData[j].itemStyle.normal.label.position==="inside"){
                        return d.y>=0?xAxis.getScale(d.y0)+(xAxis.getScale(d.y)-this.getBBox().width)/2:xAxis.getScale(d.y0)-(xAxis.getScale(d.y)+this.getBBox().width)/2;
                    }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                        return d.y>=0?xAxis.getScale(d.y0)-this.getBBox().width:xAxis.getScale(d.y+d.y0)-this.getBBox().width;
                    }else{
                        return d.y>=0?xAxis.getScale(d.y+ d.y0):xAxis.getScale(d.y0);
                    }
                }
            })
            .attr("y",function(d,i,j){
                if(_barType === "pillar"){
                    if(typeof(d.y)!=="number"){
                        return yAxis.getScale(0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="top"||_tempData[j].itemStyle.normal.label.position==="right"){
                        return d.y>=0?yAxis.getScale(d.y0 + d.y):yAxis.getScale(d.y0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                        return d.y>=0?yAxis.getScale(d.y0)+this.getBBox().height:yAxis.getScale(d.y0+ d.y)+this.getBBox().height;
                    }else if(_tempData[j].itemStyle.normal.label.position==="inside"){
                        return yAxis.getScale(d.y0+ d.y/2)/*-this.getBBox().height*/;
                    }
                }else{
                    return this.getAttribute("oldY");
                }
            })
            //将当前的x坐标和字符宽度赋给标签属性，为下一次位置调整使用
            .attr("oldX",function(d){return parseFloat(this.getAttribute("oldX"))-(parseFloat(this.getBBox().width)-parseFloat(this.getAttribute("oldWidth")))/2;})
            .attr("oldWidth",function(d){return this.getBBox().width;});
        _layer.exit().remove();
        _rect.exit().remove();
        _text.exit().remove();
    }
    /**
     * 绘制柱状图方法
     */
    _bar.render = function(){
        //校验数据
        var mark = checkout(_option);
        if(!mark){
            console.log("数据不完整！");
            return mark;
        }
        //根据x轴类型判断柱形图或条形图
        if(typeof(_option.xAxis.type)==="undefined"||"category"===_option.xAxis.type){
            _barType = "pillar";//柱
        }else{
            _barType = "strip";//条
        }

        //第一次创建坐标轴对象，获取x轴刻度数，用于整理数据
        _axisData.xAxis = [_option.xAxis];
        _axisData.yAxis = [_option.yAxis];
        var opt = _utils.cloneObject(_option);
        delete opt.xAxis;
        delete opt.yAxis;
        delete opt.series;
        opt = _utils.merge(_config,opt,true);
        _axis = axis(_utils.cloneObject(_axisData),_svg,opt);//创建轴

        if(_barType === "pillar"){
            _categoryNum = _axis.xAxis[0].getTickNum;//x轴刻度数
            _categoryStep = _axis.xAxis[0].getStep;//获取x轴刻度长度
        }else{
            _categoryNum = _axis.yAxis[0].getTickNum;//x轴刻度数
            _categoryStep = _axis.yAxis[0].getStep;//获取x轴刻度长度
        }
        //处理数据中data格式长度
        _series = pretreatment(_option.series,_categoryNum);
        //merge客户设置参数(xy轴数据和柱子数据不合并)
        mergeData(_config,_option);
        //获取最大最小值,将最大值最小值放入坐标轴参数对象，创建轴对象
        _maxmin = getMaxMin(_series);
        if(_barType === "pillar"){
            _axisData.yAxis[0].max = _maxmin[0];
            _axisData.yAxis[0].min = _maxmin[1];
        }else{
            _axisData.xAxis[0].max = _maxmin[0];
            _axisData.xAxis[0].min = _maxmin[1];
        }
        _axis = axis(_axisData,_svg,_config);
        //画坐标轴
        _axis.render();
        //画柱子
        _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);

        //图例
        _config.EVENT.LEGEND_SELECTED = _onClickCallback;
        _config.EVENT.LEGEND_HOVERLINK = _hoverCallback;
        _config.EVENT.LEGEND_OUTLINK = _mouseOutCallback;
        var _legend = legend(_svg,_config,_legendData);
        _legend.render();

        //标题
        var _title = title();
        _title.render(_svg,_config);

    }
    /**
     *  画柱体方法
     * @param conf 合并后的config
     * @param svg    画板
     * @param series 柱子数据
     * @param xAxis  x轴信息，包含刻度步长，刻度数，比例尺
     * @param yAxis  y轴信息，包含刻度步长，刻度数，比例尺
     */
    _bar.renderRect = function(conf,series,svg,xAxis,yAxis){
        _tag++;
        if(_tag===1){
            //添加蒙板，限定柱子显式区域,高度为整个svg，宽度为坐标轴x轴长度
            var clipWidth = function(){
                if(_barType==="pillar"){
                    return _config.canvas.width-_config.canvas.margins.left-_config.canvas.margins.right;
                }else{
                    return _config.canvas.width;
                }
            }();
            var clipHeight = function(){
                if(_barType==="pillar"){
                    return _config.canvas.height;
                }else{
                    return _config.canvas.height-_config.canvas.margins.top-_config.canvas.margins.bottom;
                }
            }();
            var clipX = function(){
                if(_barType==="pillar"){
                    return 0;
                }else{
                    return -_config.canvas.margins.left;
                }
            }();
            var clipY = function(){
                if(_barType==="pillar"){
                    return -_config.canvas.margins.top;
                }else{
                    return 0;
                }
            }();
            svg.append("defs")
                .append("clipPath")
                .attr("id","clip")
                .attr("x",clipX)
                .attr("y",clipY)
                .attr("width",clipWidth)
                .attr("height",clipHeight)
                .append("rect")
                .attr("x",clipX)
                .attr("y",clipY)
                .attr("width",clipWidth)
                .attr("height",clipHeight);
        }
        var lay = layout();//数据转换对象
        //复制series数组，为以后操作不修改series数据,真正用于显式的数据
        _tempData = _utils.cloneObject(series);
        //处理数据，1、在数组最前边插入一组柱子，在addData方法动画效果最前面柱子消失动画
        for(var m=0;m<_tempData.length;m++){
            _tempData[m].data.splice(0,0,"");
        }
        var con = lay.conversion(_tempData);//数据转换返回值[[数据data转换并变换数序后的series数组],刻度内柱子数]
        var layers = con[0];//layout转换后数据
        _barsNum = con[1];//每个刻度中柱子数
        //处理数据，1、修改数据tag属性值，绑定数据时的key值
        for(var i=0;i<layers.length;i++){
            for(var j=0;j<layers[i].data.length;j++){
                layers[i].data[j].tag += _tag;
            }
        }
        var xScale = xAxis.getScale,//x轴比例尺
            yScale = yAxis.getScale;//y轴比例尺
        if(series.length<=0){
            return false;
        }
        _layer = svg
            .selectAll(".layer")
            .data(layers);
        _layer.enter().insert("g")
            .attr("class", "layer")
            //坐标平移
            .attr("transform","translate(" + conf.canvas.margins.left + ","
                + (conf.canvas.margins.top)+ ")")
            .style("fill", function(d, i) {return d.itemStyle.normal.color; })
            .attr("clip-path","url(#clip)");
        var style = [];//存放样式数据，设置柱子样式时读取
        _rect = _layer.selectAll("rect")
            .data(function(d) {style.push(d); return d.data; },
            function(d){
                if(_userName!=="renderAddData"){
                    return d.x;
                }else{
                    return d.tag;
                }
            });
        _rect.enter().insert("rect")
            //设置柱体宽度,当前每组柱子都可设置间隔，按第一组设置数据画柱子**
            .attr("id",function(d,i,j){return _tempData[j].name})
            .attr("width", function(d){
                if(_barType==="pillar"){
                    _barWidth = _categoryStep*(1-_cloneBars[0].barCategoryGap)/(_barsNum+(_barsNum-1)*_cloneBars[0].barGap);
                    _outer = _categoryStep*_cloneBars[0].barCategoryGap/2;
                    _inner = _barsNum<=1?0:_barWidth*_cloneBars[0].barGap/(_barsNum-1);
                    if(typeof(d.y)!=="number"){
                        return _barWidth-_strokeWidth;
                    }else{
                        return _barWidth;
                    }
                }else{
                    if(_tag===1){
                        return 0;
                    }else{
                        if(typeof(d.y)!=="number"){
                            return _barHeight;
                        }else if(d.y<0){
                            return Math.abs(xScale(0)-xScale(d.y));
                        }else{
                            return xScale(d.y)-xScale(0);
                        }
                    }
                }
            })
            //设置柱体高度，动画效果，从x轴变高
            .attr("height",function(d){
                if(_barType==="pillar"){
                    if(_tag===1){
                        return 0;
                    }else{
                        if(typeof(d.y)!=="number"){
                            return _barHeight;
                        }else if(d.y<0){
                            return Math.abs(yScale(d.y)-yScale(0));
                        }else{
                            return yScale(0) - yScale(d.y);
                        }
                    }
                }else{
                    _barWidth = _categoryStep*(1-_cloneBars[0].barCategoryGap)/(_barsNum+(_barsNum-1)*_cloneBars[0].barGap);
                    _outer = _categoryStep*_cloneBars[0].barCategoryGap/2;
                    _inner = _barsNum<=1?0:_barWidth*_cloneBars[0].barGap/(_barsNum-1);
                    if(typeof(d.y)!=="number"){
                        return _barWidth-_strokeWidth;
                    }else{
                        return _barWidth;
                    }
                }
            })
            //设置x坐标
            .attr("x", function(d,i,j){
               if(_barType==="pillar"){//柱状图设置x坐标
                   if(_tag==1||_userName!=="renderAddData"){
                       if(typeof(d.y)!=="number"){
                           return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-3*_categoryStep/2+_strokeWidth/2;//右移白框线宽
                       }else{
                           return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-3*_categoryStep/2;
                       }
                   }else{
                       if(typeof(d.y)!=="number"){
                           return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-_categoryStep/2+_strokeWidth/2;//右移白框线宽
                       }else{
                           return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-_categoryStep/2;
                       }
                   }
               }else{//条形图设置x坐标
                   if(_tag===1){
                       return xScale(0);
                   }else{
                       if(typeof(d.y)!=="number"){
                           if(d.y0>0){
                               return xScale(d.y0);
                           } else if(d.y0<0){
                               return xScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                           } else {
                               //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                               if(_maxmin[0]>0&&_maxmin[0]>=Math.abs(_maxmin[1])){
                                   return xScale(d.y0);
                               }else{
                                   return xScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                               }
                           }
                       }else{
                           return d.y>=0?xScale(d.y0):xScale(d.y0+ d.y);
                       }
                   }
               }
            })
            //设置y坐标，动画效果，从x轴变高
            .attr("y", function(d,i){
                if(_barType==="pillar"){
                    if(_tag===1){
                        return yScale(0);
                    }else{
                        if(typeof(d.y)!=="number"){
                            if(d.y0>0){
                                return yScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            } else if(d.y0<0){
                                return yScale(d.y0)+_barHeight*parseFloat(d.y);
                            } else {
                                //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                                if(_maxmin[0]>0&&_maxmin[0]>=Math.abs(_maxmin[1])){
                                    return yScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                                }else{
                                    return yScale(d.y0)+_barHeight*(parseFloat(d.y));
                                }
                            }
                        }else{
                            return d.y>=0?yScale(d.y0 + d.y):yScale(d.y0);
                        }
                    }
                }else{
                       if(_tag==1||_userName!=="renderAddData"){
                           if(typeof(d.y)!=="number"){
                               return yScale(0)-_categoryStep*i-_outer- d.x0*_inner- (d.x0+1)*_barWidth+3*_categoryStep/2+_strokeWidth/2;
                           }else{
                               return yScale(0)-_categoryStep*i-_outer- d.x0*_inner- (d.x0+1)*_barWidth+3*_categoryStep/2;
                           }
                       }else{
                           if(typeof(d.y)!=="number"){
                               return yScale(0)-_categoryStep*i-_outer- d.x0*_inner- (d.x0+1)*_barWidth+_categoryStep/2+_strokeWidth/2;
                           }else{
                               return yScale(0)-_categoryStep*i-_outer- d.x0*_inner- (d.x0+1)*_barWidth+_categoryStep/2;
                           }
                       }
                }
            })
            //设置透明度
            .style("opacity", function(d,i,j){
                //判断特殊柱子，设置透明度
                if(typeof(d.y)==="number"){
                    return _tempData[j].opacity;
                }else{
                    return _barOpacity;
                }
            })
            .style("stroke",function(d,i,j){
                //判断特殊柱子，设置边线颜色
                if(typeof(d.y)==="number"){
                    return _tempData[j].itemStyle.normal.barBorderColor;
                }else{
                    return _strokeColor;
                }
            })
            .style("stroke-width",function(d,i,j){
                //判断特殊柱子，设置边线宽度
                if(typeof(d.y)==="number"){
                    return _tempData[j].itemStyle.normal.barBorderWidth;
                }else{
                    return _strokeWidth;
                }
            })
            .style("fill",function(d,i,j){
                //判断特殊柱子，设置柱子颜色
                if(typeof(d.y)!=="number"){
                    return _specialBarColor;
                }else{
                    return _tempData[j].itemStyle.normal.color;
                }
            })
            .attr("rx",function(d,i,j){
                return _tempData[j].itemStyle.normal.barBorderRadius
            })
            .attr("ry",function(d,i,j){
                return _tempData[j].itemStyle.normal.barBorderRadius
            })
            .on("mouseover",function(d,i,j){
                //设置鼠标选中样式
                if(typeof(d.y)==="number"){
                    d3.select(this)
                        .style("fill", _tempData[j].itemStyle.emphasis.color)
                        .style("stroke",_tempData[j].itemStyle.emphasis.barBorderColor)
                        .style("stroke-width",_tempData[j].itemStyle.emphasis.barBorderWidth)
                        .attr("rx",_tempData[j].itemStyle.emphasis.barBorderRadius)
                        .attr("ry",_tempData[j].itemStyle.emphasis.barBorderRadius);
                }
            })
            .on("mouseout",function(d,i,j){
                //设置鼠标离开样式
                if(typeof(d.y)==="number"){
                    d3.select(this)
                        .style("fill",_tempData[j].itemStyle.normal.color)
                        .style("stroke",_tempData[j].itemStyle.normal.barBorderColor)
                        .style("stroke-width",_tempData[j].itemStyle.normal.barBorderWidth)
                        .attr("rx",_tempData[j].itemStyle.normal.barBorderRadius)
                        .attr("ry",_tempData[j].itemStyle.normal.barBorderRadius);
                }
            });
        //动画效果，柱状图柱子变化x,height  条形图变化y,width
        _rect.transition()
            .delay(function(d, i) { return i * _config.animation.dur/10; })
            //根据数据正负值判断并设置y或x坐标位置
            .attr(getXY(), function(d) {
                if(_barType==="pillar"){
                    if(typeof(d.y)!=="number"){
                        if(d.y0>0){
                            return yScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                        } else if(d.y0<0){
                            return yScale(d.y0)+_barHeight*parseFloat(d.y);
                        } else {
                            //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                            if(_maxmin[0]>=Math.abs(_maxmin[1])){
                                return yScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            }else{
                                return yScale(d.y0)+_barHeight*(parseFloat(d.y));
                            }
                        }
                    }else{
                        return d.y>=0?yScale(d.y0 + d.y):yScale(d.y0);
                    }
                }else{
                    if(typeof(d.y)!=="number"){
                        if(d.y0>0){
                            return xScale(d.y0)+_barHeight*parseFloat(d.y);
                        } else if(d.y0<0){
                            return xScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                        } else {
                            //数据最大值为正数，并且绝对值大于最小值时，特殊柱体画在正轴方向
                            if(_maxmin[0]>=Math.abs(_maxmin[1])){
                                return xScale(d.y0)+_barHeight*parseFloat(d.y);
                            }else{
                                return xScale(d.y0)-_barHeight*(parseFloat(d.y)+1);
                            }
                        }
                    }else{
                        return d.y>=0?xScale(d.y0):xScale(d.y0+ d.y);
                    }
                }
            })
            //柱状图改变高度，条形图改变宽度
            .attr(attributeName(),function(d) {
                if(_barType==="pillar"){
                    if(typeof(d.y)!=="number"){
                        return _barHeight;
                    }else if(d.y<0){
                        return Math.abs(yScale(d.y)-yScale(0));
                    }else{
                        return yScale(0) - yScale(d.y);
                    }
                }else{
                    if(typeof(d.y)!=="number"){
                        return _barHeight;
                    }else{
                        return Math.abs(xScale(d.y)-xScale(0));
                    }
                }
            });
        //添加数据标签文字
        var textWidth = 0,//数据标签文字宽度
            textHeight = 0;//数据标签文字高度
        var oldX,oldY;//存放本次文字标签位置，下次位置调整使用
        _layerText = svg.selectAll(".layerText")
            .data(layers,function(d){return d.name;});
        _layerText.enter().insert("g")
            .attr("class", "layerText")
            .attr("transform","translate(" + conf.canvas.margins.left + ","
                + (conf.canvas.margins.top)+ ")")
            .attr("clip-path","url(#clip)");

        _text = _layerText.selectAll("text")
            .data(function(d) {return d.data; },
            function(d){
                //判断调用者
                if(_userName!=="renderAddData"){
                    return d.x;
                }else{
                    return d.tag;
                }
            })
        _text.enter().append("text")
            .attr("id",function(d){
                return d.tag
            })
            .text(function(d,i,j){
                if(_tempData[j].itemStyle.normal.label.show===false||typeof(d.y)!=="number"){
                    return "";
                }else{
                    return d.y;
                }
            })
            .attr("font-size", _config.textStyle.fontSize)
            .attr("font-family",_config.textStyle.fontFamily)
            .attr("decoration",_config.textStyle.decoration)
            .attr("clip-path","#clip")
            .attr("x",oldX = function(d,i,j){
                if(_barType==="pillar"){//柱状图设置文字标签x坐标
                    textWidth = this.getBBox().width;
                    textHeight = this.getBBox().height;
                    //当第一次调用或renderAddData方法调用renderRect时，柱体向左偏移一个x坐标刻度尺度
                    if(_tag==1||_userName!=="renderAddData"){
                        if(typeof(d.y)!=="number"){
                            return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-3*_categoryStep/2+_strokeWidth/2+_barWidth/2;
                        }else{
                            return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-3*_categoryStep/2+(_barWidth-textWidth)/2;
                        }
                    }else{
                        if(typeof(d.y)!=="number"){
                            return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-_categoryStep/2+_strokeWidth/2+_barWidth/2;
                        }else{
                            return xScale(0)+_categoryStep*i+_outer+ d.x0*(_inner+_barWidth)-_categoryStep/2+(_barWidth-textWidth)/2;
                        }
                    }
                }else{//条形图设置文字标签x坐标
                    if(_tag===1){
                        return xScale(0);
                    }else{
                        if(typeof(d.y)!=="number"){
                            return xScale(0);
                        }else if(_tempData[j].itemStyle.normal.label.position==="right"||_tempData[j].itemStyle.normal.label.position==="top"){
                            return d.y>=0?xScale(d.y0 + d.y):xScale(d.y0);
                        }else if(_tempData[j].itemStyle.normal.label.position==="left"||_tempData[j].itemStyle.normal.label.position==="bottom"){
                            return d.y>=0?xScale(d.y0)-this.getBBox().width:xScale(d.y0+ d.y)-this.getBBox().width;
                        }else if(_tempData[j].itemStyle.normal.label.position==="inside"){
//                            return d.y>=0?xScale(d.y0)+(xScale(d.y)-this.getBBox().width)/2:xScale(d.y0)-(xScale(d.y)-this.getBBox().width)/2;
                            return d.y>=0?xScale(d.y0)+(xScale(d.y)-this.getBBox().width)/2:xScale(d.y0)-(xScale(d.y)+this.getBBox().width)/2;
                        }
                    }
                }
            })
            .attr("y",oldY = function(d,i,j){
                if(_barType==="pillar"){//柱状图设置文字标签y坐标
                    if(_tag===1){
                        return yScale(0)
                    }else{
                        if(typeof(d.y)!=="number"){
                            return yScale(0);
                        }else if(_tempData[j].itemStyle.normal.label.position==="top"||_tempData[j].itemStyle.normal.label.position==="right"){
                            return d.y>=0?yScale(d.y0 + d.y):yScale(d.y0);
                        }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                            return d.y>=0?yScale(d.y0)-this.getBBox().height:yScale(d.y0)-this.getBBox().height;
                        }else if(_tempData[j].itemStyle.normal.label.position==="inside"){
                            return d.y>=0?yScale(d.y0)-this.getBBox().height:yScale(d.y0);
                        }
                    }
                }else{//条形图设置文字标签y坐标
                    textWidth = this.getBBox().width;
                    textHeight = this.getBBox().height;
                    //当第一次调用或renderAddData方法调用renderRect时，柱体向左偏移一个x坐标刻度尺度
                    if(_tag==1||_userName!=="renderAddData"){
                        if(typeof(d.y)!=="number"){
                            return yScale(0)-_categoryStep*i-_outer- d.x0*(_inner+_barWidth)+3*_categoryStep/2-_strokeWidth/2+_barWidth/2;
                        }else{
                            return yScale(0)-_categoryStep*i-_outer- d.x0*(_inner+_barWidth)+3*_categoryStep/2-(_barWidth-textHeight)/2;
                        }
                    }else{
                        if(typeof(d.y)!=="number"){
                            return yScale(0)-_categoryStep*i-_outer- d.x0*(_inner+_barWidth)+_categoryStep/2-_strokeWidth/2+_barWidth/2;
                        }else{
                            return yScale(0)-_categoryStep*i-_outer- d.x0*(_inner+_barWidth)+_categoryStep/2-(_barWidth-textHeight)/2;
                        }
                    }
                }
            })
            //将当前的x坐标和字符宽度赋给标签属性，为下一次位置调整使用
            .attr("oldX",oldX)
            .attr("oldY",oldY)
            .attr("oldWidth",function(d){return this.getBBox().width;})
            .attr("oldHeight",function(d){return this.getBBox().height;})
            .attr("fill",function(d,i,j){
                if(_tempData[j].itemStyle.normal.label.position!=="inside"){
                    return _tempData[j].itemStyle.normal.color;
//                    return "black";
                }else{
                    return _tempData[j].itemStyle.normal.label.textStyle.color;
//                    return "black";
                }
            });
        _text.transition()
            .delay(function(d, i) { return i * _config.animation.dur/10; })
            .attr("y", function(d,i,j){
                if(_barType==="pillar"){
                    //                return yScale(d.y0 + d.y)+(d.y>=0?0:textHeight);
                    if(typeof(d.y)!=="number"){
                        return yScale(0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="top"||_tempData[j].itemStyle.normal.label.position==="right"){
                        return d.y>=0?yScale(d.y0 + d.y):yScale(d.y0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                        return d.y>=0?yScale(d.y0)+this.getBBox().height:yScale(d.y0+ d.y)+this.getBBox().height;
                    }else if(_tempData[j].itemStyle.normal.label.position==="inside"){
                        return yScale(d.y0+ d.y/2)/*-this.getBBox().height*/;
                    }
                }else{
                    return this.getAttribute("oldY");
                }
            })
            .attr("x",function(d,i,j) {
                if(_barType==="pillar"){
                    return this.getAttribute("oldX")-(this.getBBox().width-this.getAttribute("oldWidth"))/2;
                }else{
                    if(typeof(d.y)!=="number"){
                        return yScale(0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="top"||_tempData[j].itemStyle.normal.label.position==="right"){
                        return d.y>=0?xScale(d.y+ d.y0):xScale(d.y0);
                    }else if(_tempData[j].itemStyle.normal.label.position==="bottom"||_tempData[j].itemStyle.normal.label.position==="left"){
                        return d.y>=0?xScale(d.y0)-this.getBBox().width:xScale(d.y+d.y0)-this.getBBox().width;
                    }else if(_tempData[j].itemStyle.normal.label.position==="inside"){
//                        return d.y>=0?xScale(d.y+ d.y0)-(xScale(d.y)-this.getBBox().width)/2:xScale(d.y0)-(xScale(d.y)-this.getBBox().width)/2;
                        return d.y>=0?xScale(d.y0)+(xScale(d.y)-this.getBBox().width)/2:xScale(d.y0)-(xScale(d.y)+this.getBBox().width)/2;
                    }
                }
            });
        _userName = "";
    };

    /**
     * 获取最大值最小值方法，传入json，返回[max,min]数组
     * @param datas
     */
    function getMaxMin(datas){
        var barOpts = [];
        //barOrder内数据为  name 、name_stacke 、 name_cover
        var barOrder = [];
        var groupBars = [];//存放分组柱子数据data属性的数组
        var stackBars = [];//存放堆叠柱子数据data属性的数组
        var coverBars = [];//存放层叠柱子数据data属性的数组
        //数据分类，将不同类的柱子放在各自的数组中
        datas.forEach(function(d){
            if(d.stack===null&& d.cover===null){
                barOrder.push(d.name);
                groupBars.push(d.data);
            } else if(d.stack!==null){
                //stack属性不为空，如果之前已经出现过相同的stack值，将此data放到之前的数组中，否则放到新的数组
                var i = barOrder.indexOf(d.stack);
                if(i===-1){
                    barOrder.push(d.stack);
                    var newStack = [];//存放stack值相同的data数组
                    newStack.push(d.data);
                    stackBars.push(newStack);
                }else{
                    stackBars[i].push(d.data)
                }
            } else {
                barOrder.push(d.cover);
                coverBars.push(d.data);
            }
        });
        var extremum = [];//存放多个不同数组计算出来的最大值最小值的二维数组
        if(groupBars.length>0){
            //获取分组柱子的最大最小值数组
            extremum.push(getNormalMaxMin(groupBars));
        }
        if(stackBars.length>0){
            //获取堆叠柱子的最大最小值数组
            extremum.push(getStackMaxMin(stackBars));
        }
        if(coverBars.length>0){
            //获取层叠柱子的最大最小值数组（与分组显式相同）
            extremum.push(getNormalMaxMin(coverBars));
        }
        return extremum.length>0?getNormalMaxMin(extremum):[0,0];
    }

    /**
     * 计算stack数据最大值最小值，传入参数[ [[],[]],[[],[]] ]三维数组，其中每一个二维数组为一组堆叠数据
     * @param data 包含堆叠数据的数组
     * @returns {Array}  数组[最大值，最小值]
     */
    function getStackMaxMin(data){
        var minMaxArray = [];
        for(var i=0;i<data.length;i++){
            var max = [];//同属一个堆叠柱子的数据正值之和的数组
            var min = [];//同属一个堆叠柱子的数据负值之和的数组
            for(var k=0;k<data[i].length;k++){
                if(k==0){//第一次循环 max[]和min[]为空
                    for(var j=0;j<data[i][k].length;j++){
                        if(typeof(data[i][k][j])==="number"){
                            min.push(data[i][k][j]);
                            max.push(data[i][k][j]);
                        }else{
                            min.push(0);
                            max.push(0);
                        }
                    }
                } else {//第一次之后循环 max[]和min[]不为空
                    for(var j=0;j<data[i][k].length;j++){
                        if(data[i][k][j]==="-"){
                        }else if(typeof("number"===data[i][k][j])&&data[i][k][j]>=0){
                            if(typeof(max[j])==="number"&&max[j]>=0){
                                max[j] += data[i][k][j];
                            }else{
                                max[j] = data[i][k][j];
                            }
                        }else{
                            if(typeof(min[j])==="number"&&min[j]<=0){
                                min[j] += data[i][k][j];
                            }else{
                                min[j] = data[i][k][j];
                            }
                        }
                    }
                }
            }
            //每一组stack柱子最值
            var d = [max,min];
            var m = getNormalMaxMin(d);
            minMaxArray.push(m);
        }
        return getNormalMaxMin(minMaxArray);
    };

    /**
     * 计算二维数组中的最大值最小值
     * @param data [[],[]]二维数组
     * @returns {Array}返回值类型[max,min]
     */
    function getNormalMaxMin(data){
        for(var i=0;i<data.length;i++){
            var max,min;//存放最大值最小值
            for(var j=0;j<data[i].length;j++){
                if(typeof(max) == "undefined"&&typeof(min) == "undefined"&&typeof(data[i][j])=="number"){
                    max = data[i][j];
                    min = data[i][j];
                }else{
                    if(max<data[i][j]){
                        max = data[i][j];
                    }
                    if(min>data[i][j]){
                        min = data[i][j];
                    }
                }
            }
        }
        return [max,min];
    };

    /**
     * 数据校验方法
     * 1、x和y轴信息
     * 2、series数组长度大于0
     * 3、检验数据格式，判断是条形图还是柱状图
     * @param opt
     * @returns {boolean}
     */
    function checkout(opt){
        //包含xy轴信息&&xy轴数据&&柱状图数据
        if(typeof(opt.xAxis)!=="undefined"&&typeof(opt.yAxis)!=="undefined"
            &&(typeof(opt.xAxis.data)!=="undefined"||typeof(opt.yAxis.data)!=="undefined")
            /*&&opt.xAxis.data.length>0*/
            &&typeof(opt.series)!=="undefined"&&opt.series.length>0){
            return true;
        }
        return false;
    }

    /**
     * 数据预处理，比较data数据长度，删除多余，‘-’补足缺少，string转化‘-’
     * @param series 用户数据
     * @param tickNum x轴刻度数（数据data正确长度）
     * @returns {*}
     */
    function pretreatment(series,tickNum){
        for(var n=0;n<series.length;n++){
            var standardData = [];//处理后的标准数据
            for(var i=0;i<tickNum;i++){
                var t = (series[n].data)[i];
                if(typeof(t)==="number"){
                    standardData.push(series[n].data[i]);
//                    standardData.splice(0,0,series[n].data[i]);
                }else{
                    standardData.push('-');
//                    standardData.splice(0,0,'-');
                }
            }
            series[n].data = standardData;
        }
        return series;
    };

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
        _series.forEach(function(d){
            d = _utils.merge(d,_config.bar,false);
            //判断用户属否设置颜色，如果未设置取柱体颜色
            if(d.itemStyle.normal.color===null){
                d.itemStyle.normal.color = conf.color[index];
            }
            if(d.itemStyle.emphasis.color===null){
                //柱体突出显式颜色设置
                d.itemStyle.emphasis.color = d3.rgb(conf.color[index]).brighter(0.9);
            }
            var legend = {};//图例样式
            //数据名称
            legend.name = d.name;
            //颜色
            legend.color = d.itemStyle.normal.color;
            //图形标识
            legend.type = _config.CHART_TYPE_BAR;
            _legendData.push(legend);
            index++;
        });
        //复制一份完整数据保存
        _cloneBars = _utils.cloneObject(_series);
    }

    /**
     * 图例回调函数调用，传入name值，判断当前显式的数据中有没有，如果有就删除（隐藏），如果没有就从原数据（_cloneBars）中获取添加（显式）
     * @param dataName 图例传入的参数
     */
    function setShowData(dataName){
        var flag = 0;//标识bars数组中是否有该name的数据0：没有1：有
        for(var i=0;i<_series.length;i++){
            if(_series[i].name===dataName){
                _series.splice(i,1);
                flag = 1;
                break;
            }
        }
        if(flag==0){
            var newSeries = _utils.cloneObject(_cloneBars);
            //判断是否是在所有都隐藏的基础上显式一组数据
            if(_series.length<=0){
                for(var k=0;k<newSeries.length;k++){
                    if(newSeries[k].name===dataName){
                        _series.push(newSeries[k]);
                        break;
                    }
                }
            }else{
                var nameList = [];
                for(var x=0;x<_series.length;x++){
                    nameList.push(_series[x].name);
                }
                nameList.push(dataName);
                _series = [];
                for(var n=0;n<newSeries.length;n++){
                    if(nameList.indexOf(newSeries[n].name)!==-1){
                        _series.push(newSeries[n]);
                    }
                }
            }
        }
    }
    return _bar;
}