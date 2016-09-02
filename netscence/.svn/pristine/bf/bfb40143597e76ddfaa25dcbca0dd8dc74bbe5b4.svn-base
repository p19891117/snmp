"use strict";

function realTime(svg){
    var _realTime = {};
    var _startTime = null,                 //开始时间，默认当前时间
        _endTime = null,                   //结束时间，默认当前时间
        _stepTimeLength = 30,       //每段的时间长度，默认30分钟
        _step = 180,                      //每个刻度的长度
        _height = 110,
        _length,
        _marks = [],                //标记数组
        _state = 1;                 //实验状态 1:创建  2:正在进行 3:暂停  4: 已完成
    var _svg = svg,                  //svg
        scale,                     //比例尺
        _xAxis = {},                //坐标轴
        _hasEndTime = 0;            //是否设置了结束时间
    var dataset = [];               //时间轴刻度
    var x2Location = 0;
    var axisG;
    var clickNum = 0;//记录移动次数，左移+1，右移-1
    var num;   //时间轴刻度数

    var timeFormat = "yyyy-MM-dd hh:mm:ss";
    //时间格式化方法
    Date.prototype.format =function(format)
    {
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }

    _realTime.render = function(){
        _startTime = new Date(_startTime);
        //Date格式的开始时间
        var startTimeDT = new Date(_startTime);
        //结束时间不为空，并且结束时间大于开始时间
        var endTimeDT;
        if(_endTime!==null&&""!==_endTime&&(startTimeDT<new Date(_endTime))){
            endTimeDT = new Date(_endTime);

        }else{
//            var a = new Date();
//            var b = new Date(_endTime);
            if(new Date()>new Date(startTimeDT)){
                endTimeDT = new Date();
            }else{
                endTimeDT = new Date(new Date(startTimeDT).getTime()+31*60*1000);
            }
        }
        //计算有多少段
        num = Math.ceil((endTimeDT-startTimeDT)/(_stepTimeLength*60*1000));
        if(num<=1){
            num+=1;
        }
        for(var i=0;i<num;i++){
            var timeStr = new Date(startTimeDT.getTime()+(_stepTimeLength*60*1000*i)).format(timeFormat);
            dataset.push(timeStr);
        }
        _length = _step*num;
        //创建比例尺
        scale = d3.scale.ordinal()
            .domain(dataset)
            .rangeBands([0,_length]);//每180px为一个刻度，每个刻度默认30min
        var axis = d3.svg.axis()
            .scale(scale)
            .tickSize(14,0)
            .tickPadding(10)
            .orient("bottom");

        axisG = _svg.append("g")
            .attr("class","axisG")
            .attr("transform", function ()   {
                return "translate(" +  (60-clickNum*_step) + "," + _height/2 + ")";
            })
            .call(axis);

        //设置坐标轴样式
        axisG.selectAll("path")
            .attr("stroke","rgb(85,85,85)")
            .attr("stroke-width",20)
            .style("shape-rendering","crispEdges");

        axisG.selectAll(".tick line")
            .attr("stroke","rgb(85,85,85)")
            .attr("stroke-width",1)
            .style("shape-rendering","crispEdges");

        axisG.selectAll(".tick text")
            .style("font","12px 微软雅黑");

        d3.selectAll(".tick").attr("transform", function (d,i) {
            return "translate(" +  (i*_step) + "," + 0 + ")";
        });

        //标记告警
        /*axisG.append("g")
            .attr("class","marks")
            .style("cursor", "hand")
            .selectAll("line")
            .data(_marks)
            .enter()
            .append("line")
            .attr("x1",function(d){ return d.x })
            .attr("x2",function(d){ return d.x + 3;})
            .attr("stroke","rgb(255,255,255)")
            .attr("stroke-width",15)
            .on("mouseover",mouseOver)
            .on("mouseout",mouseOut);*/


        var line = axisG.append("line")
            .attr("x1",0)
            .attr("stroke","rgb(0,128,200)")
            .attr("stroke-width",20)
            .attr("x2",x2Location);

        line.transition()
            .duration(2000)
            .attr("x2",x2Location);
        setTimeout(move(line),2000);

        renderMark(_marks);

//        setInterval(function(){
//            line.attr("x2",360);
//        },5000);

    }
    //初始化时时间轴蓝条移动 stepNum是一次移动的刻度数，正数向左移，负数向右移
    _realTime.moveAxis = function(stepNum){
        if(clickNum+stepNum>=0&&clickNum+stepNum<num){
            axisG.transition()
                .duration(500)
                .attr("transform", function (d,i) {
                    clickNum+=stepNum;
                    return "translate(" + (60-clickNum*_step)  + "," +(_height/2) + ")";
                });
        }
    }
//        setInterval(moveAxis,5000);
    //控制时间轴蓝条实时移动
    function move(line){
        //当前时间大于实验结束时间
        if(null!==_endTime&&""!==_endTime&&new Date()>new Date(_endTime)){
            line.transition()
                .duration(1000)
                .attr("x2",function(){
                    return _step*num;
                });
        }else if(new Date()>new Date(_startTime)){
            x2Location = (new Date().getTime()-new Date(_startTime).getTime())/1000*(_step/(_stepTimeLength*60));
            setInterval(function(){
                line.transition()
                    .duration(1000)
                    .attr("x2",function(){
                        x2Location = (new Date()-new Date(_startTime).getTime())/1000*_step/(_stepTimeLength*60);
                        //未设置结束时间，并且轴长度不够，当前实验状态没有结束
                        if((x2Location+1>_length)&&_hasEndTime===0&&_state!==4){
                            addTime();
                        }
                        return x2Location;
                    });
            },1000);
            return x2Location;
        }/*else{
            setInterval(function(){
                line.transition()
                    .duration(1000)
                    .attr("x2",function(){
                        if(new Date()>=new Date(_startTime)){
                            x2Location = (new Date()-new Date(_startTime).getTime())/1000*_step/(_stepTimeLength*60);
                            return x2Location;
                        }else{
                            return x2Location;
                        }
                    });
            },1000);
        }*/
    }
    //增加刻度（时间轴长度）
    function addTime(){
        _endTime = new Date(_endTime.getTime()+_stepTimeLength*60*1000);
        dataset.push(new Date(new Date(dataset[dataset.length-1]).getTime()+_stepTimeLength*60*1000).format(timeFormat));
        _length = _length+180;
        //修改比例尺
        scale = d3.scale.ordinal()
            .domain(dataset)
            .rangeBands([0,_length]);//每180px为一个刻度，每个刻度默认30min
        _svg.select(".axisG").remove();
        _realTime.render();
        num+=1;
    }
//    setTimeout(addTime,5000);


    function mouseOut(){
        _svg.select(".tooltip")
            .remove();
    };

    function renderMark(mark){
        var lineG = axisG.append("g")
            .attr("class","marks")
            .style("cursor", "hand")

        lineG.selectAll("line")
            .data(_marks)
            .enter()
            .append("line")
            .attr("class","markLine")
            .attr("id",function(d,i){
                return d.id;
            });

        lineG.selectAll(".markLine")
            .data(_marks)
            .attr("x1",function(d){
                var dx = (new Date(d.time).getTime()-new Date(_startTime).getTime())*(_step/(_stepTimeLength*60*1000));
                return dx
            })
            .attr("x2",function(d){
                return (new Date(d.time).getTime()-new Date(_startTime).getTime())*(_step/(_stepTimeLength*60*1000)) + 3;
            })
            .attr("stroke","rgb(255,255,255)")
            .attr("stroke-width",15)
            .on("mouseover",function(d,i){
                var coo = d3.mouse(this);

                var g = _svg.append("g")
                    .attr("class","tooltip")
                    .attr("transform","translate("+coo+")");
                g.append("rect")
                    .attr("x",70)
                    .attr("y",10)
                    .attr("rx",10)
                    .attr("ry",10)
                    .attr("width",250)
                    .attr("height",100)
                    .attr("fill","rgba(85,85,85,0.5)");
                g.append("text")
                    .text("IP:"+_marks[i].ip)
                    .attr("fill","White")
                    .attr("dx",90)
                    .attr("dy",30)
                    .append("tspan")
                    .text("触发时间:"+_marks[i].time)
                    .attr("fill","White")
                    .attr("dx",-94)
                    .attr("dy",15)
                    .append("tspan")
                    .text("触发条件:"+((_marks[i].condition).split(":"))[0])
                    .attr("fill","White")
                    .attr("dx",-170)
                    .attr("dy",15)
                    .append("tspan")
                    .text(((_marks[i].condition).split(":"))[1].substring(0,25))
                    .attr("fill","White")
                    .attr("dy",15)
                    .attr("dx",-180)
                    .append("tspan")
                    .text(((_marks[i].condition).split(":"))[1].substring(25,(((_marks[i].condition).split(":"))[1]).length))
                    .attr("fill","White")
                    .attr("dy",15)
                    .attr("dx",-180);
            })
            .on("mouseout",mouseOut)
            .on("click",function(d,i){
            	clickScen(_marks[i].id, _marks[i].time, _marks[i].ip, _marks[i].condition);
            });
    }

    _realTime.addMark = function(mark){
        _marks.push(mark);
        renderMark(_marks);
    }

    //设置开始时间
    _realTime.startTime = function(x){
        if (!arguments.length){
            return _startTime;
        }
        _startTime = x;
        return _realTime;
    }
    //设置结束时间
    _realTime.endTime = function(x){
        if (!arguments.length){
            return _endTime;
        }
        _endTime = x;
        return _realTime;
    }
    //设置告警标记点
    _realTime.marks = function(x) {
        if (!arguments.length){
            return _marks;
        }
        _marks = x;
        return _realTime;
    };
    //设置实验状态
    _realTime.state = function(x) {
        if (!arguments.length){
            return _state;
        }
        //类型转换
        _state = "string" === typeof x ? parseInt(x) : x
        return _realTime;
    };

    return _realTime;

}