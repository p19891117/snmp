"use strict";

/**
 * 水滴提醒效果
 * @param svg svg对象
 * @param text  要提醒的文本
 * @param x 提示点x坐标
 * @param y 提示点y坐标
 * @returns tooltip对象
 * @author gao_jun
 * @time  2014-12-16
 *
 * use sample:
 * 创建:<br>
 * var tooltip = tooltip(svg, "TooltipText", 300, 300);
 * tooltip.text.attr("fill", "white");
 * tooltip.sweat.attr("fill", "blue");
 * tooltip.sweat.attr("opacity", "0.5");
 * tooltip.sweatTooltip();
 * 移除:<br>
 * tooltip.remove();
 */
function tooltip(svg, text, x, y) {
    //创建提示内部对象
    var _tooltip = {};
    //提示组合容器
    var _tooltipG = svg.append("g")

    _tooltip.tooltipG=_tooltipG;
    _tooltip.sweat = _tooltipG.append("path");
    //计算字体长度
    _tooltip.text = _tooltipG.append("text").text(text).attr("font-size",15);
    //sweatTooltip主方法
    _tooltip.sweatTooltip = function () {
        var width = _tooltip.text[0][0].clientWidth;
        var height=_tooltip.text[0][0].clientHeight;
        var r = width / 2 + 5;
        var path = calSweatPath(x, y, r);

        var rx=x;//-r;
        var ry=y - (r * Math.sqrt(2))+5;

        _tooltip.sweat.attr("d", calSweatPath(x, y, 2)).transition()
            .duration(1000).ease('quad-in')
            .attr("d", path).attr("r",r);

        _tooltip.text
            .attr("font-size", 0)
            .attr("x",rx)
            .attr("y", y)
            .attr("width",0)
            .attr("height",0)
            .attr("opacity",0)
            .transition().duration(1000).ease('quad-in')
            .attr("font-size", 14)
            .attr("x",rx ).attr("y", ry)
            .attr("width",width)
            .attr("height",height)
            .attr("opacity",1)
            .attr("text-anchor", "middle");





        //setTimeout(function () {
        //    _tooltip.text.attr("text-anchor", "middle").attr("x", x).attr("y", ry);//y - (r * Math.sqrt(2))
        //}, 1000);


        return _tooltip;
    };

    var times;
    var fontSize=0; //默认font-size为0
    function changeTextFontSize(nowtime, millisecond)
    {

        console.log("times===="+times)
        if(times===undefined || times===null)
        {
            console.log("zou le ma ......")
            times=nowtime;
        }

        var millis=nowtime-times;

        console.log("millis======"+millis);
        if(millis<=300)
        {
            fontSize=0;
        }else if(millis> 300 && millis<millisecond)
        {

            if(fontSize===0)
            {
                fontSize=5;
            }else
            {
                fontSize++;
            }
        } else if(millis===millisecond)
        {
            fontSize=14;
        }


        return fontSize;
    }
    _tooltip.mouseOverSweat=function()
    {
        var r=parseInt(_tooltip.sweat.attr("r"));
        _tooltip.sweat.attr("d", calSweatPath(x, y,r+1 ));
    };
    _tooltip.mouseOutSweat=function()
    {
        var r=parseInt(_tooltip.sweat.attr("r"));
        _tooltip.sweat.attr("d", calSweatPath(x, y,r-1 ));
    };
    //移除气泡
    _tooltip.remove = function () {

        _tooltipG.remove();
    };
    /**
     * 计算水滴的路径
     * @param x 提示点x坐标
     * @param y 提示点y坐标
     * @param r   上部圆心半经
     * @returns path 水滴路径
     */
    function calSweatPath(x, y, r) {

        //根据下方位置和圆心来画计算提醒气泡位置。
        var x1 = x - (r * Math.sqrt(2)) / 2;
        var y1 = y - (r * Math.sqrt(2)) / 2;
        var y2 = y1;
        var x2 = x + (r * Math.sqrt(2)) / 2;

        //计算path路径
        var path = "M" + x1 + " " + y1 + " A" + r + " " + r + " " + 0 + " " + 1 + " " + 1 + " " + x2 + " " + y2 + " L" + x + " " + y + " Z";
        return path;
    }

    //返回
    return _tooltip;
}