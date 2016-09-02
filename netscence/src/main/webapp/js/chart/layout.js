"use strict";
/**
 *
 * @returns {Function}
 */
function layout() {
    var _layout = {};

    _layout.conversion = function (data){
        var newSeries = [];//重新排序后data数组，按柱子顺序，同一组柱子放在一起
        var barsNum;//一个刻度区间内柱子数
        var groupList = [];//groupList数组中每个数组代表一组堆叠或层叠的数据，即stack属性或cover属性相同的数据
        var typeList = [];//下标与groupList对应，stack数据存放“stack”+stack值，cover数据存放“cover”+cover值，不是stack和cover的存放“$$”+i
        var regStack = /^stack:/;
        var regCover = /^cover:/;
        //将属于同一个stack或cover的放到一个数组中并把数组放到groupList数组中
        for(var i=0;i<data.length;i++){
            var s = data[i];
            if(s.stack===null&& s.cover===null){
                typeList.push("$$"+i);
                groupList.push([s]);
            }else if(s.stack!==null){
                //判断是否已经存在该stack分组
                var index = typeList.indexOf("stack:"+ s.stack);
                if(index==-1){
                    typeList.push("stack:"+ s.stack);
                    groupList.push([s]);
                }else{
                    groupList[index].push(s);
                }
            }else{
                //判断是否已经存在该cover分组
                var index = typeList.indexOf("cover:"+ s.cover);
                if(index==-1){
                    typeList.push("cover:"+ s.cover);
                    groupList.push([s]);
                }else{
                    groupList[index].push(s);
                }
            }
        }
        //分别处理stack或cover数据
        for(var i=0;i<groupList.length;i++){//分三步，1、取出每个中的data属性（数值数组）组成数组 2、判断类型，转换数据 3、将转化后的值赋给原对象；
            var data = [];
            //为转换数据，将一组柱子的data属性值分别取出放入data数组
            for(var j=0;j<groupList[i].length;j++){
                data.push(groupList[i][j].data);
            }
            //判断数组是堆叠层叠还是分组
            if(regStack.exec(typeList[i])!==null){
                data = stack(i,data);
            }else if(regCover.exec(typeList[i])!==null){
                data = cover(i,data);
            }else{
                data = group(i,data);
            }
            //将转换完成的data值放回到data属性
            for(var n=0;n<groupList[i].length;n++){
                groupList[i][n].data = data[n];
                newSeries.push(groupList[i][n]);
            }
        }
        //返回处理后数据和每个刻度柱子数
        return [newSeries,groupList.length];
    }

    /**
     * @param x 标识在刻度区间内，该堆叠柱子是第几根柱子
     * @param data data格式二维数组，长度统一，可能有‘-’数据
     * @returns {Array}[x:0,y:1,x0:1,y0:1]  x：数据在数组中下标
     *                                   y：数据值，当该data值为‘-’是y值为‘n-’n为标识本次‘-’是在同一堆叠中出现的第几个
     *                                   x0：该数据标识的柱子在一个刻度区间内属于第几根
     *                                   y0：堆叠属性，下方堆叠柱子的x的和，当y值为非数值类型时，y0为所有数值类型x的和，层叠和分组时为0
     */
    function stack(x,data) {
        var newData =[];
        var positive = [];//记录正数值堆积y0
        var negative = [];//记录负数值堆积y0
        var special = [];//标记数据中出现的‘-’是同一堆叠中第几个
        //格式化数据，并将本组堆叠柱子的堆叠的正数最大值和负数最小值保存到positive和negative中
        for(var j=0;j<data.length;j++){
            var blist = data[j];
            if(j===0){//堆叠数据第一个，y0为0
                for(var i=0;i<blist.length;i++){
                    if(typeof(blist[i])!=="number"){
//                        blist[i] = {x:i,y:0+blist[i],x0:x,y0:0,tag:i};
                        blist[i] = {x:i,y:0+"",x0:x,y0:0,tag:i};
                        special.push(1);
                        positive.push(0);
                        negative.push(0);
                    }else{
                        blist[i] = {x:i,y:blist[i],x0:x,y0:0,tag:i};
                        special.push(0);
                        if(blist[i].y>=0){
                            positive.push(blist[i].y);
                            negative.push(0);
                        }else{
                            positive.push(0);
                            negative.push(blist[i].y);
                        }
                    }
                }
                newData.push(blist);
            }else{
                for(var i=0;i<blist.length;i++){
                    if(typeof(blist[i])!=="number"){
//                        blist[i] = {x:i,y:(special[i]+blist[i]),x0:x,y0:0,tag:i};
                        blist[i] = {x:i,y:(special[i]+""),x0:x,y0:0,tag:i};
                        special[i] +=1;
                    }else{
                        blist[i] = {x:i,y:blist[i],x0:x,y0:getBefore(newData,i,blist[i]),tag:i};
                        if(blist[i].y>=0){
                            positive[i] = blist[i].y+blist[i].y0;
                        }else{
                            negative[i] = blist[i].y+blist[i].y0;
                        }
                    }
                }
                newData.push(blist);
            }
        }
        //修改非数值型data的y0值
        for(var k=0;k<newData.length;k++){
            for(var m=0;m<newData[k].length;m++){
                if(typeof(newData[k][m].y)!=="number"){
                    if(positive[m]==0&&negative[m]==0){
                        newData[k][m].y0 = 0;
                    }else if(positive[m]!==0){
                        newData[k][m].y0 = positive[m];
                    }else{
                        newData[k][m].y0 = negative[m];
                    }
                }
            }
        }
        return newData;
    }

    /**
     * 处理堆叠在一起的数据同时有正负数情况时的y0值
     * 从list数组中上一组中正负相同的y0值
     * list格式：[[{x:0,y:1,x0:1,y0:1},{x:0,y:1,x0:1,y0:1}],[{x:0,y:1,x0:1,y0:1},{x:0,y:1,x0:1,y0:1}],[{x:0,y:1,x0:1,y0:1},{x:0,y:1,x0:1,y0:1}]]
     * @param list stack方法已经转化的柱子数据
     * @param n 数组中的下标，对应到list数据数组下标
     * @param value 柱子数据值
     * @returns {*}
     */
    function getBefore(list,n,value){
        //倒序循环list
        for(var i=list.length-1;i>=0;i--){
            var vb = list[i][n].y;
            if(value>=0&&vb>=0){
                return parseFloat(vb)+list[i][n].y0;
            }else if(value<0&&vb<0){
                return vb+list[i][n].y0;
            }
        }
        return 0;
    }

    /**
     *
     * @param x 标识在刻度区间内，该是第几根柱子
     * @param data
     * @returns {Array}
     */
    function cover(x,data){
        var _data =[];
        for(var i=0;i<data.length;i++){
            var d = [];
            for(var j=0;j<data[i].length;j++){
                if(typeof(data[i][j])!=="number"){
//                    d.push({x:j,y:"0"+data[i][j],x0:x,y0:0,tag:j});
                    d.push({x:j,y:"0",x0:x,y0:0,tag:j});
                }else{
                    d.push({x:j,y:data[i][j],x0:x,y0:0,tag:j});
                }
            }
            _data.push(d);
        }
        return _data;
    }

    /**
     *
     * @param x 标识在刻度区间内，该是第几根柱子
     * @param data
     * @returns {Array}
     */
    function group(x,data){
        var _data =[];
        for(var i=0;i<data.length;i++){
            var d = [];
            for(var j=0;j<data[i].length;j++){
                if(typeof(data[i][j])!=="number"){
//                    d.push({x:j,y:"0"+data[i][j],x0:x,y0:0,tag:j});
                    d.push({x:j,y:"0",x0:x,y0:0,tag:j});
                }else{
                    d.push({x:j,y:data[i][j],x0:x,y0:0,tag:j});
                }
            }
            _data.push(d);
        }
        return _data;
    }

    return _layout;
}
