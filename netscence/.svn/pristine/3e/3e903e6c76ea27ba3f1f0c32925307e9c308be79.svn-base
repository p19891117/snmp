"use strict";
/**
 * 画线图方法
 * @param _option 用户自定义的参数
 * @param _svg 画布
 * @param _config 默认配置参数
 * @returns area 返回areaChart对象
 * @author WangJing
 * @time 2014-12-9
 * 使用方法
 */
function areaChart(option, svg, config) {
	var _config = config;
	var _utils = utils();
	var _svg = svg;
	var _option = option;
	var area = {};
	var _axisData = [];
	var _axisType;
	
	_axisType = _option.xAxis.type;

	_axisData.xAxis = [_option.xAxis];
	_axisData.yAxis = [_option.yAxis];

	_option.xAxis = _axisData.xAxis;
	_option.yAxis = _axisData.yAxis;

	_utils.merge(_config,_option); //合并数据

	var _width = _config.canvas.width, //画布宽
		_height = _config.canvas.height, //画布高
		_margins = _config.canvas.margins, //画布外边距
		_origData = _option.series, //折线数据数组
		_opacity = _config.line.itemStyle.normal.areaStyle, //线的透明度
		_colors = _config.color; //折线颜色数组
	var _bodyG, //画布区域
		_line, //线
		_flag = [], //标志，如果为true表示点击图例后需要重绘对应折线，false不重绘。
		_xScale, //比例尺
		_yScale,
		_data, //存放折线数据
		_newData = [], //对象数组
		_count = 0,
		_axes; //坐标轴
		
	formatData(_origData);

	/**
	 * 预处理传入的原始数据
	 * @param  {data} data 原始数据
	 */
	function formatData(data){
		var tempObj;    //暂存每一条折线的数据
		var tempData = [];
		for (var i = 0; i < data.length; i++) {
			tempObj = data[i].data;
			tempData.push(tempObj);
			_flag[i] = true;
		}
		_data = dataTransition(tempData);
	}

	/**
	 * 鼠标移动到图例上回调函数
	 * @param  {String} name 图例名称
	 */
	function legendOverCallBack(name) {
		
	}

	/**
	 * 鼠标移出图例回调函数
	 * @param  {String} name 图例名称
	 */
	function legendOutCallBack(name) {
		
	}

	/**
	 * 点击图例回调函数
	 * @param {String} name 图例名称
	 */
	function legendClickCallBack(name) {
		var minMax,
			yAxis, //更新坐标轴需要的y轴
		_newData = setNewData(name);
		minMax = getMaxAndMin(_newData);

		_svg.selectAll(".dot").remove(); //删除折线和小圆点
		_svg.selectAll(".line").remove();

		renderLines(_newData); //根据新的数据重绘折线
		renderDots(_newData); //重新绘制小圆点

		yAxis = {
			type: 1,
			max: minMax[1],
			min: minMax[0]
		}; //组装更新y轴的参数
		
		_axes.updateYAxis(0, yAxis); //更新y轴
		_xScale = _axes.xAxis[0].getScale; //获取更新后的比例尺
		_yScale = _axes.yAxis[0].getScale;

		//折线动画
		_svg.selectAll("path.line")
			.data(_newData)
			.transition()
			.duration(1750)
			.attr("d", function(d) {
				return _line(d);
			});

		//小圆点动画
		_newData.forEach(function(list, i) {
			_svg.selectAll("circle._" + i)
				.data(list)
				.transition()
				.duration(1750)
				.attr("cx", function(d, i) {
					return _xScale(d.key);
				})
				.attr("cy", function(d) {
					return _yScale(d.value);
				})
				.attr("r", 4.5);
		});
	};
	
	/**
	 * 设置标志，标志数组对应的元素为true表示绘制折线，
	 * 		为false表示不绘制折线，点击图例是使用
	 * @param {String} name 当前被点击的图例对应折线名称
	 */
	function setFlag(name){
		var tempData = [];
		for (var i = 0; i < _origData.length; i++) {
			if (_origData[i].name === name) {
				if (_flag[i] === true) {
					_flag[i] = false;
				} else if (_flag[i] === false) {
					_flag[i] = true;
				}
			}
		}
	}
	
	/**
	 * 设置绘制折线数据，当图例被点击后，根据flag内容重新筛选绘制折线数据
	 * @param {String} name 被点击图例的折现名称
	 */
	function setNewData(name){
		setFlag(name);
		var tempData = [];
		for(var i=0;i<_flag.length;i++){
			if(_flag[i] === true){
				tempData.push(_data[i]);
			}
		}	
		return tempData;
	}
	
	/**
	 * 获取当前数据中的最大值和最小值
	 * @param  {Array} data 数据
	 * @return {Array} [min,max] 返回最小值和最大值的数组,如果数据为空，则返回[0,1]
	 */
	function getMaxAndMin(data){
		var tempData1 = [];
		var tempData2 = [];
		var tempData,
			maxData,
			minData;
		for (var i = 0; i < data.length; i++) {
			tempData = data[i];
			for(var j=0;j < tempData.length;j++){
				tempData1.push(tempData[j].value);
			}
		}
		if(tempData1.length === 0){
			return [0,1]
		}else{
			maxData = Math.max.apply(null, tempData1); //最大值
			minData = Math.min.apply(null, tempData1); //最小值
			return [maxData,minData];
		}
		
	}

	/**
	 * 画分层面积图方法
	 */
	area.render = function() {
		var legendArray = [], //组装图例数组
			leg, //图例
			tit; //标题
		var rightRange = 0;
		var leftRange = 0;
		var xAxis;
		var range = dataRange(_data);

		leftRange = new Date(range[0]);
		rightRange = new Date(range[1]);

		_axes = axis(_option,_svg,_config);
		_axes.render();    //绘制坐标轴

		// xAxis = {
		// 	type: 2,
		// 	startTime: leftRange,
		// 	endTime: rightRange
		// }; //组装更新x轴的参数

		// _axes.updateXAxis(0, xAxis);	//更新x轴
		_xScale = _axes.xAxis[0].getScale;    //获取比例尺
		_yScale = _axes.yAxis[0].getScale;
		
		renderBody(_svg, _data); //绘制图表在主体

		//组装图例参数
		for (var i = 0; i < _origData.length; i++) {
			legendArray.push({
				name: _origData[i].name,
				color: _colors[i],
				type: _origData[i].type,
				symbol: "",
				symbolStyle: ""
			})
		}

		//图例
		leg = legend(_svg, _config, legendArray);
		_config.EVENT.LEGEND_SELECTED = legendClickCallBack; //图例回调函数
		_config.EVENT.LEGEND_HOVERLINK = legendOverCallBack;
		_config.EVENT.LEGEND_OUTLINK = legendOutCallBack;
		leg.render(); //绘制图例

		//标题
		tit = title();
		tit.render(_svg, _config);
	};

	/**
	 * 添加数据
	 * @param {Array}  data    添加的数据
	 * @param {String}  position    添加位置，值为"start"或者"end"
	 * @param {Boolean} isChange    区域是否保持不变,true改变，false不变
	 */
	area.loadData = function(data) {
		var xAxis;
		var rightRange = 0;
		var leftRange = 0;
		var tempXScale,
			tempYScale;

		var _data = dataTransition(data);

		var range = dataRange(_data);
		leftRange = new Date(range[0]);
		rightRange = new Date(range[1]);

		xAxis = {
			type: 2,
			startTime: leftRange,
			endTime: rightRange
		}; //组装更新x轴的参数

		//折线动画
		var lineg = _svg.selectAll("path.line")
			.data(_data)
			.attr("d", function(d,i) {
				return _line(d);
			});

		tempXScale = _xScale;	//暂存原始比例尺
		tempYScale = _yScale;

		_axes.updateXAxis(0, xAxis);	//更新x轴
		_xScale = _axes.xAxis[0].getScale;	//获取更新后的比例尺
		_yScale = _axes.yAxis[0].getScale;

		lineg.transition()
			.duration(1000)
			.attr("d", function(d,i) {
				return _line(d);
			});

		// _data.forEach(function (list, i) {
		// 	_svg.selectAll("circle._" + i)
		// 		.data(list)
		// 		.transition()
		// 		.duration(3000)
		// 		.attrTween("cx",function(d){
		// 			var currentCx = this.__current__;//获取当前状态
		// 			console.log(currentCx);
		// 			return d3.interpolate(tempXScale(d.key), _xScale(d.key));
		// 		})
		// 		.attr("cy",function(d){
					
		// 		})
		// 		.attr("r", 4.5);
		// });
	}

	function dataRange(data){
        var temp = [],
            max,
            min;
        for(var i=0;i<data.length;i++){
            var tempData = data[i];
            for(var j=0;j<tempData.length;j++){
                temp.push(tempData[j].key);  
            }
        }
        if(temp.length === 0){
        	return [];
        }else{
        	max = Math.max.apply(null,temp);//最大值
        	min = Math.min.apply(null,temp);//最小值
        	return [min,max];
        }
        
    }

	/**
	 * 渲染body
	 * @param {svg} svg 传入一个画布（svg）参数
	 * @param {Array} data 绘图数据
	 */
	function renderBody(svg, data) {
		if (!_bodyG)
			_bodyG = svg.append("g")
			.attr("class", "body")
			.attr("transform", "translate(" + xStart() + "," + yEnd() + ")")
			.attr("clip-path", "url(#body-clip)");
		renderLines(data);
		// renderDots(data);
	}

	/**
	 * 渲染数据序列函数
	 * @param {Array} data 绘图数据
	 */
	function renderLines(data) {
		var isSmooth;
		if (_config.line.isSmooth === false) {
			isSmooth = null;
		} else {
			isSmooth = "cardinal";
		}
		_line = d3.svg.line()
			.interpolate(isSmooth) //设置或获取插值模式
			.x(function(d, i) {
				return _xScale(d.key);
			})
			.y(function(d) {
				return _yScale(d.value);
			});

		_bodyG.selectAll("path.line")
			.data(data)
			.enter()
			.append("path")
			.style("opacity", _opacity)
			.style("stroke", function(d, i) {
				return d[0].color;
			})
			.style("fill", "none")
			.style("stroke-width", 2)
			.attr("class", "line")
			.attr("id", function(d, i) {
				return "line" + i;
			})
			.attr("d", function(d) {
				return _line(d);
			})
			.on("click", function(d, i) { // 鼠标单击某元素
				var col = this.style.stroke;
				d3.select(this)
					.style("stroke", col);
			})
			.on("mouseover", function(d, i) { // 鼠标移到某元素上
				var col = d3.rgb(this.style.stroke).brighter(0.9);
				d3.select(this)
					.style("stroke", col);
			})
			.on("mouseout", function(d, i) {
				d3.select(this)
					.transition()
					.duration(500)
					.style("stroke", _colors[i]);
			})
	}

	/**
	 * 渲染(分层)小圆点函数
	 * @param {Array} data 绘图数据
	 */
	function renderDots(data) {
		data.forEach(function(list, i) {
			_bodyG.selectAll("circle._" + i)
				.data(list, function(d) {
					return d.key;
				})
				.enter()
				.append("circle")
				.attr("class", "dot _" + i)
				.attr("id", "dot" + i)
				.attr("cx", function(d, i) {
					return _xScale(d.key);
				})
				.attr("cy", _line.y())
				.attr("r", 4.5)
				.style("fill", "white")
				.style("stroke", function(d) {
					return d.color;
				})
				.style("opacity", _opacity)
				.on("click", function(d, i) { // 鼠标单击某元素
					var col = d3.rgb(this.style.stroke).brighter(0.9);
					d3.select(this)
						.style("fill", col);
				})
				.on("mouseover", function(d, i) { // 鼠标移到某元素上
					var col = d3.rgb(this.style.stroke).brighter(0.9);
					d3.select(this)
						.style("fill", col);
				})
				.on("mouseout", function(d, i) { //鼠标从某元素移开
					d3.select(this)
						.transition()
						.duration(500)
						.style("fill", "white");
				});
		});
	}

	/**
	 * 转换用户输入的数据
	 * 1、如果x轴类型是时间轴和值轴，则输入数据格式为:
	 * 		[[{key:date,value:value},{key:date,value:value}],[{key:date,value:value},{key:date,value:value}]]
	 * 2、如果x轴类型是类目轴，则输入数据格式为：
	 * 		[[1,2,3,4],[1,2,3,4]]
	 * 		
	 * @param {Array} data 绘图数据
	 * @return {Array} d  格式化后的绘图数据
	 */
	function dataTransition(data) {
		var d = [];
		for (var j = 0; j < data.length; j++) {
			var tempData = data[j];
			d.push(d3.range(tempData.length).map(function(i) {
				if(_axisType === "time" || _axisType === "value"){
					if(typeof(tempData[i]) === "object"){
						if(typeof(tempData[i].key) === "string"){
							var tempKey = tempData[i].key;
							tempData[i].key = formatDate(tempKey);
						}
						var tempObj = {
							key : tempData[i].key,
							color:_colors[j],
							name:_origData[j].name,
							value : tempData[i].value
						}
						return tempObj;
					}else if(typeof(tempData[j]) === "number"){
						if(typeof(tempData[i].key) === "String"){
							var tempKey = tempData[i].key;
							tempData[i].key = formatDate(tempKey);
						}
						var tempObj1 = {
							key : 0,
							color:_colors[j],
							name:_origData[j].name,
							value : 0
						}
						return tempObj1;
					}
				}else if(_axisType === "category"){
					var tempObj2 = {
						key:i,
						color:_colors[j],
						name:_origData[j].name,
						value: data[j][i]
					}
					return tempObj2;
				}
			}));
		}
		return d;
	}

	function formatDate(str){
		str = str.replace(/-/g,"/");
		var date = new Date(str );
		return date;
	}
	
	/**
	 * 数据预处理，比较data数据长度，删除多余，‘-’补足缺少，string转化‘-’
	 * @param datas
	 */
	function pretreatment(series, axisLength) {
		for (var n = 0; n < series.length; n++) {
			var dd = [];
			for (var i = 0; i < axisLength; i++) {
				var t = (series[n].data)[i];
				console.log(typeof(t));
				if (typeof(t) === "number") {
					dd.push(series[n].data[i]);
				} else {
					dd.push("-");
				}
			}
			// console.log(dd);
			series[n].data = dd;
		}
		return series;
	};

	function xStart() {
		return _margins.left;
	}

	function yStart() {
		return _height - _margins.bottom - 100;
	}

	function xEnd() {
		return _width - _margins.right;
	}

	function yEnd() {
		return _margins.top;
	}

	function quadrantWidth() {
		return _width - _margins.left - _margins.right;
	}

	function quadrantHeight() {
		return _height - _margins.top - _margins.bottom - 100;
	}
	
	return area;
}