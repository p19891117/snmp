"use strict";
/**
 * 坐标轴组件
 * @example axis(option,svg,config).render();
 * @param option
 * @param svg
 * @param config 用户配置与默认配置合并后的config
 * @returns {{}}
 * @author chen_hao
 * @time 2014-12-17
 */
function axis(option,svg,config) {

    var _config =config;
    var _utils = utils();
    var _opt = option;

    var _xParameters=[], //画x轴所需要的所有参数：[{scale:*,data:*,max:*,min:*,boundaryGap:},{},{}]
        _yParameters=[]; //画y轴所需要的所有参数:比例尺，类目轴数据，值轴最大值和最小值，轴起始和结束空白策略


    var _width = _config.canvas.width,
        _height = _config.canvas.height,
        _margins = _config.canvas.margins;

    var _axis = {}; //返回的轴对象

    var _X_AXIS = 0, //x轴
        _Y_AXIS = 1, //y轴
        _CATEGORY_AXIS = 0,//类目轴
        _VALUE_AXIS = 1,//值轴
        _TIME_AXIS=2;  //时间轴

    var _xAxisType,
        _yAxisType;//标记x轴和y轴到底画的哪种类型(类目轴或者值轴)

    _axis.xAxis = [];
    _axis.yAxis = [];

    /**
     * 初始化，循环判断x轴。
     *
     */
    _opt.xAxis.forEach(function(d){

        var oScale; //画轴需要的比例尺
        var returnXScale; //对外返回的比例尺
        var optimizeObject;

        if("category"===d.type ||typeof(d.type)==="undefined"){

            //如果不设置轴类型，x轴默认为类型轴
            if(typeof(d.type)==="undefined"){
                d.type="category";
            }

            _xAxisType=0;
            _utils.merge(d,_config.categoryAxis,false);

            //设置默认值
            if(["top","bottom"].indexOf(d.position)<0){
                d.position="bottom";
            }
            if(["top","bottom"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="bottom";
            }


            var xbg =d.boundaryGap;
            var scale = setCateScale(xbg,d.data,0);
                if(xbg){
                    var w = scale.rangeBand();
                    returnXScale = d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangeBands([w/2,(quadrantWidth()+w/2)]); //比例尺向右移动半个刻度区间长度
                }else{
                    returnXScale = d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangePoints([0,quadrantWidth()]); //更改定义域的目的是为了获取类目轴像素点方便
                }
                oScale = scale; //画轴时仍然使用原来的比例尺。
            }
        if("value"===d.type){
            _xAxisType=1;

            _utils.merge(d,_config.valueAxis,false);

            //设置默认值
            if(["top","bottom"].indexOf(d.position)<0){
                d.position="bottom";
            }
            if(["top","bottom"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="bottom";
            }

                scale =setValueScale(d.max,d.min,0, d.isLinear);
                optimizeObject = optimizeAxisMaxMin(scale,d.max,d.min, d.onZero);//值轴优化后返回的对象，包括优化后的比例尺和优化后的最大值和最小值
                returnXScale=optimizeObject.oScale;
                oScale = optimizeObject.oScale;
                var oMax=optimizeObject.oMax;
                var oMin=optimizeObject.oMin;
            }

        if("time"===d.type){
            _xAxisType=2;
            _utils.merge(d,_config.timeAxis,false);

            //设置默认值
            if(["top","bottom"].indexOf(d.position)<0){
                d.position="bottom";
            }
            if(["top","bottom"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="bottom";
            }

            returnXScale = setTimeScale(d.startTime, d.endTime,0);
            oScale =returnXScale;

        }
            _xParameters.push({scale:oScale,data: d.data,max:oMax,min:oMin,boundaryGap:xbg,config:d,type:_xAxisType}); //将画x轴的参数都保存起来。
        var xxx ={};
            //获取指定比例尺
            xxx.getScale = returnXScale;
            //获取轴刻度数
            xxx.getTickNum= function(axisType){
                var tickNum;
                var scale = returnXScale;
                if(axisType===_CATEGORY_AXIS){
                    var text = scale.domain()[0];
                    if(scale(text)===0){
                        tickNum = scale.domain().length-1;
                    }else{
                        tickNum = scale.domain().length;
                    }
                }
                if(axisType===_VALUE_AXIS || axisType===_TIME_AXIS){
                    tickNum = scale.ticks().length-1;
                }
                return tickNum;
            }(_xAxisType);
            //获取步长(刻度区间宽度)
            xxx.getStep = function(axisType){
                var step;
                    if(axisType===_CATEGORY_AXIS){ //类目轴步长，
                        step = Math.abs(returnXScale(1)-returnXScale(0));
                    }
                    if(axisType===_VALUE_AXIS){ //值轴步长，
                        var ticks = returnXScale.ticks();
                        step = Math.abs(returnXScale(ticks[0]) - returnXScale(ticks[1]));
                    }
                    if(axisType===_TIME_AXIS){
                        step= quadrantWidth()/(returnXScale.ticks().length-1);
                    }
                return step;
            }(_xAxisType);

            _axis.xAxis.push(xxx);

        });
    /**
     * 初始化，循环判断y轴
     *
     */
    _opt.yAxis.forEach(function(d){

        var oScale;//画轴需要的比例尺
        var returnYScale; //对外返回的y轴比例尺
        var optimizeObject;


        if("category"===d.type){

            _yAxisType=0;
            _utils.merge(d,_config.categoryAxis,false);

            //设置默认值
            if(["left","right"].indexOf(d.position)<0){
                d.position="left";
            }
            if(["left","right"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="left";
            }

            var ybg = d.boundaryGap; //类目轴两端空白策略

            var scale = setCateScale(ybg,d.data,1);
            if(ybg){
                var w = scale.rangeBand();
                returnYScale =d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangeBands([(quadrantHeight()+w/2),w/2]); //比例尺向右移动半个刻度区间长度
            }else{
                returnYScale = d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangePoints([quadrantHeight(),0]); //更改定义域的目的是为了获取类目轴像素点方便
            }
            oScale = scale; //画轴时使用原来的比例尺

        }
        if("value"===d.type ||typeof(d.type)==="undefined"){

            _yAxisType=1;
            _utils.merge(d,_config.valueAxis,false);

            //如果不设置轴类型，y轴默认为值轴
            if(typeof(d.type)==="undefined"){
                d.type="value";
            }

            //设置默认值
            if(["left","right"].indexOf(d.position)<0){
                d.position="left";
            }
            if(["left","right"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="left";
            }

            ybg=d.boundaryGap; //值轴两端空白策略[0,0],暂不处理
            var scale =setValueScale(d.max,d.min,1, d.isLinear);
            optimizeObject = optimizeAxisMaxMin(scale,d.max,d.min, d.onZero);//值轴优化后返回的对象，包括优化后的比例尺和优化后的最大值和最小值
            returnYScale=optimizeObject.oScale;
            oScale=optimizeObject.oScale;
            var oMax =optimizeObject.oMax;
            var oMin =optimizeObject.oMin;
        }

        if("time"===d.type){
            _xAxisType=2;
            _utils.merge(d,_config.timeAxis,false);

            //设置默认值
            if(["left","right"].indexOf(d.position)<0){
                d.position="left";
            }
            if(["left","right"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="right";
            }
            returnYScale = setTimeScale(d.startTime, d.endTime,1);
            oScale =returnYScale;

        }
        _yParameters.push({scale:oScale,data: d.data,max:oMax,min:oMin,boundaryGap:ybg,config:d,type:_yAxisType}); //将画y轴的参数保存起来。

    var yyy = {};

        //获取指定步长
        yyy.getScale =returnYScale;
         //获取刻度数
        yyy.getTickNum= function(axisType){
            var tickNum;
            if(axisType===_CATEGORY_AXIS){
                var text = returnYScale.domain()[0];
                    if(returnYScale(text)===0){
                        tickNum = returnYScale.domain().length-1;
                    }else{
                        tickNum = returnYScale.domain().length;
                    }
            }
            if(axisType===_VALUE_AXIS || axisType===_TIME_AXIS){
                    tickNum = returnYScale.ticks().length-1;
            }
            return tickNum;
        }(_yAxisType);
        //获取步长
        yyy.getStep = function(axisType){
            var step;
                if(axisType===_CATEGORY_AXIS){
                    step = Math.abs(returnYScale(1)-returnYScale(0));
                }
                if(axisType===_VALUE_AXIS){
                    var ticks = returnYScale.ticks();
                    step = Math.abs(returnYScale(ticks[0]) - returnYScale(ticks[1]));
                }
                if(axisType===_TIME_AXIS){
                    step=quadrantHeight()/(returnYScale.ticks().length-1);
                }
            return step;
        }(_yAxisType);

        _axis.yAxis.push(yyy);

    });

    /**
     * 更新x轴方法
     * @param index 更新第几个x轴 ，若最多存在两个轴，则可分为top和bottom
     * @param xAxis x轴对象{type:*,max:*,min:*,data:*}
     *
     * type: 轴类型 0或者1。0为类目轴category ,1为值轴value ,2为时间轴
     *
     * 当为value时，xAxis有三个参数，即：type，max,min;
     * 当为category时,xAxis 有两个参数，即:type,data
     * 当为time时,xAxis有三个参数，即：type，startTime,endTime;
     * data:有两种数据格式
     * 一种字符串 data:"腾讯"，则更新效果为累计在后面添加
     * 一种是数组 data:["腾讯"],则更新效果为后面添加几个，向前移动几个，前面相应删除。
     *
     */
    _axis.updateXAxis =function (index,xAxis){

        //更新类目轴
        if(xAxis.type===_CATEGORY_AXIS){

            var newData=_xParameters[index].config.data;

            //判断数据是否是字符串类型
            if(typeof xAxis.data==="string"){
                newData.push(xAxis.data);
            }

            //判断数据是否是数组类型
            var l=0;
            if(xAxis.data instanceof Array){

                newData.map(function(d,i){

                    newData[i]=newData[xAxis.data.length+i];

                    if(i >=newData.length-xAxis.data.length){

                        newData[i]=xAxis.data[l++]
                    }

                });
                if(newData.length<=xAxis.data.length){
                    newData=xAxis.data;
                }

            }

            var xScale = setCateScale(_xParameters[index].config.boundaryGap,newData,0);
            var yScale = _yParameters[index].scale;
            var config =_xParameters[index].config;

            //修改返回的比例尺，区间刻度数，步长。
            _axis.xAxis[index].getScale=xScale;

            var texts = xScale.domain()[0];
            _axis.xAxis[index].getTickNum=function(scale){
                var tickNum;

                if(scale(texts[0])===0){
                    tickNum = scale.domain().length-1;
                }else{
                    tickNum = scale.domain().length;
                }
                return tickNum;
            }(xScale);
            _axis.xAxis[index].getStep=xScale(texts[1]) - xScale(texts[0]);

            loadXAxisStyle(xScale,config,yScale,index);

           /* gXAxisArray[index].transition().call(xAxisArray[index]);*/

        }

        if(xAxis.type===_VALUE_AXIS){

            //设置比例尺并优化，取得优化后的比例尺，最大值和最小值。
            var optimizeObject = optimizeAxisMaxMin(setValueScale(xAxis.max,xAxis.min,0,_xParameters[index].isLinear),xAxis.max,xAxis.min,_xParameters[index].config.onZero);
            var oScale = optimizeObject.oScale;

            //x轴需要的偏移量
            /*var bottomOffset = yStart()-getValueNWeight(oScale);*/

            //修改返回的比例尺，区间刻度数，步长。
            _axis.xAxis[index].getScale=oScale;
            _axis.xAxis[index].getTickNum=oScale.ticks().length-1;
            _axis.xAxis[index].getStep=oScale(oScale.ticks()[0]) - oScale(oScale.ticks()[1]);

            _xParameters[index].scale=oScale;


            loadXAxisStyle(oScale,_xParameters[index].config,_yParameters[index].scale,index);

            loadYAxisStyle(_yParameters[index].scale,_yParameters[index].config,oScale,index);



        }

        //更新时间轴
        if(xAxis.type===_TIME_AXIS){
            var oScale = setTimeScale(xAxis.startTime,xAxis.endTime,0);

            //修改返回的比例尺，区间刻度数，步长。
            _axis.xAxis[index].getScale=oScale;
            _axis.xAxis[index].getTickNum=oScale.ticks().length-1;
            _axis.xAxis[index].getStep=quadrantWidth()/(oScale.ticks().length-1);

            _xParameters[index].scale=oScale;

            loadXAxisStyle(oScale,_xParameters[index].config,_yParameters[index].scale,index);
        }

    };


    /**
     * 更新y轴方法
     * @param index 更新第几个x轴 ，若最多存在两个轴，则可分为top和bottom
     * @param yAxis y轴对象{type:*,max:*,min:*,data:*}
     *
     * type: 轴类型 0或者1。0为类目轴category ,1为值轴value
     *
     * 当为value时，yAxis有三个参数，即：type，max,min;
     * 当为category时,yAxis 有两个参数，即:type,data
     */
    _axis.updateYAxis = function(index,yAxis){

        //更新值轴
        if(yAxis.type===_VALUE_AXIS){

            //设置比例尺并优化，取得优化后的比例尺，最大值和最小值。
            var optimizeObject = optimizeAxisMaxMin(setValueScale(yAxis.max,yAxis.min,1,_yParameters[index].isLinear),yAxis.max,yAxis.min,_yParameters[index].config.onZero);
            var oScale = optimizeObject.oScale;

            //x轴需要的偏移量
            /*var bottomOffset = yStart()-getValueNWeight(oScale);*/

            //修改返回的比例尺，区间刻度数，步长。
            _axis.yAxis[index].getScale=oScale;
            _axis.yAxis[index].getTickNum=oScale.ticks().length-1;
            _axis.yAxis[index].getStep=oScale(oScale.ticks()[0]) - oScale(oScale.ticks()[1]);

            _yParameters[index].scale=oScale;


            loadYAxisStyle(oScale,_yParameters[index].config,_xParameters[index].scale,index);

            loadXAxisStyle(_xParameters[index].scale,_xParameters[index].config,oScale,index);


        }

        //更新类目轴
        if(yAxis.type===_CATEGORY_AXIS){

            var newData=_yParameters[index].config.data;

            //判断数据是否是字符串类型
            if(typeof yAxis.data==="string"){
                newData.push(yAxis.data);
            }

            //判断数据是否是数组类型
            var l=0;
            if(yAxis.data instanceof Array){

                newData.map(function(d,i){

                    newData[i]=newData[yAxis.data.length+i];

                    if(i >=newData.length-yAxis.data.length){

                        newData[i]=yAxis.data[l++]
                    }

                });
                if(newData.length<=yAxis.data.length){
                    newData=yAxis.data;
                }

            }

            var yScale = setCateScale(_yParameters[index].config.boundaryGap,newData,1);
            var xScale = _xParameters[index].scale;
            var config =_yParameters[index].config;

            //修改返回的比例尺，区间刻度数，步长。
            _axis.yAxis[index].getScale=yScale;

            var texts = yScale.domain()[0];
            _axis.yAxis[index].getTickNum=function(scale){
                var tickNum;

                if(scale(texts[0])===0){
                    tickNum = scale.domain().length-1;
                }else{
                    tickNum = scale.domain().length;
                }
                return tickNum;
            }(yScale);
            _axis.yAxis[index].getStep=yScale(texts[1]) - yScale(texts[0]);

            loadYAxisStyle(yScale,config,xScale,index);

            /* gXAxisArray[index].transition().call(xAxisArray[index]);*/


        }



    };

    /**
     * 画轴，render();
     */
    var _gAxis;
    _axis.render =function() {

        if(_gAxis){
            _gAxis.remove();  //删除坐标轴层
        }

        //创建坐标轴层
        var gAxis = svg.selectAll(".gAxis")
            .data([1])
            .enter()
            .append("g")
            .attr("class","gAxis");

        renderXAxis(gAxis);
        renderYAxis(gAxis);
    };

    /**
     *画x轴
     * @param gAxis
     */
    var gXAxisArray=[];
    var xAxisArray=[];
    var xAxisNameArray=[];
    function  renderXAxis(gAxis){

        //画x轴
        _opt.xAxis.forEach(function(d,i){

            var scale = _xParameters[i].scale;
            var config =_xParameters[i].config;
            var yScale = _yParameters[0].scale;

            //创建x轴层
            var gXAxis = gAxis.selectAll(".gXAxis")
                .data([1])
                .enter()
                .append("g")
                .attr("class","x-axis");
            gXAxisArray.push(gXAxis);

            //添加x轴
            var xAxis = d3.svg.axis()
                /*.scale(scale)
                .orient("bottom")*/;
                gXAxis.attr("transform", function () {
                    return "translate(" +  xStart() + "," + yEnd() + ")";
                })
                .call(xAxis);
            xAxisArray.push(xAxis);

            //添加坐标轴名称
            var axisName = gAxis.append("text")
                .attr("class","axisName");

            xAxisNameArray.push(axisName);

            //x轴样式更新
            loadXAxisStyle(scale,config,yScale,i);

        });
    }



    var gYAxisArray=[];
    var yAxisArray=[];
    var yAxisNameArray=[];

    /**
     * 画y轴
     * @param gAxis 坐标轴g
     */
    function  renderYAxis(gAxis){

        // 画y轴
        _opt.yAxis.forEach(function(d,i){

            var scale = _yParameters[i].scale;
            var config =_yParameters[i].config;
            var xScale = _xParameters[0].scale;

            //创建y轴层
            var gYAxis = gAxis.selectAll(".gYAxis")
                .data([1])
                .enter()
                .append("g")
                .attr("class","y-axis");
            gYAxisArray.push(gYAxis);

            //添加y轴
            var yAxis = d3.svg.axis()
                .scale(scale)
                .orient(config.axisLabel.align)
                /*.tickSize(0)*/;
            yAxisArray.push(yAxis);
            gYAxis.attr("transform", function () {
                    return "translate(" +  xStart() + "," + yEnd() + ")";
                })
                .call(yAxis);


            //添加坐标轴名称
            var axisName = gAxis.append("text")
                .attr("class","axisName");
            yAxisNameArray.push(axisName);

            //Y轴样式更新
            loadYAxisStyle(scale,config,xScale,i);

        });

    }

    /**
     * 获取轴层坐标平移位置
     * @param position x轴位置 top,bottom是x轴位置，left、right是y轴位置。
     * @param scale 轴比例尺
     */
    function getGAxisTranslate(position,scale){
        var translate=0;

        if("top"===position){
            translate=yEnd();
        }
        if("bottom"===position){
            translate=yStart()-getValueNWeight(scale);
        }
        if("left"===position){
            translate=xStart()+getValueNWeight(scale);
        }
        if("right"===position){
            translate=xEnd();
        }
        return translate;
    }



    /**
     * 获取x轴刻度线右移距离
     * @param scale x轴比例尺
     * @param boundaryGap 文字是否在刻度中间显示
     */
    function getLineAxisTranslateX(scale,boundaryGap){
        var translateX=0;

        if(boundaryGap && typeof boundaryGap==="boolean"){

            translateX=scale.rangeBand()/2;

        }else{
            translateX=0;
        }

        return translateX;
    }

    /**
     * 获取x轴名称横纵坐标位置
     * @param position 轴位置
     * @param location 名称位置
     * @param scale y比例尺
     */
    function getTextAxisTranslate(position,location,scale){
        var textBox=[], x,y;

        if("top"===position){
            if("start"===location){
                x=xStart();
                y=yEnd();
            }
            if("end"===location){
                x=xEnd();
                y=yEnd();
            }
        }

        if("bottom"===position){
            if("start"===location){
                x=xStart();
                y=yStart()-getValueNWeight(scale);
            }
            if("end"===location){
                x=xEnd();
                y=yStart()-getValueNWeight(scale);
            }
        }
        textBox.push(x);
        textBox.push(y);

        return textBox;
    }

    /**
     * 获取轴标签文字与轴的距离
     * 标签文字始终在top,bottom.,left,right不随轴移动而移动！
     * @param config 轴样式
     * @returns {*}
     */
    function getTickPadding(config){

        var position = config.position,
            align = config.axisLabel.align,
            tickLength = config.axisTick.length;

        var tickPadding;

        //通过坐标轴位置，确定文字标签与轴的距离
        if("top"===position){

            if("top"===align){
                tickPadding =config.axisLabel.margin; //默认距离
            }
            if("bottom"===align){
                tickPadding =config.axisLabel.margin;
            }
        }

        if("bottom"===position){
            if("top"===align){
                tickPadding =5; //默认距离
            }
            if("bottom"===align){

                tickPadding=config.axisLabel.margin+getValueNWeight(_yParameters[0].scale)-tickLength;
            }
        }

        if("left"===position){

            if("left"===align){

                tickPadding =config.axisLabel.margin+getValueNWeight(_xParameters[0].scale)-tickLength;
            }
            if("right"===align){
                tickPadding =config.axisLabel.margin;
            }
        }

        if("right"===position){
            if("left"===align){
                tickPadding =config.axisLabel.margin;
            }
            if("right"===align){
                tickPadding =config.axisLabel.margin;
            }
        }

        return tickPadding;
    }



    /**
     *获取y轴标签文字位置
     * @param position y轴位置
     * @param location y轴名称位置
     * @param scale x轴比例尺
     */
    function getTextYAxisTranslate(position,location,scale){
        var textBox=[], x,y;

        if("left"===position){
            if("start"===location){
                x=xStart()+getValueNWeight(scale);
                y=yEnd();
            }
            if("end"===location){
                x=xStart()+getValueNWeight(scale);
                y=yEnd();
            }
        }

        if("right"===position){
            if("start"===location){
                x=xEnd();
                y=yEnd();
            }
            if("end"===location){
                x=xEnd();
                y=yEnd();
            }
        }
        textBox.push(x);
        textBox.push(y);

        return textBox;

    }

    function getXAxisTextPX(rotate,tickPadding){
        var x,mode="lr"; var angle = 90-rotate/2; var radian = (Math.PI*angle)/180 ; var radian1=(Math.PI*(rotate/2))/180;
        var l =Math.cos(radian)*tickPadding*2;
        x=Math.cos(radian1)*l;
        var y = Math.sin(radian1)*l;
        if(Math.abs(rotate)===90){
            x=0;
            mode="tb";
            rotate=0;
            y=0;
        }


        return {x:x,mode:mode,rotate:rotate,y:y};

    }

    /**
     *加载x轴样式
     * @param xScale x轴比例尺
     * @param config x轴样式属性
     * @param yScale y轴比例尺
     * @param index 轴标识
     */
    var flag= 0,duration;
    function loadXAxisStyle(xScale,config,yScale,index){
        if(flag==0){
            duration=0;
        }else{
            duration=_config.animation.dur
        }
        flag++;

        //更新x轴
        var tickPadding = getTickPadding(config);
        xAxisArray[index].tickSize(config.axisTick.show===true? config.axisTick.length:0)
            .scale(xScale)
            .orient(config.axisLabel.align)
            .tickPadding(tickPadding)
            /*.ticks(config.data.length)*/;

        //更新x轴所在g
        var gTranslateY = getGAxisTranslate(config.position,yScale);
        gXAxisArray[index]
            .transition().duration(duration)
            .attr("transform", function () {
            return "translate(" +  xStart() + "," + gTranslateY + ")";
        })

            .call(xAxisArray[index]);

        //更新轴线
        gXAxisArray[index].select("path")
            .attr("fill","none")
            .attr("display",config.axisLine.show===true? "block":"none")
            .attr("stroke",config.axisLine.lineStyle.color)
            .attr("stroke-width",config.axisLine.lineStyle.width);

        //更新轴标签文字
        var box = getXAxisTextPX(config.axisLabel.rotate,tickPadding);
        gXAxisArray[index].selectAll("text")
            .attr("transform", "rotate("+ box.rotate +")")
            .attr("writing-mode", box.mode)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisLabel.textStyle.color)
            .text(function(d){

                if(typeof config.formatter==="string"){
                    var t = config.formatter.split("{value}");
                    return t[0]+d+t[1];
                }else if("time"===config.type && d instanceof Date){
                    return dateFormat(d,setDateFormat(xScale.ticks()));
                }else{
                    return d;
                }

            })
            .attr("dy",function(){
                return d3.select(this).node().getBBox().height/2 -box.y;
            })
            .attr("dx",function(){
                return /*d3.select(this).node().getBBox().width/2*/ box.x;
            });

        //更新刻度线
        var lineTranslateX = getLineAxisTranslateX(xScale,config.boundaryGap);
        gXAxisArray[index].selectAll("line")
            .attr("display",config.axisTick.show===true? "block":"none")
            .attr("transform",function () {
                return "translate(" +  lineTranslateX + "," + 0 + ")";
            })
            .attr("stroke",config.axisLine.lineStyle.color);

        //更新轴名字
        var textBox = getTextAxisTranslate(config.position,config.axisName.location,yScale);
        var x = textBox[0];
        var y = textBox[1];
        xAxisNameArray[index]
            .text(config.axisName.text)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisName.show===false? "none":config.axisName.textStyle.color)
            .attr("x",x)
            .attr("y",y);

        var length = getValueNWeight(yScale);

        if(config.grid.show){
            renderXGridLines(gXAxisArray[index],config,xScale ,length);
        }

    }

    /**
     * 加载y轴样式
     * @param yScale y轴比例尺
     * @param config y轴样式属性
     * @param xScale x轴比例尺
     * @param index y轴标识
     */
    var flagY= 0,durationY;
    function loadYAxisStyle(yScale,config,xScale,index){
        if(flagY==0){
            durationY=0;
        }else{
            durationY=_config.animation.dur
        }
        flagY++;

        //更新Y轴
        var tickPadding = getTickPadding(config);
        yAxisArray[index].tickSize(config.axisTick.show===true? config.axisTick.length:0)
            .scale(yScale)
            .orient(config.axisLabel.align)
            .tickSize(config.axisTick.show===true? config.axisTick.length:0)
            .tickPadding(tickPadding)
            /* .ticks(7)*/;

        //更新y轴所在g
        var gTranslateX = getGAxisTranslate(config.position,xScale);
        gYAxisArray[index]
            .transition().duration(durationY)
            .attr("transform", function () {
            return "translate(" +  gTranslateX + "," + yEnd() + ")";
        })

            .call(yAxisArray[index]);

        //更新轴线
        gYAxisArray[index].select("path")
            .attr("fill","none")
            .attr("display",config.axisLine.show===true? "block":"none")
            .attr("stroke",config.axisLine.lineStyle.color)
            .attr("stroke-width",config.axisLine.lineStyle.width);

        //更新轴标签文字
        var box = getXAxisTextPX(config.axisLabel.rotate,tickPadding);
        gYAxisArray[index].selectAll("text")
            .attr("transform", "rotate("+ box.rotate+")")
            .attr("writing-mode", box.mode)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisLabel.textStyle.color)
            .text(function(d){

                if(typeof config.formatter==="string"){
                    var t = config.formatter.split("{value}");
                    return t[0]+d+t[1];
                }else if("time"===config.type && d instanceof Date){
                    return dateFormat(d,setDateFormat(yScale.ticks()));
                }else{
                    return d;
                }

            })
            .attr("dy",function(){
                return d3.select(this).node().getBBox().height/2 -box.y;
            })
            .attr("dx",function(){
                return /*d3.select(this).node().getBBox().width/2*/ box.x;
            });

        //更新刻度线
        var lineTranslateY = -getLineAxisTranslateX(yScale,config.boundaryGap);
        gYAxisArray[index].selectAll("line")
            .attr("display",config.axisTick.show===true? "block":"none")
            .attr("transform",function () {
                return "translate(" +  0 + "," + lineTranslateY + ")";
            })
            .attr("stroke",config.axisLine.lineStyle.color);

        //更新轴名字
        var textBox = getTextYAxisTranslate(config.position,config.axisName.location,xScale);
        var x = textBox[0];
        var y = textBox[1];
        yAxisNameArray[index]
            .text(config.axisName.text)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisName.show===false? "none":config.axisName.textStyle.color)
            .attr("x",x)
            .attr("y",y);

        var length = getValueNWeight(xScale);

        if(config.grid.show){
            renderYGridLines(gYAxisArray[index],config,yScale,length);
        }

    }

    /**
     *绘制y轴网格线
     * @param g y轴的g
     * @param config
     * @param scale 比例尺
     * @param tickPadding 文字与轴的距离
     *
     */
    function renderYGridLines(g,config,scale,tickPadding){
        var x1,x2,y1,y2;
        var position = config.position;
        var bg = config.boundaryGap;

        if("left"===position){

             x1 = -tickPadding;
             x2=quadrantWidth()-tickPadding;

        }
        if("right"===position){

             x1 = -quadrantWidth()+tickPadding;
             x2=tickPadding;
        }
        if(bg && typeof bg==="boolean"){

            y1=-scale.rangeBand()/2;
            y2=-scale.rangeBand()/2;
        }else{
            y1=0;
            y2=0;
        }

        var lines = d3.selectAll("g.y-axis g.tick")
            .select("line.grid-line")
            .remove();
        lines = g.selectAll("g.y-axis g.tick")
            .append("line")
            .classed("grid-line", true);
        lines.attr("stroke-width",_config.grid.borderWidth)
            .attr("stroke",_config.grid.borderColor)
            .attr("shape-rendering","crispEdges")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2);

    }

    /**
     * 绘制x轴网格线
     * @param g x轴g
     * @param config
     * @param scale
     * @param tickPadding 文字与轴的距离
     */
    function renderXGridLines(g,config,scale,tickPadding){
        var x1,x2,y1,y2;
        var position = config.position;
        var bg = config.boundaryGap;


        if("bottom"===position){

            y1 = tickPadding;
            y2=-quadrantHeight()+tickPadding;
        }
        if("top"===position){

            y1 = -quadrantHeight()+tickPadding;
            y2=tickPadding;
        }

        if(bg && typeof bg==="boolean"){
            x1=scale.rangeBand()/2;
            x2=scale.rangeBand()/2;

        }else{

            x1=0;
            x2=0;

        }

        var lines = d3.selectAll("g.x-axis g.tick")
            .select("line.grid-line")
            .remove();
        lines = g.selectAll("g.x-axis g.tick")
            .append("line")
            .classed("grid-line", true);
        lines.attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke-width",_config.grid.borderWidth)
            .attr("stroke",_config.grid.borderColor)
            .attr("shape-rendering","crispEdges")
            /*.on("mouseover",function(d){// 鼠标移到某元素上
                d3.select(this)
                    .attr("stroke","yellow");
            })
            .on("mouseout",function(d){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("stroke","yellow");
            })*/;

    }

    /**
     * 设置日期格式，若年月日相同，则显示时分
     * 若年月相同，则显示日
     * 若年相同，则显示月
     * 若年不同，则显示年
     * @param ticks
     */

    function setDateFormat(ticks){
        var format="yyyy/MM/dd hh:mm:ss";

        if(ticks[0].getMonth()+1 != ticks[1].getMonth()+1){
            format ="yyyy/MM";
        }

        if(ticks[0].getYear() != ticks[1].getYear()){
            format ="yyyy";
        }
        if(ticks[0].getDate() != ticks[1].getDate()){
            format ="MM/dd";
        }
        if(ticks[0].getHours() != ticks[1].getHours() || ticks[0].getMinutes() != ticks[1].getMinutes()){
            format ="hh:mm";
        }

        return format;

    }

    /**
     * 数组去重方法
     * @returns {Array}
     */
    function unique(array){
        var n =[];
        for(var i =0; i<array.length;i++){
            if(n.indexOf(array[i])===-1){
               n.push(array[i]);
          }
        }
        return n;
    }

    /**
     *获取值轴负半轴长度的方法
     * @param scale 值轴比例尺
     * @returns {number}
     */
    function getValueNWeight(scale){

        var oMin=scale.domain()[0];
        var w=0;
        if(typeof(oMin)==="undefined"||oMin===null||isNaN(oMin)){//判断，如果不是值轴则返回0;
            return w;
        }else{
            var ticks = scale.ticks();
            if(0 >= ticks[ticks.length-1]){
                w=scale(ticks[0])-scale(ticks[ticks.length-1]);
            }else{
                if(ticks[0]<=0){
                    w = scale(oMin)-scale(0);
                }else{
                    w=0;
                }

            }
            return Math.abs(w);
        }
    }

    /**
     * 设置类目轴比例尺
     * @param boundaryGap 类目轴两端空白策略 true为文字标签在刻度中间显示
     * @param cateData 类目轴数据
     * @param isX 是否是x轴上的类目轴，0是x;1是y
     * @returns {*}
     */
    function setCateScale(boundaryGap,cateData,isX){

        var cateScale,rangeMax;

        if(isX===_X_AXIS){ //类目轴在x轴
            rangeMax=quadrantWidth();
        }

        if(isX===_Y_AXIS){ //类目轴在y轴
            rangeMax=quadrantHeight();
            cateData =  cateData.reverse(); //倒序排列数组
        }


        if(boundaryGap){
            cateScale =d3.scale.ordinal().domain(cateData).rangeBands([0,rangeMax]);
        }else{
            cateScale=d3.scale.ordinal().domain(cateData).rangePoints([0,rangeMax]);
        }

        return cateScale;
    }

    /**
     * 设置值轴比例尺
     * @param max 值轴最大值
     * @param min 值轴最小值
     * @param isY 是否在y轴上的值轴。0是x;1是y
     * @param isLinear 是否是线性比例尺
     * @returns {*}
     */
    function setValueScale(max,min,isY,isLinear){

        var valueScale;

        if(max===min){ //判断最大值和最小值相等的情况，若大于0，则min=0,若小于0，则max=0,若等于0，则max=1;
            if(min===0){
                max=1;
            }else if(max<0){
               max=0;
            }else if(max>0){
                min=0;
            }
        }

        if(isY===_X_AXIS){

            /*if(isLinear || typeof isLinear==="undefined"){*/
                valueScale = d3.scale.linear()
                    .domain([min,max])
                    .range([0,quadrantWidth()]);
            /*}
            if(!isLinear){ //如果不是线性比例尺，则设置为对数比例尺
                valueScale = d3.scale.log()
                    .domain([min,max.value]).nice()
                    .range([0,quadrantWidth()]);

            }*/

        }

        if(isY===_Y_AXIS){

           /* if(isLinear){*/
                valueScale = d3.scale.linear()
                    .domain([min,max])
                    .range([quadrantHeight(),0]);
            /*}

            if(!isLinear){
                valueScale = d3.scale.log()
                    .domain([min,max.value]).nice()
                    .range([quadrantHeight(),0]);
            }*/

        }
        return valueScale;
    }


    /**
     * 设置时间比例尺
     * @param start 开始时间
     * @param end  结束时间
     * @param isX 是否是x轴上的时间轴
     */
    function setTimeScale(start,end,isX){
        var timeScale;
        //判断是否是日期格式
        if(!(start instanceof Date)){
            start =new Date(start);
        }
        if(!(end instanceof  Date)){
            end = new Date(end);
        }
        if(isX===_X_AXIS){
            timeScale=d3.time.scale()
                .domain([start,end])
                .range([0,quadrantWidth()])

        }

        if(isX===_Y_AXIS){
            timeScale=d3.time.scale()
                .domain([start,end])
                .range([quadrantHeight(),0]);

        }

        return timeScale;

    }

    /**
     *格式化时间
     * @param data  时间
     * @param format 指定格式 如"yyy-MM-dd"
     * @returns {*}
     */
    function dateFormat(data,format){
        var o = {
            "M+" : data.getMonth()+1, //month
            "d+" : data.getDate(), //day
            "h+" : data.getHours(), //hour
            "m+" : data.getMinutes(), //minute
            "s+" : data.getSeconds(), //second
            "q+" : Math.floor((data.getMonth()+3)/3), //quarter
            "S" : data.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (data.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }

    /**
     *获取刻度区间宽度
     * @param scale 比例尺
     * @returns {number}
     */
    function  getSectionWidth (scale){
        var sectionWidth;
        var ticks = scale.ticks();
        sectionWidth = Math.abs(ticks[0] - ticks[1]);
        return sectionWidth;
    }

    /**
     *优化值轴的最大值：最终结果为：标签显示最大值 > 数据最大值，最小值 < 数据最小值。
     * @param scale 轴比例尺
     * @param max 数据最大值
     * @param min 数据最小值
     * @param onZero 值轴起始点是否从0开始
     * @returns {*}
     */
    function optimizeAxisMaxMin(scale,max,min,onZero){

        var opObject={};
        var oScale = scale;
        var ticks = oScale.ticks();
        var oMax =ticks[ticks.length-1];
        var oMin = ticks[0];

        //判断最大值和最小值相等的情况，若大于0，则min=0,若小于0，则max=0,若等于0，则max=1;
        if(max===min){
            if(min===0){
                max=1;
            }else if(max<0){
                max=0;
            }else if(max>0){
                min=0;
            }
        }

        //判断值轴是否从0开始
        if(onZero){

            if(min>=0){
                oMin=0;
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMax=ticks[ticks.length-1];
            }
            if(max<=0){
                oMax=0;
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMax=ticks[ticks.length-1];
            }

        }

        while(oMax < max){
                oMax =oMax + getSectionWidth(oScale);
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMax=ticks[ticks.length-1];
        }

        while(oMin > min){
                oMin = oMin - getSectionWidth(oScale);
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMin=ticks[0];
        }

        oScale.domain([oMin,oMax]);
        opObject.oScale=oScale;
        opObject.oMax=oMax;
        opObject.oMin=oMin;
        return opObject;
    }



    //x轴开始坐标
    function xStart() {
        return _margins.left;
    }
    //y轴开始坐标
    function yStart() {
        return _height - _margins.bottom;
    }
    //x轴结束坐标
    function xEnd() {
        return _width - _margins.right;
    }
    //y轴结束坐标
    function yEnd() {
        return _margins.top/*+_legendH*/;
    }
    //x轴宽度
    function quadrantWidth() {
        return _width - _margins.left - _margins.right;
    }
    //y轴高度
    function quadrantHeight() {
        return _height - _margins.top - _margins.bottom/*-_legendH*/;
    }

    return _axis;
}