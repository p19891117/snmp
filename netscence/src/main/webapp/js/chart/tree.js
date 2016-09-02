"use strict";
/**
 * 实现树形图
 * @param option
 * @param svg
 * @param config
 */
function tree(option, svg, config) {


    var _config = config;
    var _chart = {};
    var _series = option.series[0];
    var _orient = _series.orient;
    var _filterData;
    var _svg = svg;
    var _i = 0;
    var _bodyG;
    var _tree,
        _nodes,
        _diagonal;//图形生成器
    var _legendArray = []; //图例数组
    var _legendMap = new HashMap(); //图例
    var _utils = utils();
    var _width, _height;//画布的宽、高
    _chart.render = function () {


        renderBody(_svg);

    }


    /**
     * 画body
     * @param svg
     */
    function renderBody(svg) {
        mergeData(_config, option); //合并数据
        _width = _config.canvas.width;
        _height = _config.canvas.height;

        if (!_bodyG) {
            _bodyG = svg.append("g")
                .attr("class", "body")
                .attr("transform", function (d) {
                    return "translate(" + _config.canvas.margins.left
                        + "," + _config.canvas.margins.top + ")";
                });
        }

        _nodes = checkout(_series);
        _nodes.x0 = (_config.canvas.height - _config.canvas.margins.top - _config.canvas.margins.bottom) / 2;
        _nodes.y0 = 0;

        //根据orient确定布局
        if (_orient === undefined || _orient === null || _orient === "horizontal") //水平布局
        {
            _tree = d3.layout.tree()
                .size([
                    (_config.canvas.height - _config.canvas.margins.top - _config.canvas.margins.bottom),
                    (_config.canvas.width - _config.canvas.margins.left - _config.canvas.margins.right)
                ]);

            _diagonal = d3.svg.diagonal() //d3 svg 图形生成器，该对角线生成器可以创建svg：path，用以连接两个点。
                .projection(function (d) {//在这里使用对角线生成器生成那些连接树中各个节点的路径
                    return [d.y, d.x];
                });

            render(_nodes);
        }
        else if (_orient === "vertical") //垂直布局
        {
            _tree = d3.layout.tree()
                .size([
                    (_config.canvas.width - _config.canvas.margins.left - _config.canvas.margins.right),
                    (_config.canvas.height - _config.canvas.margins.top - _config.canvas.margins.bottom)
                ]);

            _diagonal = d3.svg.diagonal() //d3 svg 图形生成器，该对角线生成器可以创建svg：path，用以连接两个点。
                .projection(function (d) {//在这里使用对角线生成器生成那些连接树中各个节点的路径
                    return [d.x, d.y];
                });
            render(_nodes);
        } else if (_orient === "ring") //环形
        {

            _bodyG.attr("transform", "translate(" + _width / 2 + "," + (_height / 2) + ")");
            _tree = d3.layout.tree()
                .size([360, _width / 2 - 120])
                .separation(function (a, b) {
                    return (a.parent == b.parent ? 1 : 2) / a.depth;
                });

            _diagonal = d3.svg.diagonal.radial()
                .projection(function (d) {
                    if (isNaN(d.x)) {
                        d.x = 0;
                    }
                    return [d.y, d.x / 180 * Math.PI];
                });

            render(_nodes);
        }


        //画标题
        var _title = title();//画标题
        _title.render(_svg, _config);

        var values = _legendMap.values();
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var legObj = {};
            legObj.name = value.name;
            legObj.color = value.itemStyle.normal.color; //颜色  设置默认
            if (value.itemStyle) //如果每组有自己的样式则获取每组的样式
            {
                legObj.color = value.itemStyle.normal.color;
            }
            //图形标识
            legObj.type = _config.CHART_TYPE_SCATTER;
            _legendArray.push(legObj);
        }
        //画图例
        var leg = legend(_svg, _config, _legendArray);
        leg.removeLegend();
        leg.render();

        _config.EVENT.LEGEND_HOVERLINK = _mouseOverLink;
        _config.EVENT.LEGEND_OUTLINK = _mouseOutLink;
        _config.EVENT.LEGEND_SELECTED = _legendClickLink;
    }

    /**
     * 画点，线
     * @param source
     */
    function render(source) {

        var nodes = _tree.nodes(_nodes).reverse();
        renderNodes(nodes, source);
        renderLinks(nodes, source);


    }


    /***
     * 画节点
     */
    function renderNodes(nodes, source) {

        var r = 5;// 画圆默认的半径5.
        nodes.forEach(function (d) {//笛卡尔坐标x，y计算位置；循环遍历所有的节点，所有节点之间加上180像素的间隔。
            d.y = d.depth * 180;//使用y坐标 渲染的是一个水平的树
        });
        var node = _bodyG.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++_i);  //把生成的节点作为数据生成树中的节点，我们使用索引号作为每个节点的id
            });


        //进入
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("source", function (d) { //自定义一个属性  source 指向父
                if (d.parent) {
                    return d.parent.id;
                } else {
                    return d.id;
                }
            })
            .attr("target", function (d) { //target指向本身
                return d.id;
            })
            .attr("transform", function (d) {
                if (_orient === "horizontal") {
                    return "translate(" + source.y0
                        + "," + source.x0 + ")";
                }
                else if (_orient === "vertical")
                {

                    return "translate(" + source.x0
                        + "," + source.y0 + ")";

                }else if (_orient === "ring") {

                    if (isNaN(d.x)) {
                        d.x = 0;
                    }

                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                }
            })
            .on("mouseover", function (d) {

                overNodeParents(d3.select(this), d, "mouseover");
                overNodeChildren(d, "mouseover");
            })
            .on("mouseout", function (d) {

                overNodeParents(d3.select(this), d, "mouseout");
                overNodeChildren(d, "mouseout");
            });


        nodeEnter.append("svg:circle") //画圆点

            .attr("r", r)//1e-6
            .on("click", function (d) {//添加click事件
                onClick(d);
                render(d);

                if (d.isOpen) {
                    d3.select(this).attr("r", r);
                } else  //未展开
                {
                    var cr = r + 1;
                    d3.select(this).attr("r", cr);
                }
            });
        //更新
        var nodeUpdate = node.transition()
            .attr("transform", function (d) {

                if (_orient === "horizontal") {
                    return "translate(" + d.y + "," + d.x + ")";
                }
                else if (_orient === "vertical")
                {
                    return "translate(" + d.x + "," + d.y + ")";

                }
                else if (_orient === "ring") {

                    if (isNaN(d.x)) {
                        d.x = -90;
                    }
                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                }
            });
        nodeUpdate.select("circle")
            .style("fill", function (d) {

                if (d.isOpen) //如果是展开的 则不 填充
                {
                    return "#ffffff";
                } else {
                    var color;
                    if (d.itemStyle === null) //向父级一级一级获取
                    {
                        while (d.parent.itemStyle !== undefined && d.parent.itemStyle !== null) {
                            color = d.parent.itemStyle.normal.color;
                            break;
                        }

                    } else {
                        color = d.itemStyle.normal.color;
                    }
                    return color;
                }

            });

        var nodeExit = node.exit().transition()
            .attr("transform", function (d) {
                return "translate(" + source.y
                    + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        renderLabels(nodeEnter, nodeUpdate, nodeExit);
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    /**
     * 画文本文字
     * @param nodeEnter
     * @param nodeUpdate
     * @param nodeExit
     */
    function renderLabels(nodeEnter, nodeUpdate, nodeExit) {
        var text=nodeEnter.append("svg:text")
            .attr("x", function (d) {
                if (_orient === "horizontal") {
                    return d.children || d._children ? -10 : 10;
                }

            })
            .attr("dy", ".35em")
            .style("fill-opacity", 1e-6)
            .attr("transform", function (d) {
                if (_orient === "ring") {
                    return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
                }
                else if(_orient==="vertical")
                {

                    if(d.children)
                    {
                        return d.x < 180 ? "translate(-8)" : "translate(-8)";
                    }
                }
            });

        if(_orient==="horizontal")
        {
            text.attr("text-anchor",function(d){
                return d.children || d._children ? "end" : "start";
            })
        }else if(_orient==="vertical")
        {

            text.attr("writing-mode","tb")

        }else if(_orient==="ring")
        {
            text.attr("text-anchor",function(d){
                return d.x < 180 ? "start" : "end";
            })
        };


        nodeUpdate.select("text")
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 1);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);
    };
    /***
     * 画连线
     * @param nodes
     * @param source
     */
    function renderLinks(nodes, source) {
        var link = _bodyG.selectAll("path.link")
            .data(_tree.links(nodes), function (d) { //links函数生成数据，links函数返回一个包含了{source,target}的link对象数组，它们各自指向树中匹配的节点
                return d.target.id;
            });

        link.enter().insert("svg:path", "g")//svg:path元素描述了源节点和目标节点之间的连接，还有之前定义好的对角线生成器来生成属性d。
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return _diagonal({source: o, target: o});//将连接线的长度设置为d3.svg.diagonal，也就是把源节点和目标节点放在相同的位置上
            });

        link.transition()
            .attr("d", _diagonal)//使用动画过渡效果来调整连接线的长度，并将其移动到合适的位置
            .attr("id", function (d) {
                return d.source.id;
            })
            .attr("sourceName", function (d) {
                return d.source.id;
            })
            .attr("targetName", function (d) {

                return d.target.id;
            })
            .style("stroke", function (d) {
                if (d.source.itemStyle !== null) {
                    return d.source.itemStyle.normal.color;
                }
            });
        link.exit().transition()
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return _diagonal({source: o, target: o});//移除节点时把连线的长度设为0，以此来模拟动画效果
            })
            .remove();
    };


    /**
     * 鼠标移动上去向上找所有的父节点
     * @param node
     */
    function overNodeParents(g, node, eventName) {
        var nodeTarget = g.attr("target");
        var nodeSource = g.attr("source");
        var links = d3.selectAll("#" + g.attr("source"));//指向同一父节点线的集合

        if (links !== null && links.length > 0) {
            var linksArray = links[0];

            for (var i = 0; i < linksArray.length; i++) {
                var link = d3.select(linksArray[i]);
                var linkTarget = link.attr("targetName");
                var linkSource = link.attr("sourceName");
                if (linkTarget === nodeTarget && linkSource === nodeSource) {
                    if (eventName === "mouseover") {
                        link.style("stroke-width", 3);
                    } else if (eventName === "mouseout") {
                        link.style("stroke-width", 1);
                    }

                }
            }
        }
        if (node !== undefined) {
            if (node.parent)  //判断当前节点是否有parent
            {
                var parent = node.parent;
                var gg = d3.selectAll("#" + parent.id)[0];
                gg.forEach(function (d) {

                    var g = d3.select(d);
                    var classes = g.attr("class");
                    if (classes === "node") {
                        overNodeParents(g, parent, eventName);
                    }
                });
            }
        }

    }

    /**
     * 鼠标移动节点向下找所有的子节点
     * @param node
     */
    function overNodeChildren(node, eventName) {

        if (node !== undefined && node.children) {

            //var childrenLinks=d3.selectAll("#"+node.name);
            var childrenLinks = d3.selectAll("#" + node.id);
            if (eventName === "mouseover") {
                childrenLinks.style("stroke-width", 3);
            } else if (eventName === "mouseout") {
                childrenLinks.style("stroke-width", 1);
            }

            var children = node.children;
            for (var i = 0; i < children.length; i++) {

                var child = children[i];
                if (child.children) {
                    overNodeChildren(child, eventName);
                }
            }
        }

    }

    /**
     * 点击节点的方法
     * @param d
     */
    function onClick(d) {

        if (d.children) {
            d.isOpen = false;
            d._children = d.children;
            d.children = null;
        } else {
            d.isOpen = true;
            d.children = d._children;
            d._children = null;
        }
    }

    /***
     * 鼠标移动图例关联事件
     * @private
     */
    var _mouseOverLink = function (name) {

        var values = _legendMap.values();
        var legId;
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value.name === name) {
                legId = value.id;
                break;
            }
        }
        var gg = d3.selectAll("#" + legId)[0];
        var findG;
        gg.forEach(function (d) {
            var g = d3.select(d);
            var classes = g.attr("class");
            if (classes === "node") {

                findG = g;
            }
        });
        var data = findNodes(_nodes, legId);
        overNodeParents(findG, data, "mouseover");
        overNodeChildren(data, "mouseover");

    };


    /**
     * 鼠标移出关联事件
     * @private
     */
    var _mouseOutLink = function (name) {

        var values = _legendMap.values();
        var legId;
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value.name === name) {
                legId = value.id;
                break;
            }
        }
        var gg = d3.selectAll("#" + legId)[0];
        var findG;
        gg.forEach(function (d) {
            var g = d3.select(d);
            var classes = g.attr("class");
            if (classes === "node") {
                findG = g;
            }
        });
        var data = findNodes(_nodes, legId);
        overNodeParents(findG, data, "mouseout");
        overNodeChildren(data, "mouseout");
    };

    /**
     * 鼠标点击图例事件
     * @private
     */
    var _legendClickLink = function (name) {

        var values = _legendMap.values();
        var legId;
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value.name === name) {
                legId = value.id;
                break;
            }
        }
        var data = findNodes(_nodes, legId);

        onClick(data);
        render(data);
    };

    /***
     * 根据节点的名字查找节点对应的数据
     * @param node
     * @param name
     * @returns {*}
     */
    function findNodes(node, id) {
        var data;
        if (node.children) {
            var children = node.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.id === id) {
                    data = child;
                    break;
                } else {
                    findNodes(child, id)
                }
            }
        }
        return data;
    }

    /**
     * 验证数据
     * @param data
     * @returns {*}
     */
    function checkout(object) {
        var categories = object.categories;//树状图节点获取所属样式
        var data = object.data;
        var defaultItemStyle = object.itemStyle;
        var root = checkNodes(data, categories, defaultItemStyle);
        return root;
    }

    /**
     * 验证所有的children  Nodes
     * @param d
     */
    function checkNodes(d, categories, defaultItemStyle) {

        if (categories === undefined || categories === null || categories.length === 0)//判断类别数组，为空时所有节点均使用树状图统一样式，
        {
            d.category = null;
            d.itemStyle = defaultItemStyle;
        } else {
            if (d.category !== null) {

                if (categories[d.category].itemStyle === undefined) //如果类别里面未声明则取默认
                {
                    d.itemStyle = defaultItemStyle;
                } else  //获取类别里的样式
                {
                    d.itemStyle = categories[d.category].itemStyle;
                }
            }
            else //若节点里的category未定或者为null 则取父级
            {
                //d.itemStyle=defaultItemStyle;
                d.itemStyle = null;
            }
        }

        var obj = _legendMap.get(d.category);
        if (obj === undefined || obj === null) {
            obj = {};
            obj.name = d.name;
            obj.id = d.id;
            obj.itemStyle = d.itemStyle;
            _legendMap.put(d.category, obj);
        }

        if (d.isOpen) //判断此节点是否展展开   若展开则
        {
            if (d.children) {
                if (d.children === null) {
                    d.children = d._children;
                }

                d.children.forEach(function (d) {
                    checkNodes(d, categories, defaultItemStyle);
                })


            }
        }
        if (!d.isOpen)//不展开
        {
            if (d.children !== undefined) {
                d.children.forEach(function (d) {
                    checkNodes(d, categories, defaultItemStyle);
                })
            }
            d._children = d.children;
            d.children = null;
        }

        if (d.id === undefined || d.id === null || d.id === "") //若未声明id,则随机声明id
        {
            var num = GetRandomNum(1,10000);
            d.id = "htharts" + d.name + (new Date().getTime())+num;
        }

        return d;
    };

    /**
     * 产生随机数
     * @param Min
     * @param Max
     * @returns {*}
     * @constructor
     */
    function GetRandomNum(Min,Max)
    {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    /**
     * 合并用户设定配置和默认配置
     * @param option
     * @param config
     */
    function mergeData(config, option) {
        delete option.series;
        //合并option数据
        _config = _utils.merge(config, option, true);
        //合并series数据
        //_series.forEach(function (d) {
        //    d = _utils.merge(d, _config.scatter, false);
        //    //判断用户属否设置颜色，如果未设置取颜色
        //    if (d.itemStyle.normal.color === null) {
        //        d.itemStyle.normal.color = _config.color[index];
        //    }
        //    if (d.itemStyle.emphasis.color === null) {
        //        d.itemStyle.emphasis.color = _config.emphasisColor[index];
        //    }
        //    var legend = {};//图例样式
        //    //数据名称
        //    legend.name = d.name;
        //    //颜色
        //    legend.color = d.itemStyle.normal.color;
        //    //图形标识
        //    legend.type = _config.CHART_TYPE_SCATTER;
        //    _legendData.push(legend);
        //    index++;
        //});
    }

    return _chart;
}

