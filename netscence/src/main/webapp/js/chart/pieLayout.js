var layout = {};
layout.pie = function(){

    var innerRadius = 0,
        outerRadius = 0;

    function pie(data,type){

        if("undefined" === typeof data){
            return null;
        }

        //处理异常数据、计算数据和、最大数据
        var sum = 0;              //饼状图数据和
        var max = 0;              //饼状图最大数据
        //console.log(data);
        data.map(function(d,i) {
            if("number" !== typeof d.value){
                var tmpValue = parseFloat(d.value);
                d.value = isNaN(tmpValue) ? '-' : Math.abs(tmpValue)   //如果数据不是数值，赋值 ‘-’
                d.state = isNaN(tmpValue) ? 0 : d.state;               //如果数据不是数值，将state属性置为 0
            }
            else{
                d.value = Math.abs(d.value);
            }

            if(d.state){
                sum += "area" === type ? Math.sqrt(d.value) : d.value;  //如果数据显示，则计入数据和
                max = max < d.value ? d.value : max;                    //计算数据最大值
            }

            d.startAngle = 0;    //初始化饼状图扇形起始角度
            d.endAngle = 0;      //初始化饼状图扇形结束角度
        });



        //计算扇形起始角度、结束角度、内半径、外半径
        var preIndex = 0;                               //上一个扇形索引，用于计算各个扇形角度
        data.map(function(d,i){
            d.startAngle = data[preIndex].endAngle;     //开始角度
            d.innerRadius = innerRadius;                //内半径
            //计算结束角度 外半径
            if(d.state){
                d.endAngle = ("area" === type ? Math.sqrt(d.value) : d.value) / sum * 2 * Math.PI + d.startAngle;
                d.outerRadius = ("area" === type || "radius" === type) ?   //如果是玫瑰图，每个扇形的外半径不一样
                    (Math.sqrt(d.value / max) * (outerRadius - innerRadius) + innerRadius) : outerRadius;
            }
            else{
                d.endAngle = d.startAngle;
                d.outerRadius = innerRadius;
            }
            preIndex = i;

        });

        return data;

    }

    //内半径
    pie.innerRadius = function(x) {
        innerRadius = 0;
        if (!arguments.length) return innerRadius;
        innerRadius = x;
        return pie;
    };
    //外半径
    pie.outerRadius = function(x) {
        outerRadius = 0;
        if (!arguments.length) return outerRadius;
        outerRadius = x;
        return pie;
    };
    return pie;
}; 