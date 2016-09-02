"use strict";
function pie(option,piesvg,config) {

    var _config =  config;
    var _pie = {};
    var opt = option;
    var _utils = utils();
    var _opt = [];
    var _legendArray=[];//组装图例数组
    //合并option数据
    if(opt.canvas === null || opt.canvas === undefined ){
        var _width = _config.canvas.width,
            _height = _config.canvas.height;
    }else{
        var _width = opt.canvas.width,
            _height = opt.canvas.height;
    }
    var serries = opt.series;
    var newArray = [];
    var cococo = [] ;
    var legDa = [];
    var lastColors = [];//去掉隐藏柱子数据后的处理数据
    var useColor = [];
    var pieUseData = [];
    var _colors,
        _data,
        _radius,
        _center,
        _roseType;// 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
    var rad1;
    var rad2;
    var cen1;
    var cen2;

    var pieData;
    var pieColor;
    var pg;
    var useData;
    var arcInRad;
    var arcOutRad;
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-15, 0])
        .html(function(d,i) {
            var dd = newArray.map(function(d){ return d.data;});
            var sum=eval(dd.join("+"));
            return "<span style='color:#ffffff;font-size: 12px;font-family: Microsoft YaHei, SimHei;'><p>访问来源</p><p>" + d.data.name+":"+ d.data.data+"("+(d.data.data/sum).toFixed(4).slice(2,4)+"."+(d.data.data/sum).toFixed(4).slice(4,6)+"%)"+ "</p></span>";
        });
    piesvg.call(tip);//提示框
    var reData ;
    var reColor;
    var reLegData;
    var reLegColor ;
    _pie.render = function(){
        reData = _utils.cloneObject(serries);
        opt.series.forEach(function(d,i){
            //合并config
            _config = _utils.merge(_config,opt,true);
            if(_config.CHART_TYPE_PIE === d.type){
                //将饼图配置和HTML中的series的配置合并
               d = _utils.merge(d,_config.pie,false);
            }

            d.data = checkData(d.data);
            newArray = d.data;
            if(d.itemStyle.normal.color === null || d.itemStyle.normal.color === undefined){
                _colors = _config.color;
            }else{
                _colors = d.itemStyle.normal.color;
            }
            for(var a = 0 ; a < newArray.length ; a++){
                legDa.push(newArray[a])
            }

            var color;var endColor = [];
            if(d.itemStyle.normal.color === undefined || d.itemStyle.normal.color === null){
                color=_config.color;
            }else{
                color = d.itemStyle.normal.color
            }
            var num = Math.ceil(d.data.length / color.length);
            for(var c = 0; c < num;c++){
                for(var cc = 0 ; cc < color.length ; cc++){
                    endColor.push(color[cc]);
                }
            }
            useColor.push(endColor);
        });
        reColor = _utils.cloneObject(useColor);
        reLegData = _utils.cloneObject(legDa);


        //serries = checkData(serries);
        renderPie(piesvg,serries,tip);
        drawLabels(serries,pg);
        drawLine(pg,serries);
        reLegColor = _utils.cloneObject(cococo);
            //检验数据
            //checkData(_data);
        //画标题
        var _title = title();
        _title.render(piesvg,_config);
        var num = Math.ceil(legDa.length/_colors.length);
        for(var r = 0 ; r < num ; r++){
            for(var c = 0 ; c < _colors.length ; c++){
                lastColors.push(_colors[c]);
            }
        }
        //绘制图例========================================================================================绘制图例
        for (var i = 0; i < legDa.length; i++) {
            _legendArray.push({name:legDa[i].name,color:cococo[i],type:_config.CHART_TYPE_PIE,symbol:"",symbolStyle:""})
        }
        var leg=legend(piesvg,_config,_legendArray);
        leg.removeLegend();
        leg.render();
        _config.EVENT.LEGEND_SELECTED = _legendClick;
        _config.EVENT.LEGEND_HOVERLINK = _hoverCallback;
        _config.EVENT.LEGEND_OUTLINK = _outCallback;
    };

    /**
     * loadData的方法
     * @param newDa
     */
    _pie.loadPieData = function(newDa){
        serries = updateSeries(newDa);
        serries.forEach(function(d,i){
            var nameData = d.data;
            for(var n = 0 ; n < nameData.length ; n++){
                var selected = d3.selectAll("#"+ nameData[n].name).attr("show");
                if(selected === "true"){
                    console.log("zou le ma ========================");
                    d3.selectAll("#"+nameData[n].name)
                        .attr("transform","translate(0,0)");
                }
            }
        });


        //console.log(legDa)
        reData = _utils.cloneObject(serries);
        console.log(serries);
        renderPie(piesvg,serries);
        drawLabels(serries,pg);
        drawLine(pg,serries);
    };

    /**
     * 加载数据时，更新的数据
     * @param newDa
     */
    function updateSeries(newDa){
        //console.log(newDa);
        //reData = _utils.cloneObject(newDa);
        newDa.forEach(function(d,i) {
            d.data = checkData(d.data);
            //合并config
            _config = _utils.merge(_config, newDa, true);
            if(_config.CHART_TYPE_PIE === d.type){
                //将饼图配置和HTML中的series的配置合并
                d = _utils.merge(d, _config.pie, false);
            }

           /* //将Load方法传入的数据放置到_cloneBars中，用于图例点击恢复柱子使用
            for(var i=0;i<reData.length;i++){
                for(var n=0;n<newDa.length;n++){
                    if(reData[i].name===newDa[n].name){
                        reData[i].data = newDa[n].data;
                    }
                }
            }*/
        });
            /*//将Load方法传入的数据放置到newArray中准备展示
            for(var i=0;i<newDa.length;i++){
                for(var n=0;n<newArray.length;n++){
                    if(newArray[n].name===newDa[i].name){
                        newArray[n].data = newDa[i].data;
                        //break;
                    }
                }
            }

            //将Load方法传入的数据放置到_cloneBars中，用于图例点击恢复柱子使用
            for(var i=0;i<reData.length;i++){
                for(var n=0;n<newDa.length;n++){
                    if(reData[i].name===newDa[n].name){
             reData[i].data = newDa[n].data;
                    }
                }
            }*/
            return newDa;
    }
    /**
     * 定义隐藏显示扇形的方法，图例调用
     * @param list
     */

    var _legendClick = function(name){
        console.log(serries);
        //初始化显式数组lastData，设置要显式的数据和颜色参数
        setShowData(name);

        renderPie(piesvg,serries);
        drawLabels(serries,pg);
        drawLine(pg,serries);
    };

    /**
     *  图例回调函数调用，传入name值，判断当前显式的数据中有没有，如果有就删除（隐藏），如果没有就从原数据（pieData）中获取添加（显式）
     * @param dataName 图例传入的参数
     */

    function setShowData(dataName) {
        console.log(dataName);
        var flag = 0;//标识series数组中是否有该name的数据0：没有1：有
        var legFlag = 0;
        serries.forEach(function(d,i){
            useData = d.data;
            for (var j = 0; j < useData.length; j++) {
                if (useData[j].name === dataName) {
                    useData.splice(j, 1);//方法向从数组中添加/删除项目，然后返回被删除的项目。
                    useColor[i].splice(j, 1);
                    flag = 1;
                    //break;
                }
            }

            if (flag === 0) {

                var rereData = reData[i].data;
                useColor[i] = [];
                if(useData.length <= 0){
                    for(var k =0; k < rereData.length;k++ ){
                        if(rereData[k].name===dataName){
                            useData.push(rereData[k]);
                            useColor[i].push(reColor[i][k]);
                            break;
                        }
                    }
                }else{
                    var nameList = [];
                    for(var x = 0 ; x < useData.length;x++){
                        nameList.push(useData[x].name);
                    }
                    nameList.push(dataName);
                    useData = [];
                    useColor[i] = [];
                    for(var n = 0;n<rereData.length;n++){
                        if(nameList.indexOf(rereData[n].name) !== -1){
                            useData.push(rereData[n]);
                            useColor[i].push(reColor[i][n]);

                        }
                    }
                }
            }
            d.data = useData;
        });


        for(var leg = 0 ; leg < legDa.length ; leg++){
            if(legDa[leg].name === dataName){
                legDa.splice(leg,1);
                cococo.splice(leg,1);
                legFlag = 1;
            }
        }
        if(legFlag === 0){
            cococo = [];
            if(legDa.length <= 0){
                for(var ld = 0 ; ld < reLegData.length ; ld++){
                    if(reLegData[ld].name === dataName){
                        legDa.push(reLegData[ld]);
                        cococo.push(reLegColor[ld]);
                        break;
                    }
                }
            }else{
                var name = [];
                for(var x = 0 ; x < legDa.length;x++){
                    name.push(legDa[x].name);
                }
                name.push(dataName);
                legDa = [];
                cococo = [];
                for(var n = 0;n<reLegData.length;n++){
                    if(name.indexOf(reLegData[n].name) !== -1){
                        legDa.push(reLegData[n]);
                        cococo.push(reLegColor[n]);
                    }
                }
            }
        }

    }

    //鼠标移动到图例上悬停时回调函数
    var _hoverCallback = function (name){
        for(var t =0 ; t < legDa.length;t++){
            if(name === legDa[t].name){
                var oldColor = d3.selectAll("#"+legDa[t].name).attr("fill");
                var fillColor = d3.rgb(oldColor).brighter(0.2);
                d3.selectAll("#"+legDa[t].name).attr("fill",fillColor);
            }
        }
    };

    //鼠标离开图例时回调函数
    var _outCallback = function(name){

            for(var t =0 ; t < legDa.length;t++) {
                if (name === legDa[t].name) {
                    d3.selectAll("#" + legDa[t].name).attr("fill", cococo[t]);
                }
            }
    };

    //pie转换数据为适合生成饼图的对象数组
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d.data;
        });
    //根据对象获取最大值
    Array.prototype.max = function() {//直接定义方法，数组直接.max()即可使用
        var max = parseInt(this[0]);//把第一位给max，注意，这里要转型，网上百度的基本没有转型。
        var len = this.length;//定义长度赋值变量提高性能
        for (var i = 1; i < len; i++){//循环
            if (parseInt(this[i]) > max) {//比较当前是否大于max，注意，这里要转型，网上百度的基本没有转型。
                max = this[i];//如果大于则把大的数给max
            }
        }
        return max;//返回最大值
    };
    //画饼图===========================================================================================画饼图
    function renderPie(svg,con) {
        console.log(con);
        piesvg.selectAll(".slices")//创建饼图容器
            .data(con)
            .enter()
            .append("g")
            .attr("class", "slices")
            .attr("id",function(d,i){
                return "sl"+i;
            });

        pg = piesvg.selectAll(".slices")//.selectAll(".pieg")
            .data(con)
            //.attr("transform","translate("+_width*cen1+","+_height*cen2+")")//平移饼图中心
            .attr("transform",function(d,i){
                //console.log(_width * parseFloat(con[i].center[0])/100);
                return "translate("+(_width * parseFloat(con[i].center[0])/100)+",300)";
            });

        //pg.selectAll(".ppath").remove();
        pg.selectAll(".ppath")
            .data(function(d,i){
                //pieUseData.push()
                //console.log(d.data);
               return pie(d.data);
            }) .enter()
            .append("path")
            .attr("class","ppath")
            .attr("id",function(d,i){
                return d.data.name;
            });

        pg.selectAll(".ppath")
            .data(function(d,i){
                return pie(d.data);
            })
            .attr("id",function(d,i){
                return d.data.name;
            })
            .attr("roseType",function(d,i,j){
                return con[j].roseType;
            })
            .attr("inrad",function(d,i,j){
                return con[j].radius[0];
            })
            .attr("outrad",function(d,i,j){
                return con[j].radius[1];
            })
            .attr("d",function(d,i,j){
                var _radius =con[j].radius;// d.radius;

                var rad1 = parseFloat(_radius[0])/100;
                var rad2 = parseFloat(_radius[1])/100;
                var arcInRad = Math.min(_width, _height)*rad1;
                var arcOutRad = Math.min(_width, _height)*rad2;
                var rad = con[j].roseRadius;
                var roseOutRad = (arcOutRad - arcInRad) * (d.data.data / rad) + arcInRad;
                var arc = d3.svg.arc()
                    .innerRadius(arcInRad)
                    .outerRadius(function(){
                        if(con[j].roseType === null){
                            return arcOutRad;
                        }else{
                            return roseOutRad;
                        }
                    });
                return arc(d);
            })
            .attr("fill",function(d,i,j){
               /* var color;var endColor = [];
                if(con[j].itemStyle.normal.color === undefined || con[j].itemStyle.normal.color === null){
                    color=_config.color;
                }else{
                    color = con[j].itemStyle.normal.color
                }
                var num = Math.ceil(con[j].data.length / color.length);
                for(var c = 0; c < num;c++){
                    for(var cc = 0 ; cc < color.length ; cc++){
                        endColor.push(color[cc]);
                    }
                }
                cococo.push(endColor[i]);
                //为饼图填充颜色
                return endColor[i];*/

                cococo.push(useColor[j][i]);
                return useColor[j][i];
            })
            .on("mouseover",function (d,i,j){
                //鼠标触发方法，移到饼图
                mouseOverEvent("#sl"+j,d,i,j);
                var oldColor = d3.select(this).style("fill");
                var fillColor = d3.rgb(oldColor).brighter(0.2);
                d3.select(this)
                    .attr("fill",fillColor);
                tip.show.call(this,d);
            })
            .on("mouseout",function(d,i,j){
                tip.hide.call(this,d);
                svg.selectAll(".textG"+i).remove();

                d3.select(this)
                    .attr("fill",function(){
                        return useColor[j][i];
                    });
            })

            .on("click",function(d,i,j){

               var selectedNode = d3.selectAll("#sl"+j).selectAll("#"+ d.data.name);
                var _selectedOffset = con[j].selectedOffset;
                var ishow = null;
                if(con[j].selectedMode === false || con[j].roseType !== null){
                    selectedNode
                        .attr("transform","translate(0,0)");
                }else if(con[j].selectedMode === "single"){
                    //selectedNode= d3.selectAll("#sl"+j).select("#"+ d.data.name);
                    ishow=selectedNode.attr("show");
                    d3.selectAll(".ppath")
                        .transition()
                        .duration(con[j].clickTime)
                        .attr("show",null)
                        .attr("transform","translate(0,0)");
                    if(ishow===undefined || ishow===null)
                    {
                        selectedNode
                            .transition()
                            .duration(con[j].clickTime)
                            .attr("show",true)
                            .attr("transform", function(){
                                var startAng = d.startAngle;
                                var endAng = d.endAngle;
                                var ang = startAng+(endAng-startAng)/2;
                                //计算平移时坐标位置
                                var x =/*_width*cen1+*/ _selectedOffset * Math.sin(ang);
                                var y = /*_height*cen2+*/(-_selectedOffset * Math.cos(ang));
                                //返回平移时坐标位置
                                return "translate("+parseFloat(x)+","+parseFloat(y)+")";
                            });
                        /*var _radius =con[j].radius;// d.radius;

                        var rad1 = parseFloat(_radius[0])/100;
                        var rad2 = parseFloat(_radius[1])/100;
                        var arcInRad = Math.min(_width, _height)*rad1;
                        var arcOutRad = Math.min(_width, _height)*rad2;
                        d3.selectAll("#sl"+j).selectAll("#"+ d.data.name+"a"+i)
                            .transition()
                            .duration(con[j].clickTime)
                            .attr("transform", function(){
                                var startAng = d.startAngle;
                                var endAng = d.endAngle;
                                var ang = startAng+(endAng-startAng)/2;
                                //计算平移时坐标位置
                                var x =arcInRad-10+ _selectedOffset * Math.sin(ang);
                                var y = arcOutRad-10+(-_selectedOffset * Math.cos(ang));
                                //返回平移时坐标位置
                                return "translate("+parseFloat(x)+","+parseFloat(y)+")";
                            });*/
                    }else{
                        if(ishow)
                        {
                            selectedNode.transition()
                                .duration(con[j].clickTime)
                                .attr("show",null)
                                .attr("transform","translate(0,0)");
                            //.attr("transform","translate("+_width*cen1+","+_height*cen2+")");
                        }
                    }
                }else if(con[j].selectedMode === "multiple"){

                    ishow=selectedNode.attr("show");

                    if(ishow===undefined || ishow===null)
                    {
                        selectedNode//.attr("show",true)
                            .transition()
                            .duration(con[j].clickTime)
                            .attr("show",true)
                            .attr("transform", function(d){
                                var startAng = d.startAngle;
                                var endAng = d.endAngle;
                                var ang = startAng+(endAng-startAng)/2;
                                //计算平移时坐标位置
                                var x =/*_width*cen1+*/ _selectedOffset * Math.sin(ang);
                                var y =/*_height*cen2+*/(-_selectedOffset * Math.cos(ang));
                                //返回平移时坐标位置
                                return "translate("+parseFloat(x)+","+parseFloat(y)+")";
                            });
                    }else{
                        if(ishow)
                        {
                            selectedNode.transition()
                                .duration(con[j].clickTime)
                                .attr("show",null)
                                .attr("transform","translate(0,0)");
                            //.attr("transform","translate("+_width*cen1+","+_height*cen2+")");
                        }
                    }
                }
            })
            .transition().duration(function(d,i,j){
                return con[j].transDate;
            })
            .attrTween("d", function (d) {
                var roseType = d3.select(this).attr("roseType");
                var _inrad=d3.select(this).attr("inrad");
                var _outrad=d3.select(this).attr("outrad");
                var currentArc = this.__current__; // <-C
                if (!currentArc)
                //开始显示动画旋转
                //    currentArc = {startAngle: -_startAngle/(Math.PI),
                //        endAngle:-_startAngle/(Math.PI)};
                //从0旋转
                    currentArc = {startAngle: 0,
                        endAngle:0};
                var interpolate = d3.interpolate(
                    currentArc, d);

                this.__current__ = interpolate(1);//<-D
                var arc;
                con.forEach(function(dd){
                    var _radius =dd.radius;
                    var rad1 = parseFloat(_radius[0])/100;
                    var rad2 = parseFloat(_radius[1])/100;
                    var arcInRad = Math.min(_width, _height)*rad1;
                    var arcOutRad =Math.min(_width, _height)*rad2;
                    var rad = dd.roseRadius;
                    arc = d3.svg.arc()
                        .innerRadius(Math.min(_width, _height)*(parseFloat(_inrad)/100))
                        .outerRadius(function(){
                            if(roseType === null){
                                return Math.min(_width, _height)*(parseFloat(_outrad)/100);
                            }else{
                                return (Math.min(_width, _height)*(parseFloat(_outrad)/100) - Math.min(_width, _height)*(parseFloat(_inrad)/100)) * (d.data.data / rad) + Math.min(_width, _height)*(parseFloat(_inrad)/100);
                            }
                        });
                    return arc;
                });

                return function (t) {
                        return arc(interpolate(t));
                };
            });


        //画圆圈
        pg.selectAll("circle")
            .data(function(d){
                return d.data;
            })
            .enter().append("circle")
            .attr("fill", function(d,i,j){
                return con[j].itemStyle.normal.circleFill;
            })
            .attr("stroke",function(d,i,j){
                return con[j].itemStyle.normal.circlestoke
            } )
            .attr("stroke-width", function(d,i,j){
                return con[j].itemStyle.normal.circlestokewidth
            } )
            .style("opacity",function(d,i,j){
                return con[j].itemStyle.normal.opacity
            } )
            .transition().duration(2000)
            .style("opacity",function(d,i,j){
                return con[j].itemStyle.emphasis.opacity
            })
            .attr("cx", function(){
                return 0;
            })
            .attr("cy",function(){
                return 0;
            })
            .attr("r", function (d, i,j) {
                var _radius = con[j].radius;
                var rad1 = parseFloat(_radius[0])/100;
                var rad2 = parseFloat(_radius[1])/100;
                var arcInRad = Math.min(_width, _height)*rad1;
                var arcOutRad = Math.min(_width, _height)*rad2;
                var rad = con[j].roseRadius;
                var clon = [];
                clon = con[j].data.map(function(d){return Math.max(d.data);})

                var maxNum = clon.max();
                var roseOutRad = (arcOutRad - arcInRad) * (maxNum / rad) + arcInRad;

                if(i === 0){
                        if(rad1 === 0){
                            return arcInRad;
                        }else{
                            return arcInRad-10;
                        }
                    }else if(i === 1){
                        if(con[j].roseType === null){
                            return arcOutRad+10;
                        }else{
                           return  roseOutRad+10;
                        }
                    }
            });

        //退出
        svg.selectAll(".pieg")
            .data(con)
            .exit();

        pg.selectAll(".ppath")
            .data(function(d,i){
                return pie(d.data);
            })
            .exit().remove();

console.log("画完")

    }
    //获取中间角度
    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    //画文字label在各扇形上
    function drawLabels(con,text){
        console.log("开始画文字标签");
        /* ------- TEXT INNERLABELS -------*/
        //进入
        text.selectAll(".lab")
            .data(function(d,i){
                return pie(d.data);
            })
            .enter()
            .append("text")
            .attr("class","lab")
            .attr("id",function(d,i){
                return d.data.name+"a"+i;
            })
            .style("opacity", 0);

        text.selectAll(".lab")
            .data(function(d,i){
                return pie(d.data);
            })
            .attr("id",function(d,i){
                return d.data.name+"a"+i;
            })
            .attr("roseType",function(d,i,j){
                return con[j].roseType;
            })
            .attr("labelShow",function(d,i,j){
                return con[j].itemStyle.normal.label.show;
            })
            .attr("labelPosition",function(d,i,j){
                return con[j].itemStyle.normal.label.position;
            })
            .attr("inrad",function(d,i,j){
                return con[j].radius[0];
            })
            .attr("outrad",function(d,i,j){
                return con[j].radius[1];
            })
            .attr("dy", ".35em")
            .text(function(d,i,j) {
                if(con[j].itemStyle.normal.label.show === true){
                    if(con[j].itemStyle.normal.label.position === "outer"){
                        return d.data.name;
                    }else if(con[j].itemStyle.normal.label.position === "inner"){
                        return d.value;
                    }
                }else{
                    return null;
                }
            })
            .style("fill",function(d,i,j){
                if(con[j].itemStyle.normal.label.position === "outer"){
                    /*var color;var endColor = [];
                    if(con[j].itemStyle.normal.color === undefined || con[j].itemStyle.normal.color === null){
                        color=_config.color;
                    }else{
                        color = con[j].itemStyle.normal.color
                    }
                    var num = Math.ceil(con[j].data.length / color.length);
                    for(var c = 0; c < num;c++){
                        for(var cc = 0 ; cc < color.length ; cc++){
                            endColor.push(color[cc]);
                        }
                    }
                    return endColor[i];*/
                    return useColor[j][i];
                    //return _config.color[i];
                }else if(con[j].itemStyle.normal.label.position === "inner"){
                    return con[j].itemStyle.normal.label.textStyle.innerLabelFill;
                }
            })
            .transition().duration(function(d,i,j){
                return con[j].transDate;
            })
            .style("opacity", 1)
            .attrTween("transform", function(d) {
                var arc,arcInRad,arcOutRad,
                    _endinflexioLen,
                    _fontLen,pos,_radius,rad1,rad2;
                var roseType = d3.select(this).attr("roseType");
                var labelShow = d3.select(this).attr("labelShow");
                var labelPosition = d3.select(this).attr("labelPosition");
                var _inrad=d3.select(this).attr("inrad");
                var _outrad=d3.select(this).attr("outrad");
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);

                    con.forEach(function(dd){
                       var _radius =dd.radius;
                        rad1 = parseFloat(_radius[0])/100;
                        rad2 = parseFloat(_radius[1])/100;
                        arcInRad = Math.min(_width, _height)*rad1;
                        arcOutRad =Math.min(_width, _height)*rad2;
                        var rad = dd.roseRadius;
                        _endinflexioLen = dd.itemStyle.normal.labelLine.endinflexiolen,
                            _fontLen = dd.itemStyle.normal.labelLine.fontlen
                        arc = d3.svg.arc()
                            .innerRadius(Math.min(_width, _height)*(parseFloat(_inrad)/100))
                            .outerRadius(function(){
                                if(roseType === null){
                                    return Math.min(_width, _height)*(parseFloat(_outrad)/100);
                                }else{
                                    return (Math.min(_width, _height)*(parseFloat(_outrad)/100) - Math.min(_width, _height)*(parseFloat(_inrad)/100)) * (d.data.data / rad) + Math.min(_width, _height)*(parseFloat(_inrad)/100);
                                }
                            });
                        return arc,_endinflexioLen,_fontLen;
                    });
                    if(labelPosition === "outer"){
                        //计算文字位置，和指示线的终点位置一样计算
                        pos = arc.centroid(d2);
                        pos[0] =(_endinflexioLen + Math.min(_width, _height)*(parseFloat(_outrad)/100))*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2))+_fontLen* (midAngle(d2) < Math.PI ? 1 : -1);
                        pos[1] =-(Math.min(_width, _height)*(parseFloat(_outrad)/100)+_endinflexioLen)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    }
                    if(labelPosition === "inner"){
                        //if(_inrad === "0"){
                        //    pos = arc.centroid(d2);
                        //    //pos[0] =Math.min(_width, _height)*(parseFloat(_outrad)/100)/2*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        //    //pos[1] =-Math.min(_width, _height)*(parseFloat(_outrad)/100)/2*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        //}else{
                            pos = arc.centroid(d2);
                            //pos[0] =(Math.min(_width, _height)*(parseFloat(_inrad)/100)+(Math.min(_width, _height)*(parseFloat(_outrad)/100)-Math.min(_width, _height)*(parseFloat(_inrad)/100))/2)*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                            //pos[1] =-(Math.min(_width, _height)*(parseFloat(_inrad)/100)+(Math.min(_width, _height)*(parseFloat(_outrad)/100)-Math.min(_width, _height)*(parseFloat(_inrad)/100))/2)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        //}

                    }
                    return "translate("+ pos +")";
                };
            })
            .styleTween("text-anchor", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start":"end";
                };
            });

       text.selectAll(".lab")
            .data(function(d,i){
                return pie(d.data);
            })
            .exit().remove();
    }

    //画指示线
    function drawLine(polylineg,con){
        /* ------- SLICE TO TEXT POLYLINES -------*/
        console.log("开始画指示线");
        polylineg.selectAll("polyline")
            .data(function(d,i){
                return pie(d.data);
            })
            .enter()
            .append("polyline")
            .style("opacity", 0);

        polylineg.selectAll("polyline")
            .data(function(d,i){
                return pie(d.data);
            })
            .attr("roseType",function(d,i,j){
                return con[j].roseType;
            })
            .attr("lineShow",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.show ;
            })
            .transition().duration(function(d,i,j){
                return con[j].transDate;
            })
            .style("opacity", 1)
            .attr("stroke",function(d,i,j){
                /*var color;var endColor = [];
                if(con[j].itemStyle.normal.color === undefined || con[j].itemStyle.normal.color === null){
                    color=_config.color;
                }else{
                    color = con[j].itemStyle.normal.color
                }
                var num = Math.ceil(con[j].data.length / color.length);
                for(var c = 0; c < num;c++){
                    for(var cc = 0 ; cc < color.length ; cc++){
                        endColor.push(color[cc]);
                    }
                }
                //为饼图填充颜色
                //var color=_config.color[i];
                return endColor[i];*/
                return useColor[j][i];
            })
            .attr("stroke-width",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.lineStyle.width;
            })
            .attr("fill",function(d,i,j){
                return con[j].itemStyle.normal.labelLine.lineFill;
            })
            .attrTween("points", function(d){
                var arc,arcInRad,arcOutRad,_inflexioLen ,
                    _endinflexioLen,
                    _fontLen,rad;
                var roseType = d3.select(this).attr("roseType");
                var lineShow = d3.select(this).attr("lineShow");
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    con.forEach(function(dd){
                        var _radius =dd.radius;
                        var rad1 = parseFloat(_radius[0])/100;
                        var rad2 = parseFloat(_radius[1])/100;
                        arcInRad = Math.min(_width, _height)*rad1;
                        arcOutRad =Math.min(_width, _height)*rad2;
                        rad = dd.roseRadius;
                        _inflexioLen = dd.itemStyle.normal.labelLine.inflexiolen,
                        _endinflexioLen = dd.itemStyle.normal.labelLine.endinflexiolen,
                        _fontLen = dd.itemStyle.normal.labelLine.fontlen;
                        arc = d3.svg.arc()
                            .innerRadius(arcInRad)
                            .outerRadius(function(){
                                if(roseType === null){
                                    return arcOutRad;
                                }else{
                                    return (arcOutRad - arcInRad) * (d.data.data / rad) + arcInRad;
                                }
                            });
                        return arc,arcOutRad,arcInRad,_inflexioLen,_endinflexioLen,_fontLen,rad;
                    });
                    var startPoint = arc.centroid(d2);
                    if( roseType === null){
                        //指示线起始位置
                        startPoint[0] = arcOutRad*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        startPoint[1] = - arcOutRad*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    }else{
                        var roseOutRad = (arcOutRad - arcInRad) * (d.data.data / rad) + arcInRad;
                        //指示线起始位置
                        startPoint[0] = roseOutRad*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        startPoint[1] = - roseOutRad*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    }
                    //指示线转折点位置 pos[0] = pos[0]+100* (midAngle(d2) < Math.PI ? 1 : -1);
                    var  inflexio = arc.centroid(d2);
                    inflexio[0] =(_inflexioLen+ arcOutRad)*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    inflexio[1] =-(arcOutRad+_inflexioLen)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    //指示线结束位置
                    var pos = arc.centroid(d2);
                    pos[0] =(_endinflexioLen + arcOutRad)*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2))+_fontLen* (midAngle(d2) < Math.PI ? 1 : -1);
                    pos[1] =-(arcOutRad+_endinflexioLen)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    if(lineShow === "true"){
                        return [startPoint, inflexio,pos];
                    }else{
                        return [];
                    }

                };
            });

        polylineg.selectAll("polyline")
            .data(function(d,i){
                return pie(d.data);
            })
            .exit().remove();
    }


    function mouseOverEvent(id,dd,n,len){
       //显示文字在饼图中间
        d3.selectAll(id).append("g")
            .attr("class","textG"+n)
            .append("text")
            .text(function(d,i){
                var textValue= dd.data.name;
                return textValue;
            })
            .attr("font-weight",function(d){
                return d.itemStyle.normal.label.textStyle.font_weight;
            })
            .attr("font-size",function(d,i){
               //console.log(d3.selectAll("text").node().getBBox());
                return d.itemStyle.normal.label.textStyle.font_size;
            })
            .attr("font-family",function(d){
                return d.itemStyle.normal.label.textStyle.font_family;
            })
            .attr("transform",function(d){
                var _radius =d.radius;
                var rad1 = parseFloat(_radius[0])/100;
                var rad2 = parseFloat(_radius[1])/100;
                arcInRad = Math.min(_width, _height)*rad1;
                arcOutRad =Math.min(_width, _height)*rad2;
                var _center = d.center;
                var cen1 = parseFloat(_center[0])/100;//百分数装换成小数
                var cen2 = parseFloat(_center[1])/100;//百分数装换成小数

                var wid = parseInt(d3.select(this).style("width"));
                var hei = parseInt(d3.select(this).style("height"));
                if(arcInRad === 0){
                    return "translate("+(-(wid/2))+","+(wid-arcOutRad*2)+")";
                    //return "translate("+(_width*cen1-(wid/2))+","+ (wid-80) +")";
                }
                return "translate("+(-(wid/2))+","+hei/4+")";
                //return "translate("+(_width*cen1-(wid/2))+","+(_height*cen2+hei/4)+")";
            })
            .attr("fill",function(d,i,j){

                /*var color;var endColor = [];
                if(d.itemStyle.normal.color === undefined || d.itemStyle.normal.color === null){
                    color=_config.color;
                }else{
                    color = d.itemStyle.normal.color;
                }
                var num = Math.ceil(d.data.length / color.length);
                for(var c = 0; c < num;c++){
                    for(var cc = 0 ; cc < color.length ; cc++){
                        endColor.push(color[cc]);
                    }
                }
                return endColor[n];*/
                return useColor[len][n];
            } );
    }
    //数据检验
    function checkData(data){
        // console.log(data);
        var sum = 0;
        var zeroNum = 0;
        var largeZero = 0;
        var str = 0;
        var newData = [];
        var arrayData = [];
        var dataArr ;
        if (data !== null && data.length > 0) {
                for(var m = 0;m < data.length;m++){
                    if(data.length > 0 && typeof(data)!=="undefined"){
                        //判断数据类型 如果为非number类型的用“-”代替
                        if(typeof data[m].data !== "number"){
                            data[m].data = "-";
                            str++;
                        }else{
                            if(data[m].data < 0){
                                 newData.push(data[m]);
                                sum++;
                            }else if(data[m].data > 0){
                                newData.push(data[m]);
                                largeZero++;
                            }else if(data[m].data === 0){
                                newData.push(data[m]);
                                zeroNum++;
                            }
                        }
                    }
                }

                if(sum === 0 && largeZero === 0 && zeroNum <= newData.length) {//零
                    return null;
                }else {
                    if (str !== 0 && sum === 0 && zeroNum === 0 && largeZero === 0) {//字符串
                        return null;
                    } else if ((sum === 0 && zeroNum === 0 && largeZero <= newData.length) || (sum === 0 && largeZero < newData.length && zeroNum < newData.length)) {//正数 //正数 零
                        for (var t = 0; t < newData.length; t++) {
                            if (newData[t].data !== 0) {
                                arrayData.push(newData[t]);
                            }
                        }

                    } else if ((largeZero === 0 && zeroNum === 0 && sum <= newData.length) || (largeZero === 0 && sum < newData.length && zeroNum < newData.length)) {//负数 || 负数 零
                        // newArray = newData;
                        for (var t = 0; t < newData.length; t++) {
                            if (newData[t].data !== 0) {
                                arrayData.push(newData[t]);
                            }
                        }
                        for (var m = 0; m < newArray.length; m++) {
                            if (newArray[m].data < 0) {
                                arrayData[m].data = Math.abs(arrayData[m].data);
                            }
                        }

                    } else if ((zeroNum === 0 && largeZero < newData.length && sum < newData.length) || (sum < newData.length && largeZero < newData.length && zeroNum < newData.length)) {//负数 正数 //负数 零 正数
                        //newArray = newData;
                        for (var t = 0; t < newData.length; t++) {
                            if (newData[t].data !== 0 && newData[t].data > 0) {
                                arrayData.push(newData[t]);
                            }
                        }
                    }
                }
        }
        return arrayData;
    }
    return _pie;
}