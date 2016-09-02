"use strict";

/**
 * 标题
 * @autor wang_heng
 * @date 2014-12-26
 * @example
 *
 * var myTitle = title();
 * myTitle.render(svg,config);
 * @returns {{}}
 */
function title() {
    var _title = {};

    var _gTitle;  //标题层

    /**
     * 创建标题层
     * @param svg  svg对象
     * @param config  与用户定义的配置合并后的配置对象
     */
    _title.render = function(svg,config){
        if(config.title.text==='' && config.title.subtext===''){
            if(_gTitle){
                _gTitle.remove();  //删除标题层
            }
            return;
        }

        //创建标题层
        var gTitle = svg.selectAll(".gTitle")
            .data([1])
            .enter()
            .append("g")
            .attr("class","gTitle");

        //添加背景框
        var titleRect = gTitle.append("rect")
            .attr("class","titleRect")
            .attr("x",0)
            .attr("y",0);

        //添加主标题
        var titleText = gTitle.append("text")
            .attr("class", "titleText");

        //添加副标题
        var titleSubtext = gTitle.append("text")
            .attr("class", "titleSubtext");



        //标题样式更新
        var gTitleUpdate = svg.select(".gTitle");
        var titleRect = gTitleUpdate.selectAll(".titleRect");
        var titleTextUpdate = gTitleUpdate.selectAll(".titleText");
        var titleSubtextUpdate = gTitleUpdate.selectAll(".titleSubtext");
        _gTitle = gTitleUpdate;


        //更新主标题的样式
        titleTextUpdate.attr("font-family",config.title.textStyle.fontWeight)
            .attr("font-size",config.title.textStyle.fontSize)
            .attr("fill",config.title.textStyle.color)
            .text(config.title.text)
            .attr("x",0)
            .attr("y",function(){
                return d3.select(this).node().getBBox().height;
            });

        var titleTextBBox = titleTextUpdate.node().getBBox();
        var titleTextHeight = titleTextBBox.height;
        var titleTextWidth = titleTextBBox.width;

        //更新副标题样式
        titleSubtextUpdate.text(config.title.subtext)
            .attr("fill",config.title.subtextStyle.color)
            .attr("x",0)
            .attr("y",function(){
                return titleTextHeight+parseFloat(d3.select(this).node().getBBox().height)+config.title.itemGap;
            });

        var titleSubtextBBox = titleSubtextUpdate.node().getBBox();
        var titleSubTextWidth = titleSubtextBBox.width;


        //获取标题层的高宽
        var gBBox = gTitleUpdate.node().getBBox();
        var gHeight = gBBox.height;
        var gWidth = gBBox.width;

        //更新背景的样式
        titleRect.attr("width",gWidth+1)
            .attr("height",gHeight+config.title.itemGap+1)
            .style("fill",config.title.backgroundColor)
            .style("stroke",config.title.borderColor)
            .style("stroke-width",config.title.borderWidth);


        //标题位置变换
        var translatX = getTranslateX(config,titleTextUpdate,titleSubtextUpdate,titleTextWidth,titleSubTextWidth);  //x轴平移距离
        var translatY = getTranslateY(config,gHeight);  //y轴平移距离
        gTitleUpdate.attr("transform","translate("+translatX+","+translatY+")");
    };

    /**
     * 获取x轴平移的位置
     * @param config  配置参数对象
     * @param titleTextUpdate  主标题对象
     * @param titleSubtextUpdate  副标题对象
     * @param titleTextWidth  主标题宽度
     * @param titleSubTextWidth  副标题宽度
     * @returns {number}
     */
    function getTranslateX(config,titleTextUpdate,titleSubtextUpdate,titleTextWidth,titleSubTextWidth){
        var translatX = 0;

        switch (config.title.x){
            case 'left':
                translatX = 5;
                break;
            case 'center':
                translatX = (config.canvas.width-(titleTextWidth>titleSubTextWidth?titleTextWidth:titleSubTextWidth))/2;
                titleTextWidth>titleSubTextWidth?titleSubtextUpdate.attr("x",(titleTextWidth-titleSubTextWidth)/2):titleTextUpdate.attr("x",(titleSubTextWidth-titleTextWidth)/2);
                break;
            case 'right':
                translatX = (config.canvas.width-(titleTextWidth>titleSubTextWidth?titleTextWidth:titleSubTextWidth))-5;
                titleTextWidth>titleSubTextWidth?titleSubtextUpdate.attr("x",(titleTextWidth-titleSubTextWidth)):titleTextUpdate.attr("x",(titleSubTextWidth-titleTextWidth));
                break;
            default :
                if(isNaN(parseFloat(config.title.x))){
                    translatX = 5;
                }else{
                    translatX = config.title.x;
                }
                break;
        }
        return translatX;
    }

    /**
     *
     * @param config  配置对象
     * @param gHeight  标题层的高度
     * @returns {number}
     */
    function getTranslateY(config,gHeight){
        var translatY = 0;

        switch (config.title.y){
            case 'top':
                translatY = 0;
                break;
            case 'center':
                translatY = ((config.canvas.height-gHeight)/2)-5;
                break;
            case 'bottom':
                translatY = config.canvas.height-gHeight-5;
                break;
            default :
                if(isNaN(parseFloat(config.title.y))){
                    translatY = 0;
                }else{
                    translatY = config.title.y;
                }
                break;
        }
        return translatY;
    }

    return _title;
}