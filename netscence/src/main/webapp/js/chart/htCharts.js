"use strict";
/**
 * 图形初始化方法
 * @returns {{}}
 * @time 2014-12-17
 * @param parentId 父元素的id名称。如：svg创建在一个div中。<div id="foo"></div>,parentId就需要设置为"foo"
 * @param option  传入的自定义参数
 *
 * @example
 * //画饼图
 * var opt = {
 *      canvas:{
 *          width:700,
 *          height:500
 *      },
 *      series:[{
            data:[{data:5,weight:0.5,name:"联盟广告"},
                {data:10,weight:0.5,name:"直接访问"},
                {data:20,weight:1,name:"邮件营销"},
                {data:30,weight:2,name:"视频广告"},
                {data:40,weight:1,name:"搜索引擎"}]
 * };
 * var chart = htCharts("foo");
 * chart.setOption(opt);
 * chart.render();
 */
function htCharts(parentId,option) {
    var _chart = {};

    var _config ;
    var _utils = utils();

    var _option ;
    var _optionOld ;
    var _chartType ;
    var _theme;
    var _isSettedTheme = false;

    var _svg;
    var _bar,_line,_scatter,_pie,_radar,_area,_chord,_tree,_lineDemo,_gauge;

    /**
     * 设置主题样式，将主题的样式合并的公共配置对象中
     * @param themeName  客户自定义主题
     */
    _chart.setTheme = function(themeName) {
        switch (themeName) {
            case "blue" :
                _theme = blue();
                break;
            case "gray" :
                _theme = gray();
                break;
            case "green":
                _theme = green();
                break;
            case "red"  :
                _theme = red();
                break;
            case "dark" :
                _theme = dark();
                break;
            case "shine":
                _theme = shine();
                break;
            case "split":
                _theme = split();
                break;
            default     :
                _theme = {};  //设置默认主题
                break;
        }
        _isSettedTheme = true;
    };

    /**
     * 设置图表的配置，用于更新配置及数据
     * @param option  配置参数对象
     */
    _chart.setOption = function(option){
        _chartType = option.series[0].type;
        _option = option;
        _optionOld = _utils.cloneObject(option);
    };

    /**
     * 图表绘制
     */

    _chart.render = function () {
        _config = config();

        //如果svg存在，认为是重绘，删除svg后再创建一个新的
        if(_svg){
            _svg.remove();
            createSvg(parentId);
        }else{
            createSvg(parentId);
        }

        //更改样式，及将原用户的配置还原为初始值（因为在图形render的过程中会对_option进行更改,所以需要还原）
        _utils.merge(_config, _theme,true);
        _utils.merge(_option, _optionOld,true);

        //更新svg大小及背景
        updateSvg(_svg);
        //调整边距
        setMargins();

        switch (_chartType) {
            case _config.CHART_TYPE_BAR  :  //画柱状图
                _bar = bar(_svg,_option,_config);
                _bar.render();
                break;
            case _config.CHART_TYPE_LINE : //画折线图
                _area =  areaChart(_option,_svg,_config);
                _area.render();

//                _lineDemo=lineDemo(_option,_svg,_config);
//                _lineDemo.render();
                break;
            case _config.CHART_TYPE_PIE  :   //画饼图
                _pie = pie(_option,_svg,_config);
                _pie.render();
                break;
            case _config.CHART_TYPE_RADAR: //画雷达图
                _radar = radarChart(_svg,_option,_config);
                _radar.render();
                break;
            case _config.CHART_TYPE_SCATTER: //画散点图
                //bubble(_option,_svg).render();
                _scatter = scatter(_option,_svg,_config);
                _scatter.render();
                break;
            case _config.CHART_TYPE_MAP: //画地图
                break;
            case _config.CHART_TYPE_FORCE: //画力学图
                break;
            case _config.CHART_TYPE_CHORD: //画弦图

                _chord = chord(_option,_svg,_config);
                _chord.render();

                break;

            case _config.CHAR_TYPE_TREE: //画树状图
                _tree=tree(_option,_svg,_config);
                _tree.render();
                 break;
            case _config.CHAR_TYPE_GAUGE:  //画仪表盘
                _gauge = gauge(_svg,_option,_config);
                _gauge.render();
                break;
            default     : //默认图形
                break;
        }
    };

    /**
     * 动态加载数据，刷新图表
     * @param data  传入的动态数据
     */
    _chart.loadData = function (data) {
        switch (_chartType) {
            case _config.CHART_TYPE_BAR  :  //画柱状图
                _bar.loadData(data);
                break;
            case _config.CHART_TYPE_LINE : //画折线图
                _area.loadData(data);
                break;
            case _config.CHART_TYPE_PIE  :
                _pie.loadPieData(data);
                break;
            case _config.CHART_TYPE_RADAR: //画雷达图

                break;
            case _config.CHART_TYPE_SCATTER: //画散点图
                _scatter.loadData(data);
                break;
            case _config.CHART_TYPE_MAP: //画地图
                break;
            case _config.CHART_TYPE_FORCE: //画力学图
                break;
            case _config.CHART_TYPE_CHORD: //画弦图
                break;
            case _config.CHAR_TYPE_GAUGE:  //画仪表盘
                _gauge.loadData(data);
                break;
            default     : //默认图形
                break;
        }
    };

    /**
     * 动态加载单个数据，刷新图表
     * @param data  传入的动态数据
     */
    _chart.addData = function (data) {
        switch (_chartType) {
            case _config.CHART_TYPE_BAR  :  //画柱状图
                _bar.addData(data);
                break;
            case _config.CHART_TYPE_LINE : //画折线图
                break;
            case _config.CHART_TYPE_PIE  :
                _pie.addPieData(data);
                break;
            case _config.CHART_TYPE_RADAR: //画雷达图

                break;
            case _config.CHART_TYPE_SCATTER: //画散点图
                _scatter.addData(data);
                break;
            case _config.CHART_TYPE_MAP: //画地图
                break;
            case _config.CHART_TYPE_FORCE: //画力学图
                break;
            case _config.CHART_TYPE_CHORD: //画弦图
            default     : //默认图形
                break;
        }
    };

    /**
     * 创建svg对象
     * @param parentId  svg的父对象的id，即svg创建哪里。如：<div id="foo"></div>
     */
    function createSvg(parentId){
        if(d3.select("#"+parentId).node()){
            _svg = d3.select("#"+parentId).append("svg");
        }else{
            _svg = d3.select("body").append("svg");
        }
    }

    /**
     * 更新svg的尺寸及背景
     * @param svg  被修改的svg
     */
    function updateSvg(svg){
        _utils.merge(_config.canvas,_option.canvas,true);
        svg.attr("height", _config.canvas.height)
            .attr("width", _config.canvas.width)
            .style("background-color",function(){
                return _config.backgroundColor?_config.backgroundColor:"#FFFFFF";
            });
    }

    /**
     * 根据标题及图例的放置位置进行调整margins的数值
     * 因为需要调整的情况烦多，所以目前只支持根据y的情况调整
     * 只是y为top,bottom的，只调整上下边距
     * 当y为center时，只调整左右边距
     */
    function setMargins(){
        _utils.merge(_config.title,_option.title,true);
        _utils.merge(_config.legend,_option.legend,true);


        if((_config.legend.y==="center" && _config.legend.show===true && _config.legend.x==="left")){
            _config.canvas.margins.left = _config.canvas.margins.left + 80;
        }
        if((_config.legend.y==="center" && _config.legend.show===true && _config.legend.x==="right")){
            _config.canvas.margins.right = _config.canvas.margins.right + 80;
        }

        if((_config.title.y==="top" && _config.title.text!=="" && _config.timeline.subtext!=="") ||
            (_config.legend.y==="top" && _config.legend.show===true)){
            _config.canvas.margins.top = _config.canvas.margins.top + 70;
        }
        if((_config.title.y==="bottom" && _config.title.text!=="" && _config.timeline.subtext!=="") ||
            (_config.legend.y==="bottom" && _config.legend.show===true)){
            _config.canvas.margins.bottom = _config.canvas.margins.bottom + 50;
        }
    }

    //初始化参数
    _chart.setOption(option);

    return _chart;
}
