'use strict';
/**
 *
 * 区域缩放控制器
 * @param svg
 * @param config
 * @returns dataZoom
 * @author  chenxiushen1@163.com (chenxiushen)
 * @date  2014-12-29
 * @example
 *      var _dataZoom = dataZoom(option ，svg , config);
 *      _dataZoom.render();
 *
 */

/**
 * 
 * 目前已知问题： 
 * 1、右边的刷子，移动到最右边，突出一块，目前无解！
 * 
 * 
 */

function dataZoom(option , svg , config) {

    
    var _dataZoom = {};
        
    //接收参数，赋值
    var _config = config,
        _option = option,
        _svg = svg,
	    _utils = utils();

    _utils.merge(_config,_option);    //合并数据

    //接收config中配置参数
    var _width = _config.canvas.width,
        _height = _config.canvas.height,
        _margins = _config.canvas.margins,
        _zoomHeight = 30,    //缩放轴的高度
        _min = 0,    //坐标轴最小值
        _max = 100,    //坐标轴最大值
        // _start = _config.dataZoom.selectstart,    //选中区域开始位置
        // _end = _config.dataZoom.selectend,    //选中区域结束位置
        _start = 0,
        _end = 10,
        _axisType = "value",    //坐标轴类型
        _handleColor = _config.dataZoom.handleColor,    //手柄颜色
        _dataBackgroundColor = _config.dataZoom.dataBackgroundColor,    //数据缩略背景颜色
        _backgroundColor = _config.dataZoom.backgroundColor,    //背景颜色，默认透明
        _fillerColor = _config.dataZoom.fillerColor;    //选择区域填充颜色
	
    //内部全局变量
    var _brush,
        _left,
        _right,
        _brushg,
        _valueScale,
        _dateScale,
        _handleWidth = 10,    //缩放手柄的宽度
        _range = _width - _margins.left - _margins.right,
        _centering = false,
        _center,
        _parseDate,
        _alpha = .2;

    
    /**
     * 绘制缩放轴
     */
    _dataZoom.render = function render() {

        _parseDate = d3.time.format("%Y-%m-%d").parse;

        _valueScale = d3.scale.linear()
                .domain([_min,_max])
                .range([0,_range]);

        _dateScale = d3.time.scale()
            .domain([new Date(2013,0,1), new Date(2014,0,1)])
            .range([0, _range]);
		 
         //定义刷子
        _brush = d3.svg.brush()   
            .x(_dateScale)
            .extent([new Date(2013,0,1), new Date(2013,1,1)])
            .on("brush", brushmove);

        //绘制坐标轴
        _svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+_margins.left+"," + axisPosition() + ")")
            .attr("shape-rendering","crispEdges")
            .attr("fill","none")
            .attr("stroke",_handleColor)
            .call(d3.svg.axis()
                .scale(_dateScale)
                .orient("bottom")
                .tickFormat(d3.time.format("%Y-%m-%d")));

        //定义整个缩放轴区域
        _brushg = _svg.append("g")    
            .attr("class", "brush")
            .attr("width", _range)
            .attr("height", 30)
            .attr("fill-opacity",".125")
            .attr("shape-rendering","crispEdges")
            .attr("transform", "translate("
                + _margins.left + ","
                + zoomPosition() +")")
            .call(_brush);

         //定义缩放区域两边刷新手柄
        _brushg.selectAll(".resize").append("rect")   
            .attr("width",_handleWidth)
            .attr("fill-opacity","1")
            .style("fill",_handleColor)
            .attr("stroke",_handleColor)
            .attr("stroke-width","1px");

        //定义中间矩形
        _brushg.selectAll("rect")  
            .attr("fill-opacity","1")   
            .attr("height", _zoomHeight)
            .attr("fill",_fillerColor);

        //定义左侧空白区域
        _left = _brushg.append("rect")    
            .attr("height",_zoomHeight)
            .attr("fill-opacity","0")
            .attr("fill",_backgroundColor)
            .attr("stroke",_handleColor)
            .attr("shape-rendering","crispEdges")
            .on("mousedown.brush", brushcenter)
            .on("touchstart.brush", brushcenter);

        //定义右侧空白区域
        _right = _brushg.append("rect")
            .attr("height",_zoomHeight)
            .attr("fill-opacity","0")
            .attr("stroke",_handleColor)
            .attr("fill",_backgroundColor)
            .attr("shape-rendering","crispEdges")
            .on("mousedown.brush", brushcenter)
            .on("touchstart.brush", brushcenter);

        brushstart();
        brushmove();
        _brushg.call(_brush.event);
    }

    /**
     * 缩放轴刷子开始移动事件
     */
    var tempExtent = [];
    function brushstart() {
        var noParseDate = _brush.extent();
        tempExtent[0] = d3.time.day.floor(noParseDate[0]);
        tempExtent[1] = d3.time.day.ceil(noParseDate[1]);
        
        var d = svg.classed("selecting", true);
    }

    /**
     * 点击两边空白区域时，移动区域
     */
    function brushcenter(){
        var self = d3.select(window),
            target = d3.event.target,
            extent = _brush.extent(),
            size = extent[1].valueOf() - extent[0].valueOf(),
            domain = _dateScale.domain(),
            x0 = domain[0].valueOf() + size / 2,
            x1 = domain[1].valueOf() - size / 2;

        recenter(true);
        brushmove();

        if (d3.event.changedTouches) {
            self.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
        } else {
            self.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
        }

        function brushmove() {
            d3.event.stopPropagation();
            var temp = _dateScale.invert(d3.mouse(target)[0])
            _center = Math.max(x0, Math.min(x1, temp.valueOf()));
            recenter(false);
        }

        function brushend() {
            brushmove();
            self.on(".brush", null);
        }
    }

    /**
     * 重新计算刷子的中心区域，并且向点击的位置移动
     * @param  {Boolean} smooth 是否平滑的平移到点击位置
     */
    function recenter(smooth) {
        if (_centering){
            return;
        } 
            
        if (!smooth){
            return void tween(1);
        }
        _centering = true;

        function tween(alpha) {
            var extent = _brush.extent(),
                size = extent[1].valueOf() - extent[0].valueOf(),
                center1 = _center * alpha + (extent[0].valueOf() + extent[1].valueOf()) / 2 * (1 - _alpha),
                date1 = center1 - size / 2,
                date2 = center1 + size / 2
            _brushg.call(_brush.extent([new Date(date1), new Date(date2)]))
                    .call(_brush.event);

            return !(_centering = Math.abs(center1 - _center) > 86400000);
        }

        d3.timer(function() {
            return tween(_alpha);
        });
    }

    /**
     * 缩放轴刷子移动事件
     */
    var count = 0;
    function brushmove() {
        count++;
        var noParseDate = _brush.extent();
        var extent = [];
        var temp = [];

        extent[0] = dateFormat(noParseDate[0]);
        extent[1] = dateFormat(noParseDate[1]);
        var status = "";    //
        if(tempExtent[0].valueOf() < noParseDate[0].valueOf() 
            && tempExtent[1].valueOf() < noParseDate[1].valueOf()){    //长度不变，向右拖动
            status = "all_right";
        }else if(tempExtent[0].valueOf() > noParseDate[0].valueOf() 
            && tempExtent[1].valueOf() > noParseDate[1].valueOf()){    //长度不变，向左拖动
            status = "all_left";
        }else if(tempExtent[0].valueOf() === noParseDate[0].valueOf() 
            && tempExtent[1].valueOf() < noParseDate[1].valueOf()){    //左边不变，右边向右拖动 
            status = "right_right";
        }else if(tempExtent[0].valueOf() === noParseDate[0].valueOf() 
            && tempExtent[1].valueOf() > noParseDate[1].valueOf()){    //左边不变，右边向左拖动
            status = "right_left";
        }else if(tempExtent[0].valueOf() < noParseDate[0].valueOf() 
            && tempExtent[1].valueOf() === noParseDate[1].valueOf()){    //右边不变，左边向右拖动
            status = "left_right";
        }else if(tempExtent[0].valueOf() > noParseDate[0].valueOf() 
            && tempExtent[1].valueOf() === noParseDate[1].valueOf()){    //右边不变，左边向左拖动
            status = "left_left";  
        }

        tempExtent = _brush.extent();

        _left.attr("width",_dateScale(noParseDate[0]));
        if(_range - _dateScale(noParseDate[1]) - 10 < 0){
            _right.attr("width",0);
        }else{
            _right.attr("width",_range - _dateScale(noParseDate[1]) - 10);
        }
        _right.attr("x",_dateScale(noParseDate[1]) + 10);
        _config.EVENT.DATA_ZOOM(extent,status);    //拖动刷子回调，参数为两边刷子经过比例尺转换后在x轴上的位置数组
    }

    /**
     * 缩放轴刷子结束移动事件
     */
    function brushend() {
        svg.classed("selecting", !d3.event.target.empty());
    }

    /**
     * 确定缩放轴纵向位置
     * @return {[type]} position 缩放轴纵向位置
     */
    function zoomPosition() {
        var position = _height - _margins.top - _margins.bottom - 20/*-_legendH*/;
        return position
    }

    /**
     * 确定坐标轴的位置
     * @return {[type]} position 坐标轴纵向位置
     */
    function axisPosition(){
        var position = _height - _margins.top - _margins.bottom + 10/*-_legendH*/;
        return position;
    }

    function dateFormat(date){
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate();
        return new Date(year,month,day);
    }

    /**
     * 判断两个时间是否在同一天内
     * @param  {Date}  firstDate  
     * @param  {Date}  secondDate 
     * @return {Boolean}
     */
    function isOneDay(firstDate,secondDate){
        var firstYear = firstDate.getFullYear(),
            firstMonth = firstDate.getMonth(),
            firstDay = firstDate.getDate();

        var secondYear = secondDate.getFullYear(),
            secondMonth = secondDate.getMonth(),
            secondDay = secondDate.getDate();

        var subYear = firstYear - secondYear;
        var subMonth = firstMonth - secondMonth;
        var subDay = firstDay - secondDay;
        if( Math.abs(subYear)===0 && Math.abs(subMonth)===0
            && Math.abs(subDay)<1){
            return true;
        }else{
            return false;
        }
    }
    return _dataZoom;
}
